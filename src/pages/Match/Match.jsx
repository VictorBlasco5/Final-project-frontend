import "./Match.css";
import { GetMatches, SignedUp } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import { updateDetail } from "../../app/slices/matchDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import add from "../../../img/add.png";

export const Match = () => {

    const dispatch = useDispatch()
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const [matches, setMatches] = useState([])
    const navigate = useNavigate()
    const userId = reduxUser.credentials.user.userId || ({});

    const handleMatch = async (match) => {
        try {
            dispatch(updateDetail({ detail: match }))
            navigate("/match-detail")

        } catch (error) {

        }
    };

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
            //     const dateA = new Date(a.match_date);
            //     const dateB = new Date(b.match_date);

            //     if (dateA < currentDate && dateB < currentDate || dateA >= currentDate && dateB >= currentDate) {
            //         return dateA - dateB;
            //     }
            //     else if (dateA < currentDate) {
            //         return 1;
            //     }
            //     else if (dateB < currentDate) {
            //         return -1;
            //     }
            // });

            const dateA = new Date(a.match_date);
            const dateB = new Date(b.match_date);
        
            // Comprobamos si a y b son partidos pasados
            const isAPastMatch = dateA < currentDate;
            const isBPastMatch = dateB < currentDate;
        
            // Si ambos son partidos pasados, los ordenamos de más reciente a más antiguo
            if (isAPastMatch && isBPastMatch) {
                return dateB - dateA;
            }
        
            // Si solo uno de ellos es un partido pasado, lo ponemos al final
            if (isAPastMatch) {
                return 1;
            }
            if (isBPastMatch) {
                return -1;
            }
        
            // Si ninguno es un partido pasado, los ordenamos normalmente
            return dateA - dateB;
        });
        
        setMatches(signed);

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
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-US', options);
    };

    return (
        <>
            <div className="matchDesign"
                style={{
                    backgroundImage: `url(${('../../../img/court-70.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '88vh',
                }}>
                <button className="buttonNewMatch" onClick={() => navigate("/new-match")}>
                    <img className="add" src={add} alt="+" />
                </button>
                {matches.length > 0 ? (
                    <div className="positionMatchCard">
                        {matches.map(match => (
                            <div className={`card ${new Date(match.match_date) < new Date() ? 'passedMatch' : ''}`} key={match.id}> {/*partidos que han pasado les cambio el color*/}
                                <button
                                    className="buttonMatchDetail"
                                    onClick={() => handleMatch(match)}>
                                    <div className="textMatch date">{formatDate(match.match_date)}</div>
                                    <div className="rowCard">
                                        <div className="textMatch">Jugadores: {match.number_players} </div>
                                        <div className="space"></div>
                                        <div className="textMatch">Apuntados: {match.signedCount}</div>
                                    </div>
                                    <div className="textMatch">{match.information.length > 30 ? match.information.substring(0, 30) + "..." : match.information}</div>
                                    <div className="textMatch">{match.court.name}</div>
                                </button>
                                <button className="buttonAssistance" onClick={() => signedMatch(match.id)} disabled={new Date(match.match_date) < new Date()}> {/*partidos que han pasado deshabilito botón*/}
                                    {match.signed_up?.includes(userId) ? "Borrarme" : "Apuntarme"}
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
