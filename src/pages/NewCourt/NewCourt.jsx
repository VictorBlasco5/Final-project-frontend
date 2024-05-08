import "./NewCourt.css";
import { CreateCourt } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const NewCourt = () => {

    const reduxUser = useSelector(userData)
    const navigate = useNavigate()
    const token = reduxUser.credentials.token || ({});
    const [courts, setCourts] = useState([])
    const [msgError, setMsgError] = useState("");
    const [msgSuccessfully, setMsgSuccessfully] = useState("");

    const inputHandler = (e) => {
        setCourts((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const newCourt = async () => {
        try {
            const fetched = await CreateCourt(token, courts)
            if (fetched && fetched.success) {
                setMsgSuccessfully("Court created")
                setTimeout(() => {
                    navigate("/admin")
                }, 1000)
            }

        } catch (error) {
            setMsgError("It's not possible to create the court");
            console.log(error);
        }
    }

    return (
        <div className="newCourtDesign"
        style={{
            backgroundImage: `url(${('../../../img/court-70.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '88vh',
        }}>
            <CInput
                className={`cInputNewMatch`}
                type="text"
                name={"name"}
                placeholder={"Name"}
                value={courts.name || ""}
                disabled={""}
                changeEmit={inputHandler}
            // onBlurFunction={(e) => checkError(e)}
            />
            <CInput
                className={`cInputNewMatch`}
                type="text"
                name={"direction"}
                placeholder={"Dirección"}
                value={courts.direction || ""}
                disabled={""}
                changeEmit={inputHandler}
            // onBlurFunction={(e) => checkError(e)}
            />

            <button
                className="buttonCreateMatch"
                onClick={() => newCourt()}
            >Crear pista</button>

        </div>
    )
}