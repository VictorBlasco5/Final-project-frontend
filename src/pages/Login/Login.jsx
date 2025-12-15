import "./Login.css"
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput"
import { loginService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { validation } from "../../utils/functions";
import logoPerson from "../../../img/logo.png";
import logoPerson2 from "../../../img/me.png";

//REDUX
import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {

    const navigate = useNavigate()

    //instancia de redux para escritura
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: ""
    })

    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");

    const imputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const loginMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar completos");
                }
            }
            setMsgError("");

            const fetched = await loginService(user)

            if (fetched.token) {
                const decoded = decodeToken(fetched.token)

                const auth = {
                    token: fetched.token,
                    user: decoded,
                }

                setMsgSuccessfully(`Bienvenido ${decoded.name}`)

                dispatch(login({ credentials: auth }))
                setTimeout(() => {
                    navigate("/");
                }, 750);
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (

        <>
            <div className="loginDesign"
                style={{
                    backgroundImage: `url(${('../../../public/court-70.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '88vh',
                }}>
                <img className="logoLogin" src={logoPerson} alt="ball" />
                <div className="inputsLogin">
                    <CInput
                        className={`cInputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                        type="email"
                        placeholder={"Email"}
                        name="email"
                        value={user.email || ""}
                        changeEmit={imputHandler}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.emailError}</div>
                    <CInput
                        className={`cInputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
                        placeholder={"Contraseña"}
                        type="password"
                        name="password"
                        value={user.password || ""}
                        changeEmit={imputHandler}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.passwordError}</div>

                    <button className="buttonLogin" onClick={loginMe}>Iniciar sesión</button>
                    <div className="error">{msgError} </ div>
                    <div className="successfully">{msgSuccessfully} </ div>
                </div>
                <img className="logoPerson2" src={logoPerson2} alt="Logo" />
            </div>

        </>
    )
}