import './CourtAdmin.css';
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { GetCourts, UpdateCourt } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice"
import { CInput } from '../../common/CInput/CInput';
import { CButton } from '../../common/CButton/CButton';
import { CTextArea } from '../../common/CTextArea/CTextArea';
import { useNavigate } from "react-router-dom"
import add from "../../../img/add.png";


export const CourtAdmin = () => {
    const navigate = useNavigate()
    const [courts, setCourts] = useState([]);
    const reduxUser = useSelector(userData);
    const token = reduxUser.credentials.token || {};
    const [change, setChange] = useState(null);

    useEffect(() => {
        const getCourts = async () => {
            try {
                if (token) {
                    const fetched = await GetCourts(token);
                    setCourts(fetched.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCourts();
    }, [token]);

    const inputHandler = (index, field, value) => {
        const updatedCourts = [...courts];
        updatedCourts[index][field] = value;
        setCourts(updatedCourts);
    };

    const updateCourtAdmin = async (court, courtId) => {
        try {
            const fetched = await UpdateCourt(token, court, courtId);
            setChange(null); //Desactivo edición
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="courtAdminDesign"
            style={{
                backgroundImage: `url(${('../../../img/court-70.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}>

            <button className="buttonNewMatch" onClick={() => navigate("/new-court")}>
                <img draggable="false" className="add" src={add} alt="+" />
            </button>
            <div className="positionCourtCard">
                {courts.map((court, index) => (
                    <div className="courtCardAdmin" key={court.id}>
                        <CInput
                            className={"courtName"}
                            type={"text"}
                            placeholder={""}
                            value={court.name || ""}
                            disabled={change !== index} // Habilito edición solo si coincide el índice 
                            changeEmit={(e) => inputHandler(index, 'name', e.target.value)}
                        />

                        <CTextArea
                            className={"courtDirection"}
                            type={"text"}
                            placeholder={""}
                            name={"direction"}
                            value={court.direction || ""}
                            disabled={change !== index}
                            changeEmit={(e) => inputHandler(index, 'direction', e.target.value)}
                        />

                        <CInput
                            className={"courtName"}
                            type={"text"}
                            placeholder={""}
                            name={"URL_maps"}
                            value={court.URL_maps || ""}
                            disabled={change !== index}
                            changeEmit={(e) => inputHandler(index, 'URL_maps', e.target.value)}
                        />
                        <div className='positionButtonEdit'>
                            <CButton
                                className={"buttonEdit"}
                                title={"Editar"}
                                functionEmit={() => setChange(index)}
                            />
                            {change === index && (
                                <CButton
                                    className={"buttonEdit"}
                                    title={"Confirmar"}
                                    functionEmit={() => updateCourtAdmin(court, court.id)}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
