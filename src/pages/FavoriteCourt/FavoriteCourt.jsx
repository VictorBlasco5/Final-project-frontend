import "./FavoriteCourt.css";
import { GetMyFavoriteCourts } from "../../services/apiCalls";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from "react-router-dom";
import { selectCourt, selectCourtId } from "../../app/slices/courtSlice";

import { useDispatch } from 'react-redux';

export const FavoriteCourt = () => {
    const [courts, setCourts] = useState([])
    const reduxUser = useSelector(userData)
    // const courtId = useSelector((state) => selectCourtId(state))
    const token = reduxUser.credentials.token || ({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // console.log(courtId, "HOLAAAAAAAAA");
  

    const handleVerPartidos = (courtId) => {
        navigate(`/matches-court`);
        dispatch(selectCourt({ court: courtId }));
    };


    useEffect(() => {
        const myFavoriteCourts = async () => {
            try {
                const fetched = await GetMyFavoriteCourts(token)
                console.log(fetched);
                setCourts(fetched.data);
            } catch (error) {
                console.log(error)
            }
        }
        myFavoriteCourts();
    }, [token]);

    return (
        <div className="favoriteCourtDesign"
        style={{
            backgroundImage: `url(${('../../../img/court-70.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '88vh',
        }}>
            {courts.map((court) => (
                <div className="courtCard" key={court.id}>
                    <button className="buttonMatchesFC" onClick={() => handleVerPartidos(court.id)}>Partidos</button>
                    <div className="textCourt">{court.name}</div>
                    <div >{court.direction}</div>
                </div>
            ))}
        </div>
    )
}
