import "./Court.css";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { AddFavorite, GetCourts } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice"
import star from "../../../img/star.png";
import logoMaps from "../../../img/maps.png";

export const Court = () => {

    const [courts, setCourts] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});

    useEffect(() => {
        const getCourts = async () => {
            try {
                if (token) {
                    const fetched = await GetCourts(token);
                    const sortedCourts = fetched.data.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setCourts(sortedCourts);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCourts();
    }, [token]);

    const addFavoriteCourt = async (courtId) => {
        try {
            const fetched = await AddFavorite(token, courtId)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="CourtDesign"
            style={{
                backgroundImage: `url(${('../../../img/court-70.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}>
            {courts.map((court) => (
                <div className="courtCard" key={court.id}>
                    <div className="rowCourt">
                        <button className="buttonFav" onClick={() => addFavoriteCourt(court.id)}>
                            <img draggable="false" className="starCourt" src={star} alt="Favoritos" />
                        </button>
                        <div className="textCourt">{court.name}</div>
                    </div>
                    <div className="directionMaps">
                        <div className="rowCard">
                            <div className="textDirection">{court.direction}</div>
                            <a draggable="false" className="maps" href={court.URL_maps} target="_blank" >
                                <img draggable="false" className="logoMapsCourt" src={logoMaps} alt="Logo" />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}