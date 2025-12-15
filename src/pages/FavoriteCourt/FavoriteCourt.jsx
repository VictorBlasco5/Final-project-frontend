import "./FavoriteCourt.css";
import { GetMyFavoriteCourts } from "../../services/apiCalls";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from "react-router-dom";
import { selectCourt } from "../../app/slices/courtSlice";

import { useDispatch } from 'react-redux';

export const FavoriteCourt = () => {
    const [courts, setCourts] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
  

    const handleVerPartidos = (courtId) => {
        navigate(`/matches-court`);
        dispatch(selectCourt({ court: courtId }));
    };


    useEffect(() => {
        const myFavoriteCourts = async () => {
            try {
                const fetched = await GetMyFavoriteCourts(token)
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
            backgroundImage: `url('/court-70.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '88vh',
        }}>
            <div className="positionFavCard">
            {courts.map((favorite) => (
                <div className="courtCardFavorite" key={favorite.id}>
                    <button className="buttonMatchesFC" onClick={() => handleVerPartidos(favorite.court.id)}>Partidos</button>
                    <div className="textCourtFavorite">{favorite.name}</div>
                    <div >{favorite.direction}</div>
                </div>
            ))}
            </div>
        </div>
    )
}
