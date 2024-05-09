import './MatchCourt.css';
import { useSelector } from 'react-redux';
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetMatchesByCourt } from '../../services/apiCalls';
import { selectCourtId } from '../../app/slices/courtSlice';

export const MatchCourt = () => {
    const [matches, setMatches] = useState([])
    const reduxUser = useSelector(userData)
    const reduxCourt = useSelector(selectCourtId)
    const token = reduxUser.credentials.token || ({});
    const courtId = reduxCourt.court || ({});
    console.log(reduxCourt.court, "YEPA");

    useEffect(() => {
        if (token) {
            getMatchesCourt()
        }
    }, [token])

    const getMatchesCourt = async () => {
        try {
            const fetched = await GetMatchesByCourt(token, courtId)
            console.log(fetched, "HOLA");
            setMatches(fetched)
        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-US', options);
    };


    return (
        <div className='matchCourtDesign'
            style={{
                backgroundImage: `url(${('../../../img/court-70.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}>
            {matches.map((match) => (
                <div className="cardMatchCourt" key={match.id}>
                    <div className="textMatchCourt date">{formatDate(match.match_date)}</div>
                    <div className='row'>
                        <div className="textMatchCourt">Jugadores: {match.signed_up.length}</div>
                        <div className="space"></div>
                        <div className="textMatchCourt">Apuntados: {match.number_players}</div>
                    </div>
                    <div className="textMatchCourt">{match.information}</div>
                </div>
            ))}
        </div>
    )
}