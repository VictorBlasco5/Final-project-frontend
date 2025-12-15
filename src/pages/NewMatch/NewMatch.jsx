import "./NewMatch.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CInput } from "../../common/CInput/CInput";
import { CreateMatch, GetCourts } from "../../services/apiCalls";
import { CTextArea } from "../../common/CTextArea/CTextArea";
import { validation } from "../../utils/functions";

export const NewMatch = () => {

    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});
    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");
    const [courts, setCourts] = useState([{}])
    const [matches, setMatches] = useState({
        number_players: "",
        information: "",
        match_date: "",
        court_id: "",
    })
    const [matchError, setMatchError] = useState({
        number_playersError: "",
        informationError: "",
        match_dateError: "",
        court_idError: "",
    })

    const buttonHandler = () => {
        newMatch();
    }

    const inputHandler = (e) => {
        setMatches((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setMatchError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    }

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
            if (!matches.number_players || !matches.information || !matches.match_date || !matches.court_id) {
                throw new Error("Todos los campos deben estar completos");
            }
            setMsgError("");

            const fetched = await CreateMatch(token, matches)
            console.log(fetched,"partido creado");
            if (fetched && fetched.success) {
                setMsgSuccessfully("Partido creado")
                setTimeout(() => {
                    navigate('/matches');
                }, 750);
            }

        } catch (error) {
            setMsgError(error.message);
            console.log(error);
        }
    }


    return (
        <div className="containerNewMatch"
            style={{
                backgroundImage: `url(${('../../../public/court-70.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}>
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
                className={`cInputNewMatchInfo ${matchError.informationError !== "" ? "inputDesignError" : ""}`}
                type="text"
                name={"information"}
                value={matches.information || ""}
                placeholder={"Información..."}
                disabled={""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{matchError.informationError}</div>
            <CInput
                className={`cInputNewMatch ${matchError.match_dateError !== "" ? "inputDesignError" : ""}`}
                type={"datetime-local"}
                placeholder={""}
                name={"match_date"}
                value={matches.match_date || ""}
                disabled={""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{matchError.match_dateError}</div>
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
                onClick={() => buttonHandler()}
            >Crear partido</button>
            <div className="successfully">{msgSuccessfully} </ div>
            <div className="error">{msgError} </ div>
        </div>
    )
}