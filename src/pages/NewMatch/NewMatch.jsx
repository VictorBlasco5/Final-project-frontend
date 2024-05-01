import "./NewMatch.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CInput } from "../../common/CInput/CInput";
import { validation } from "../../utils/functions";
import { CreateMatch, GetCourts } from "../../services/apiCalls";
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
                setTimeout(() => {
                    navigate("/match")
                }, 1000)
            }

        } catch (error) {
            setMsgError("It's not possible to create the match");
            console.log(error);
        }
    }


    return (
        <div className="newMatchDesign">
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
            {console.log(courts, "courts")}
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
    )
}