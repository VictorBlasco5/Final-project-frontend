import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { GetProfile } from "../../services/apiCalls"
import { CTextArea } from "../../common/CTextArea/CTextArea";

export const Profile = () => {

    const navigate = useNavigate()

    //conectar con redux lectura

    const reduxUser = useSelector(userData)

    const [loadedData, setLoadedData] = useState(false)
    const [user, setUser] = useState({
        nickname: "",
        favorite_position: "",
        presentation: "",
        image: "",
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
                })

            } catch (error) {
                console.log(error)
            }
        }

        if (!loadedData) {
            getUserProfile()
        }

    }, [user])

    return (
        <>
            <div className="profileDesign">
                <img className="image" src={user.image} alt="image" />
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"nickname"}
                    value={user.nickname || ""}
                    disabled={"disabled"}
                    changeEmit={(e) => inputHandler(e)}
                />
                <CInput
                    className={`cInputDesign`}
                    type={"text"}
                    placeholder={""}
                    name={"favorite_position"}
                    value={user.favorite_position || ""}
                    disabled={"disabled"}
                    changeEmit={(e) => inputHandler(e)}
                />
                <CTextArea
                    className={`presentation`}
                    type={"text"}
                    placeholder={""}
                    name={"presentation"}
                    value={user.presentation || ""}
                    disabled={"disabled"}
                    changeEmit={(e) => inputHandler(e)}>
                </CTextArea>
                <button onClick={() => navigate("/profile-edit")}>Editar perfil</button>
            </div>
        </>
    )
}