import './MatchCourt.css';
import { useSelector } from 'react-redux';
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetMatchesByCourt } from '../../services/apiCalls';
import { selectCourtId } from '../../app/slices/courtSlice';

export const MatchCourt = () => {
    const [matches, setMatches] = useState([])
    const reduxUser = useSelector(userData)
    const courtId = useSelector(selectCourtId)
    const token = reduxUser.credentials.token || ({});
    console.log(courtId, 'courtId');


    useEffect(() => {
        if (token) {
            getMatchesCourt()
        }
    }, [token])

    const getMatchesCourt = async () => {
        try {
            const fetched = await GetMatchesByCourt(token, courtId)
            console.log(fetched);
            setMatches(fetched)
        } catch (error) {
            console.log(error)
        }
    }

 
    return (
        <div className='matchCourtDesign'
        style={{
            backgroundImage: `url(${('../../../img/court-70.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '88vh',
        }}>
            <h1>MatchCourt</h1>
        </div>
    )
}