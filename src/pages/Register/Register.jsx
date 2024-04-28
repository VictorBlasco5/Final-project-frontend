import "./Register.css"

import { CInput } from "../../common/CInput/CInput"
import { useState } from "react"
import { RegisterUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";


export const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        nickname: "",
        email: "",
        password: ""
    })

    const imputHandler = (e) => {
        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const registerMe = async () => {

        try {

            const fetched = await RegisterUser(user);
            console.log(fetched);

            setTimeout(() => {
                navigate("/")
            }, 1200)

        } catch (error) {
            console.log(error)
        }
    };

    return (

        <>
            <div className="registerDesign">
                <CInput
                    placeholder={"Name"}
                    type={"text"}
                    name={"name"}
                    value={user.name || ""}
                    changeEmit={(e) => imputHandler(e)}
                />

                <CInput
                    placeholder={"Nickname"}
                    type={"text"}
                    name={"nickname"}
                    value={user.nickname || ""}
                    changeEmit={(e) => imputHandler(e)}
                />

                <CInput
                    placeholder={"Email"}
                    type={"email"}
                    name={"email"}
                    value={user.email || ""}
                    changeEmit={(e) => imputHandler(e)}

                />

                <CInput
                    placeholder={"Password"}
                    type={"password"}
                    name={"password"}
                    value={user.password || ""}
                    changeEmit={(e) => imputHandler(e)}
                />

                <button className="buttonLogin" onClick={registerMe}>Register</button>
            </div>

        </>
    )
}