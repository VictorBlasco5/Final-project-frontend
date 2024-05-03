import "./Match.css";
import { GetMatches } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import add from "../../../img/add.png";

export const Match = () => {

    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const [matches, setMatches] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

        if (token) {
            getAllMatches()

        }
    }, [token])

    const getAllMatches = async () => {
        try {
            const fetched = await GetMatches(token)
            setMatches(fetched)
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-US', options);
    };

    return (
        <>
            <div className="homeDesign">
                <button className="buttonAdd" onClick={() => navigate("/new-match")}>
                    <img className="add" src={add} alt="+" />
                </button>
                {matches.length > 0 ? (
                    <div className="positionPostCard">
                        {matches.map(match => (
                            <div className="card" key={match.id}>
                                <div className="margin">Jugadores: {match.number_players}</div>
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
