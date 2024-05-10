import "./ProfileEdit.css"
import { useNavigate } from "react-router-dom"
import { updatedUser, userData } from "../../app/slices/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { GetProfile, UpdateProfile } from "../../services/apiCalls"
import { CButton } from "../../common/CButton/CButton"
import { CTextArea } from "../../common/CTextArea/CTextArea"



export const ProfileEdit = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const reduxUser = useSelector(userData)
    const [change, setChange] = useState("disabled")
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
            setUser((prevState) => ({
                ...prevState,
                name: fetched.data?.nickname || prevState.name,
            }));
            dispatch(updatedUser({ credentials: { ...reduxUser.credentials, user: { ...reduxUser.credentials.user, name: user.nickname } } }));

            setChange("disabled")
            setTimeout(() => {
                navigate("/profile");
            }, 500);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="profileEdit"
            style={{
                backgroundImage: `url(${('../../../img/court-70.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}>
                <div className="cont">
                    <div className="row">
                        <CButton
                            className={"buttonEditConfirm"}
                            title={change === "" ? "Confirmar" : "Editar"}
                            functionEmit={change === "" ? updateData : () => setChange("")}
                        />
                        <div className="space2"></div>
                        <img className="image" src={user.image} alt="image" />
                    </div>
                    <div className="row">URL foto:
                        <CTextArea
                            className={`urlImage`}
                            type={"text"}
                            placeholder={""}
                            name={"image"}
                            value={user.image || ""}
                            disabled={change}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                    <div className="row">Presentación:
                        <CTextArea
                            className={`presentation`}
                            type={"text"}
                            placeholder={""}
                            name={"presentation"}
                            value={user.presentation || ""}
                            disabled={change}
                            changeEmit={(e) => inputHandler(e)}>
                        </CTextArea>
                    </div>
                    <div className="row inputMargin">Nombre:
                        <CInput
                            className={"name"}
                            type={"text"}
                            placeholder={""}
                            name={"name"}
                            value={user.name || ""}
                            disabled={change}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                    <div className="row inputMargin">Email:
                        <CInput
                            className={`email`}
                            type={"text"}
                            placeholder={""}
                            name={"email"}
                            value={user.email || ""}
                            disabled={"disabled"}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                    <div className="row inputMargin">Nickname:
                        <CInput
                            className={`nickname`}
                            type={"text"}
                            placeholder={""}
                            name={"nickname"}
                            value={user.nickname || ""}
                            disabled={change}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                    <div className="row inputMargin">Posición:
                        <CInput
                            className={`positionFav`}
                            type={"text"}
                            placeholder={""}
                            name={"favorite_position"}
                            value={user.favorite_position || ""}
                            disabled={change}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                </div >
            </div>
        </>
    )
}