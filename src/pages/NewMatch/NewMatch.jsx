import "./NewMatch.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { updateDetail } from "../../app/slices/matchDetailSlice";
import { CInput } from "../../common/CInput/CInput";
import { validation } from "../../utils/functions";
import { CreateMatch, DeleteMatch, GetCourts, GetMyMatchesCreated, UpdateMatch } from "../../services/apiCalls";
import { CTextArea } from "../../common/CTextArea/CTextArea";
import { CButton } from "../../common/CButton/CButton";

export const NewMatch = () => {

    const dispatch = useDispatch()
    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});

    const [matches, setMatches] = useState({
        number_players: "",
        information: "",
        match_date: "",
        court_id: "",
    })
    const [updateMatches, setUpdateMatches] = useState({
        number_players: "",
        information: "",
        match_date: "",
        court_id: "",
    })
    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");
    const [courts, setCourts] = useState([{}])
    const [change, setChange] = useState("disabled")
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

    const handleMatch = async (match) => {
        try {
            dispatch(updateDetail({ detail: match }))
            navigate("/match-detail")

        } catch (error) {

        }
    };

    const inputHandler = (e) => {
        setMatches((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const inputHandlerUpdate = (e) => {
        setUpdateMatches((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {

        if (token) {
            getMyMatches()
        }
    }, [token])


    useEffect(() => {
        const getCourts = async () => {
            try {
                if (token) {
                    const fetched = await GetCourts(token);
                    setCourts(fetched.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getCourts();
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
            const signed = fetched.map(match => ({
                ...match,
                signedCount: match.signed_up?.length
            }));
            setMatches(signed)
        } catch (error) {
            console.log(error);
        }
    }

    const updateMatch = async (matchId) => {
        try {
            const fetched = await UpdateMatch(reduxUser.credentials.token, matchId, updateMatches);
            console.log(fetched, "fetched");
            
            setChange("disabled");
            
            getMyMatches();
        } catch (error) {
            console.log(error);
        }
    }

    const matchRemove = async (matchId) => {
        try {
            await DeleteMatch(matchId, token)
            const updatedMatches = await GetMyMatchesCreated(token);
            setMatches(updatedMatches);

        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-US', options);
    };

    return (
        <div className="containerNewMatch">
            <div className="createNewMatch">
                <select
                    className={`cInputNewMatch`}
                    name={"number_players"}
                    value={matches.number_players || ""}
                    onChange={inputHandler}
                >
                    <option value="">Nº de jugadores</option>
                    <option value="4">4 jugadores</option>
                    <option value="6">6 jugadores</option>
                    <option value="8">8 jugadores</option>
                    <option value="10">10 jugadores</option>
                </select>
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
                                    Selecciona pista
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
                                {/* <button */}
                                {/* className="cardsButton" */}
                                {/* onClick={() => handleMatch(match)}> */}
                                <CInput
                                    className={`dateNewMatch`}
                                    type={"text"}
                                    placeholder={""}
                                    name={"match_date"}
                                    value={formatDate(match.match_date) || ""} // Cambiar de match.xxx a updateMatchItem.xxx
                                    disabled={change}
                                    changeEmit={(e) => inputHandlerUpdate(e)}
                                />
                                <CInput
                                    className={`playersNewMatch`}
                                    type={"text"}
                                    placeholder={""}
                                    name={"number_players"}
                                    value={match.number_players || ""}
                                    disabled={change}
                                    changeEmit={(e) => inputHandlerUpdate(e)}
                                />
                                <CInput
                                    className={`signedNewMatch`}
                                    type={"text"}
                                    placeholder={""}
                                    name={"signedCount"}
                                    value={match.signedCount || ""}
                                    disabled={change}
                                    changeEmit={(e) => inputHandlerUpdate(e)}
                                />
                                <CInput
                                    className={`informationNewMatch`}
                                    type={"text"}
                                    placeholder={""}
                                    name={"information"}
                                    value={match.information.length > 35 ? match.information.substring(0, 35) + "..." : match.information || ""}
                                    disabled={change}
                                    changeEmit={(e) => inputHandlerUpdate(e)}
                                />
                                <CInput
                                    className={`courtNewMatch`}
                                    type={"text"}
                                    placeholder={""}
                                    name={"court"}
                                    value={match.court_id || ""}
                                    disabled={change}
                                    changeEmit={(e) => inputHandlerUpdate(e)}
                                />
                                {/* </button> */}
                                <div className="row">
                                    <CButton
                                        className={"buttonDeleteNewMatch"}
                                        title={change === "" ? "Confirmar" : "Editar"}
                                        functionEmit={change === "" ? () => updateMatch(match.id) : () => handleEditClick()} // Aquí actualizamos la función del botón "Editar"
                                    />
                                    {/* <button className="buttonDeleteNewMatch" onClick={() => updateMatch(match.id)}>Actualizar</button> */}
                                    <button className="buttonDeleteNewMatch" onClick={() => matchRemove(match.id)}>Eliminar</button>
                                </div>
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