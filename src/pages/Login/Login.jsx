import "./Login.css"
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput"
import { loginService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { validation } from "../../utils/functions";


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
                    throw new Error("All fields must be completed");
                }
            }

            const fetched = await loginService(user)
            console.log(fetched);

            if (fetched.token) {
                const decoded = decodeToken(fetched.token)

                const auth = {
                    token: fetched.token,
                    user: decoded,
                }

                setMsgSuccessfully(`Wellcome ${decoded.name}`)

                dispatch(login({ credentials: auth }))
                navigate("/")
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (

        <>
            <div className="loginDesign">
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

                <button className="buttonLogin" onClick={loginMe}>Login</button>
                <div className="error">{msgError} </ div>
                <div className="successfully">{msgSuccessfully} </ div>

            </div>

        </>
    )
}