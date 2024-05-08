import "./MatchDetail.css";


import { detailData } from "../../app/slices/matchDetailSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice";

export const MatchDetail = () => {

    const reduxUser = useSelector(userData)
    const detailRdx = useSelector(detailData);
    const navigate = useNavigate();
    const token = reduxUser.credentials.token || ({});

    useEffect(() => {

        if (!detailRdx?.detail) {
            navigate("/match-detail");
        }
    }, [detailRdx]);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="matchDetailDesign"
        style={{
            backgroundImage: `url(${('../../../img/court-70.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '88vh',
        }}>
            <div className="cardMatchDetail">
                <div className="text date"> {formatDate(detailRdx?.detail?.match_date)}</div>
                <div className="rowCard margin">
                    <div>Jugadores: {detailRdx?.detail?.number_players} </div>
                    <div className="space2"></div>
                    <div>Apuntados:{detailRdx?.detail?.signedCount}</div>
                </div>
                <div className="text">{detailRdx?.detail?.information}</div>
                <div className="margin"></div>
                <div className="text">{detailRdx?.detail?.court?.name}</div>
                <div className="text">{detailRdx?.detail?.court?.direction}</div>
            </div>
        </div>
    )
}