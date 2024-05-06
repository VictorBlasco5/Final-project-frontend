import "./NewMatch.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CInput } from "../../common/CInput/CInput";
import { validation } from "../../utils/functions";
import { CreateMatch, GetCourts, GetMyMatchesCreated } from "../../services/apiCalls";
import { CTextArea } from "../../common/CTextArea/CTextArea";

export const NewMatch = () => {

    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});

    const [matches, setMatches] = useState({
        number_players: "",
        information: "",
        match_date: "",
        court_id: "",
    })
    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");
    const [courts, setCourts] = useState([{}])
    // const [matchError, setMatchError] = useState({
    //     number_playersError: "",
    //     informationError: "",
    //     match_dateError: "",
    //     court_idError: "",
    // })

    // const checkError = (e) => {
    //     const error = validation(e.target.name, e.target.value);

    //     setMatchError((prevState) => ({
    //         ...prevState,
    //         [e.target.name + "Error"]: error,
    //     }));
    // };

    const inputHandler = (e) => {
        setMatches((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {

        if (token) {
            getMyMatches()
        }
    }, [token])


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const fetched = await GetCourts(token);
                    setCourts(fetched.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token]);

    const newMatch = async () => {
        try {
            const fetched = await CreateMatch(token, matches)
            if (fetched && fetched.success) {
                setMsgSuccessfully("Match created")
                getMyMatches()
            }

        } catch (error) {
            setMsgError("It's not possible to create the match");
            console.log(error);
        }
    }

    const getMyMatches = async () => {
        try {
            const fetched = await GetMyMatchesCreated(token)
            console.log(fetched);
            setMatches(fetched)
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-US', options);
    };

    return (
        <div className="containerNewMatch">
            <div className="createNewMatch">

                <CInput
                    className={`cInputNewMatch`}
                    type="text"
                    name={"number_players"}
                    placeholder={"Numero de jugadores"}
                    value={matches.number_players || ""}
                    disabled={""}
                    changeEmit={inputHandler}
                // onBlurFunction={(e) => checkError(e)}
                />
                <CTextArea
                    className={`cInputNewMatchInfo`}
                    type="text"
                    name={"information"}
                    value={matches.information || ""}
                    placeholder={"Información..."}
                    disabled={""}
                    changeEmit={inputHandler}
                // onBlurFunction={(e) => checkError(e)}
                />
                <CInput
                    className={`cInputNewMatch`}
                    type={"datetime-local"}
                    placeholder={""}
                    name={"match_date"}
                    value={matches.match_date || ""}
                    disabled={""}
                    changeEmit={inputHandler}
                />
                {
                    courts.length > 0
                        ? (
                            <select className="cInputNewMatch" name="court_id" onChange={inputHandler} defaultValue={""} >
                                <option value="" disabled>
                                    Select court
                                </option>
                                {courts.map(
                                    court => {
                                        return (
                                            <option value={`${court.id}`} >{court.name}</option>
                                        )
                                    }
                                )
                                }
                            </select>)
                        : (
                            <p>LOADING </p>
                        )
                }


                <button
                    className="buttonCreateMatch"
                    onClick={() => newMatch()}
                >Crear partido</button>
                <div className="successfully">{msgSuccessfully} </ div>
                <div className="error">{msgError} </ div>
            </div>
            <div className="containerCards">
                {matches.length > 0 ? (
                    <div className="position">
                        {matches.map(match => (
                            <div className="cardNewMatch" key={match.id}>
                                <button
                                    className="cardsButton"
                                    onClick={() => handleMatch(match)}>
                                    <div className="margin">{formatDate(match.match_date)}</div>
                                    <div className="row">
                                        <div className="margin">Jugadores: {match.number_players} </div>
                                        <div className="space"></div>
                                        <div className="margin">Apuntados:{match.signedCount}</div>
                                    </div>
                                    <div>{match.information.length > 35 ? match.information.substring(0, 35) + "..." : match.information}</div>
                                    <div className="margin">{match.court.name}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}