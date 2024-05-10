import "./NewMatch.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { updateDetail } from "../../app/slices/matchDetailSlice";
import { CInput } from "../../common/CInput/CInput";
import { CreateMatch, GetCourts } from "../../services/apiCalls";
import { CTextArea } from "../../common/CTextArea/CTextArea";

export const NewMatch = () => {

    const dispatch = useDispatch()
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

    const handleMatch = async (match) => {
        try {
            dispatch(updateDetail({ detail: match }))
            navigate("/match-detail")

        } catch (error) {

        }
    };

    const buttonHandler = () => {
        newMatch();
    }

    useEffect(() => {
        if (msgSuccessfully === "Match created") {
        }
    }, [msgSuccessfully]);

    const inputHandler = (e) => {
        setMatches((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
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
            const fetched = await CreateMatch(token, matches)
            console.log(fetched,"partido creado");
            if (fetched && fetched.success) {
                setMsgSuccessfully("Match created")
                setTimeout(() => {
                    navigate('/matches');
                }, 750);
            }

        } catch (error) {
            setMsgError("It's not possible to create the match");
            console.log(error);
        }
    }


    return (
        <div className="containerNewMatch"
            style={{
                backgroundImage: `url(${('../../../img/court-70.jpg')})`,
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
                className={`cInputNewMatchInfo`}
                type="text"
                name={"information"}
                value={matches.information || ""}
                placeholder={"Información..."}
                disabled={""}
                changeEmit={inputHandler}
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
                onClick={() => buttonHandler()}
            >Crear partido</button>
            <div className="successfully">{msgSuccessfully} </ div>
            <div className="error">{msgError} </ div>
        </div>
    )
}