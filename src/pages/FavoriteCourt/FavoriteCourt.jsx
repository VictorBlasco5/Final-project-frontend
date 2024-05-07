import "./FavoriteCourt.css";
import { GetMyFavoriteCourts } from "../../services/apiCalls";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { userData } from "../../app/slices/userSlice"


export const FavoriteCourt = () => {

    const [courts, setCourts] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});


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
        <div className="favoriteCourtDesign">
            {courts.map((court) => (
                <div className="courtCard" key={court.id}>
                    <div className="textCourt">{court.name}</div>
                    <div >{court.direction}</div>
                </div>
            ))}
        </div>
    )
}