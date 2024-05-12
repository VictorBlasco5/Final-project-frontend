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

    useEffect(() => {
        if (token) {
            getMatchesCourt()
        }
    }, [token])

    const getMatchesCourt = async () => {
        try {
            const fetched = await GetMatchesByCourt(token, courtId)

            const currentDate = new Date();
            const signed = fetched.map(match => ({
                ...match,
                signedCount: match.signed_up?.length
            }));
            signed.sort((a, b) => {
                const dateA = new Date(a.match_date);
                const dateB = new Date(b.match_date);

                const isAPastMatch = dateA < currentDate;
                const isBPastMatch = dateB < currentDate;

                if (isAPastMatch && isBPastMatch) {
                    return dateB - dateA;
                }
                if (isAPastMatch) {
                    return 1;
                }
                if (isBPastMatch) {
                    return -1;
                }
                return dateA - dateB;
            });
            setMatches(signed)
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
            <div className='positionFavCard'>
                {matches.map((match) => (
                    <div className={`cardMatchCourt ${new Date(match.match_date) < new Date() ? 'passedMatchCourt' : ''}`} key={match.id}> {/*partidos que han pasado les cambio el color*/}
                        <div className="textMatchCourt date">{formatDate(match.match_date)}</div>
                        <div className='row'>
                            <div className="textMatchCourt">Jugadores: {match.number_players}</div>
                            <div className="space"></div>
                            <div className="textMatchCourt">Apuntados: {match.signed_up?.length}</div>
                        </div>
                        <div className="textMatch">{match.information.length > 30 ? match.information.substring(0, 30) + "..." : match.information}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}