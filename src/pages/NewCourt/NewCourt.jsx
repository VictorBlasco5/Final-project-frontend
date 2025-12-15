import "./NewCourt.css";
import { CreateCourt } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { validation } from "../../utils/functions";

export const NewCourt = () => {

    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});
    const [courts, setCourts] = useState([])
    const [courtsError, setCourtsError] = useState({
        nameError: "",
        directionError: "",
        URL_mapsError: ""
    })
    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");

    const inputHandler = (e) => {
        setCourts((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setCourtsError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    }

    const newCourt = async () => {
        try {
            if (!courts.name || !courts.direction || !courts.URL_maps) {
                throw new Error("Todos los campos deben estar completos");
            }
            setMsgError("");

            const fetched = await CreateCourt(token, courts)
            if (fetched && fetched.success) {
                setMsgSuccessfully("Pista creada")
                setTimeout(() => {
                    navigate("/court-admin")
                }, 750)
            }

        } catch (error) {
            setMsgError(error.message);
            console.log(error);
        }
    }

    return (
        <div className="newCourtDesign"
            style={{
                backgroundImage: `url('/court-70.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}>
            <CInput
                className={`cInputNewMatch ${courtsError.nameError !== "" ? "inputDesignError" : ""}`}
                type="text"
                name={"name"}
                placeholder={"Nombre"}
                value={courts.name || ""}
                disabled={""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{courtsError.nameError}</div>
            <CInput
                className={`cInputNewMatch ${courtsError.directionError !== "" ? "inputDesignError" : ""}`}
                type="text"
                name={"direction"}
                placeholder={"Dirección"}
                value={courts.direction || ""}
                disabled={""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{courtsError.directionError}</div>
            <CInput
                className={`cInputNewMatch ${courtsError.URL_mapsError !== "" ? "inputDesignError" : ""}`}
                type="text"
                name={"URL_maps"}
                placeholder={"URL maps"}
                value={courts.URL_maps || ""}
                disabled={""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{courtsError.URL_mapsError}</div>
            <button
                className="buttonCreateMatch"
                onClick={() => newCourt()}
            >Crear pista</button>
            <div className="successfully">{msgSuccessfully} </ div>
            <div className="error">{msgError} </ div>
        </div>
    )
}