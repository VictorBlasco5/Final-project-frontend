import "./NewMatch.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CInput } from "../../common/CInput/CInput";
import { validation } from "../../utils/functions";
import { CreateMatch } from "../../services/apiCalls";
import { CTextArea } from "../../common/CTextArea/CTextArea";

export const NewMatch = () => {

    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});
    const [match, setMatch] = useState({
        number_players: "",
        information: "",
        match_date: "",
        court_id: "",
    })

    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");
    const [matchError, setMatchError] = useState({
        number_playersError: "",
        informationError: "",
        match_dateError: "",
        court_idError: "",
    })

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setMatchError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const imputHandler = (e) => {
        setMatch((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const newMatch = async () => {
        try {
            const fetched = await CreateMatch(token, match)
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
                value={match.number_players || ""}
                disabled={""}
                changeEmit={imputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <CTextArea
                className={`cInputNewMatchInfo`}
                type="text"
                name={"information"}
                value={match.information || ""}
                placeholder={"Información..."}
                disabled={""}
                changeEmit={imputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <CInput
                className={`cInputNewMatch ${matchError.match_dateError !== "" ? "inputDesignError" : ""}`}
                type={"datetime-local"}
                placeholder={""}
                name={"match_date"}
                value={match.match_date || ""}
                disabled={""}
                changeEmit={imputHandler}
            />
            <CInput
                className={`cInputNewMatch ${matchError.court_idError !== "" ? "inputDesignError" : ""}`}
                type="text"
                name={"court_id"}
                placeholder={"Court_id"}
                value={match.court_id || ""}
                disabled={""}
                changeEmit={imputHandler}
                onBlurFunction={(e) => checkError(e)}
            />

            <button
                className="buttonCreateMatch"
                onClick={() => newMatch()}
            >Crear partido</button>
            <div className="successfully">{msgSuccessfully} </ div>
            <div className="error">{msgError} </ div>
        </div>
    )
}