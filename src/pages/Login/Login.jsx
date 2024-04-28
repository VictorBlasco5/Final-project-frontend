import "./Login.css"
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput"
import { loginService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";


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

    const imputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const loginMe = async () => {
        const fetched = await loginService(user)
        console.log(fetched);

        if (fetched.token) {
            const decoded = decodeToken(fetched.token)

            const auth = {
                token: fetched.token,
                user: decoded,
            }

            dispatch(login({ credentials: auth }))
            navigate("/")
        }

    }
    return (

        <>
            <div className="loginDesign">
                <CInput
                    className="cInputDesign"
                    type="email"
                    name="email"
                    value={user.email || ""}
                    changeEmit={imputHandler}
                />
                <CInput
                    className="cInputDesign"
                    type="password"
                    name="password"
                    value={user.password || ""}
                    changeEmit={imputHandler}
                />
                <button className="buttonLogin" onClick={loginMe}>Login</button>

            </div>

        </>
    )
}