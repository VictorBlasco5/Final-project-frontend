import "./Court.css";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { AddFavorite, GetCourts } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice"
import star from "../../../img/star.png";

export const Court = () => {

    const [courts, setCourts] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});

    useEffect(() => {
        const getCourts = async () => {
            try {
                if (token) {
                    const fetched = await GetCourts(token);
                    console.log(fetched);
                    setCourts(fetched.data);
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
            console.log(fetched);
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
                            <img className="starCourt" src={star} alt="Favortios" />
                        </button>
                        <div className="textCourt">{court.name}</div>
                    </div>

                    <div className="directionMaps">
                        <div >{court.direction}</div>
                        <div className="divSpace"></div>
                        {<a className="maps" href={court.URL_maps} target="_blank">
                            {court.URL_maps}
                        </a>}
                    </div>
                </div>
            ))}
        </div>
    )
}