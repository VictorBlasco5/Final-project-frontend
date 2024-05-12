import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { updateDetail } from "../../app/slices/matchDetailSlice";
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput";
import { DeleteMatch, GetMatchesAssistance, GetProfile } from "../../services/apiCalls"
import { CTextArea } from "../../common/CTextArea/CTextArea";


export const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const userId = reduxUser.credentials.user.userId || ({});
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

    const handleMatch = async (match) => {
        try {
            dispatch(updateDetail({ detail: match }))
            navigate("/match-detail")

        } catch (error) {

        }
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
            const currentDate = new Date();
            const signed = fetched.map(match => ({
                ...match,
                signedCount: match.signed_up?.length
            }));

            signed.sort((a, b) => {
                const dateA = new Date(a.match_date);
                const dateB = new Date(b.match_date);

                if (dateA < currentDate && dateB < currentDate || dateA >= currentDate && dateB >= currentDate) {
                    return dateA - dateB;
                }
                else if (dateA < currentDate) {
                    return 1;
                }
                else if (dateB < currentDate) {
                    return -1;
                }
            });

            setMatches(signed)
        } catch (error) {
            console.log(error)
        }
    }

    const matchRemove = async (matchId) => {
        try {
            await DeleteMatch(matchId, token)
            getMatchSigned()

        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };


    return (
        <>
            <div className="profileDesign"
                style={{
                    backgroundImage: `url(${('../../../img/court-70.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '88vh',
                }}>
                <div className="dataProfile" >
                    <button className="buttonEditProfile" onClick={() => navigate("/profile-edit")}>Editar perfil</button>
                    <CInput
                        className={"positionProfile"}
                        type={"text"}
                        placeholder={""}
                        name={"favorite_position"}
                        value={user.favorite_position || ""}
                        disabled={"disabled"}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="colum">
                        <img draggable="false" className="image" src={user.image} alt="image" />
                        <CInput
                            className={`nicknameProfile`}
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
                            <div className="cardProfile">
                                <button className="buttonCardProfile" onClick={() => handleMatch(match)} key={match.id}>
                                    <div className="textProfile date">{formatDate(match.match_date)}</div>
                                    <div className="rowCardProfile">
                                        <div className="textProfile">Jugadores: {match.number_players}</div>
                                        <div className="space"></div>
                                        <div className="textProfile"> Apuntados: {match.signedCount}</div>
                                    </div>
                                    <div className="textProfile">{match.information.length > 30 ? match.information.substring(0, 30) + "..." : match.information}</div>
                                    <div className="textProfile">{match.court.name}</div>
                                </button>
                                {match.user.id === userId && (
                                    <button className="buttonDeleteProfile" onClick={() => matchRemove(match.id)}>Eliminar</button>
                                )}
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