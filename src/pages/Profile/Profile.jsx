import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { GetMatchesAssistance, GetProfile } from "../../services/apiCalls"
import { CTextArea } from "../../common/CTextArea/CTextArea";

export const Profile = () => {

    const navigate = useNavigate()

    //conectar con redux lectura
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const [matches, setMatches] = useState([])
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

        if (token) {
            getMatchSigned()
        }
    }, [token])

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


    const getMatchSigned = async () => {
        try {
            const fetched = await GetMatchesAssistance(token)
            const signed = fetched.map(match => ({
                ...match,
                signedCount: match.signed_up?.length
            }));
            setMatches(signed)
        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-US', options);
    };


    return (
        <>
            <div className="profileDesign">
                <div className="dataProfile">
                    <button className="buttonEditProfile" onClick={() => navigate("/profile-edit")}>Editar perfil</button>
                    <CInput
                        className={"positionProfile"}
                        style={{ textAlign: 'center' }}
                        type={"text"}
                        placeholder={""}
                        name={"favorite_position"}
                        value={user.favorite_position || ""}
                        disabled={"disabled"}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="colum">
                        <img className="image" src={user.image} alt="image" />
                        <CInput
                            className={`nicknameProfile`}
                            style={{ textAlign: 'center' }}
                            type={"text"}
                            placeholder={""}
                            name={"nickname"}
                            value={user.nickname || ""}
                            disabled={"disabled"}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                    <CTextArea
                        className={`presentationProfile`}
                        type={"text"}
                        placeholder={""}
                        name={"presentation"}
                        value={user.presentation || ""}
                        disabled={"disabled"}
                        changeEmit={(e) => inputHandler(e)}>
                    </CTextArea>
                </div>

                {matches.length > 0 ? (
                    <div className="positionCardProfile">
                        {matches.map(match => (
                            <div className="cardProfile" key={match.id}>
                                <div className="rowCardProfile">
                                    <div className="margin">Jugadores: {match.number_players}</div>
                                    <div className="space"></div>
                                    <div className="margin"> Apuntados: {match.signedCount}</div>
                                </div>
                                <div className="margin">{match.information}</div>
                                <div className="margin">{formatDate(match.match_date)}</div>
                                <div className="margin">{match.court.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}