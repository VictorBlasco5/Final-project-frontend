import "./ProfileEdit.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { GetProfile, UpdateProfile } from "../../services/apiCalls"
import { CButton } from "../../common/CButton/CButton"



export const ProfileEdit = () => {

    const navigate = useNavigate()
    const [change, setChange] = useState("disabled")

    //conectar con redux lectura

    const reduxUser = useSelector(userData)

    const [loadedData, setLoadedData] = useState(false)
    const [user, setUser] = useState({
        nickname: "",
        favorite_position: "",
        presentation: "",
        image: "",
        name: "",
        email: "",
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (!reduxUser.credentials.token) {
            navigate("/")
        }
    }, [reduxUser])

    useEffect(() => {

        const getUserProfile = async () => {
            try {

                const fetched = await GetProfile(reduxUser.credentials.token)
                console.log(fetched, "datos");

                setLoadedData(true)

                setUser({
                    nickname: fetched.data.nickname,
                    favorite_position: fetched.data.favorite_position,
                    presentation: fetched.data.presentation,
                    image: fetched.data.image,
                    name: fetched.data.name,
                    email: fetched.data.email,
                })

            } catch (error) {
                console.log(error)
            }
        }

        if (!loadedData) {
            getUserProfile()
        }

    }, [user])

    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(reduxUser.credentials.token, user)
            console.log(fetched,"holi");

            setChange("disabled")

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="profileEdit">
                <img className="image" src={user.image} alt="image" />
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"image"}
                    value={user.image || ""}
                    disabled={change}
                    changeEmit={(e) => inputHandler(e)}
                />
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"name"}
                    value={user.name || ""}
                    disabled={change}
                    changeEmit={(e) => inputHandler(e)}
                />
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"email"}
                    value={user.email || ""}
                    disabled={"disabled"}
                    changeEmit={(e) => inputHandler(e)}
                />
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"nickname"}
                    value={user.nickname || ""}
                    disabled={change}
                    changeEmit={(e) => inputHandler(e)}
                />
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"favorite_position"}
                    value={user.favorite_position || ""}
                    disabled={change}
                    changeEmit={(e) => inputHandler(e)}
                />
               
                <div>Presentacion: {user.presentation || ""}</div>
                <CButton
                className={"cButtonDesign"}
                title={change === "" ? "Confirmar" : "Editar"}
                functionEmit={change === "" ? updateData : () => setChange("")}
            />
            </div>
        </>
    )
}