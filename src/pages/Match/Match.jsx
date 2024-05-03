import "./Match.css";
import { GetMatches, SignedUp } from "../../services/apiCalls";
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
            console.log(error);
        }
    }

    const signedMatch = async (matchId) => {
        try {
            const fetched = await SignedUp(token, matchId)
            getAllMatches()
        } catch (error) {
            console.log(error)
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
                                <div className="margin">Jugadores: {match.number_players} Apuntados:{match.signedCount}</div>
                                <div className="margin">{match.information}</div>
                                <div className="margin">{formatDate(match.match_date)}</div>
                                <div className="margin">{match.court.name}</div>
                                <button className="buttonCard" onClick={() => signedMatch(match.id)}>
                                    Apuntarme
                                </button>
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
