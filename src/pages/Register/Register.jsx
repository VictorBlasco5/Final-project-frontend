import "./Register.css"
import { CInput } from "../../common/CInput/CInput"
import { useState } from "react"
import { RegisterUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validation } from "../../utils/functions";
import logoPerson from "../../../img/logo.png";
import logoPerson2 from "../../../img/me.png";

export const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        nickname: "",
        email: "",
        password: ""
    })


    const [userError, setUserError] = useState({
        nameError: "",
        nicknameError: "",
        emailError: "",
        passwordError: ""
    })

    const [msgError, setMsgError] = useState("")
    const [msgSuccessfully, setMsgSuccessfully] = useState("");

    const imputHandler = (e) => {
        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
    }

    const registerMe = async () => {

        try {

            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar completos");
                }
            }

            setMsgError("")

            const fetched = await RegisterUser(user);

            setMsgSuccessfully("Usuario registrado")

            setTimeout(() => {
                navigate("/login")
            }, 750)

        } catch (error) {
            setMsgError(error.message);
            console.log(error)
        }
    };

    return (

        <>
            <div className="registerDesign"
                style={{
                    backgroundImage: `url(${('../../../public/court-70.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '88vh',
                }}>
                <img className="logoLogin" src={logoPerson} alt="Logo" />
                <div className="inputsLogin">
                    <CInput
                        className={`cInputDesign ${userError.nameError !== "" ? "inputDesignError" : ""}`}
                        placeholder={"Nombre"}
                        type={"text"}
                        name={"name"}
                        value={user.name || ""}
                        changeEmit={(e) => imputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.nameError}</div>

                    <CInput
                        className={`cInputDesign ${userError.nicknameError !== "" ? "inputDesignError" : ""}`}
                        placeholder={"Nickname"}
                        type={"text"}
                        name={"nickname"}
                        value={user.nickname || ""}
                        changeEmit={(e) => imputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.nicknameError}</div>

                    <CInput
                        className={`cInputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                        placeholder={"Email"}
                        type={"email"}
                        name={"email"}
                        value={user.email || ""}
                        changeEmit={(e) => imputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.emailError}</div>

                    <CInput
                        className={`cInputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
                        placeholder={"Contraseña"}
                        type={"password"}
                        name={"password"}
                        value={user.password || ""}
                        changeEmit={(e) => imputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{userError.passwordError}</div>

                    <button className="buttonLogin" onClick={registerMe}>Registro</button>
                    <div className="error">{msgError} </ div>
                    <div className="successfully">{msgSuccessfully} </ div>
                </div>
                <img className="logoPerson2" src={logoPerson2} alt="Logo" />
            </div>

        </>
    )
}