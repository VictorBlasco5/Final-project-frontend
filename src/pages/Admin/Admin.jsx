import "./Admin.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { DeleteCourt, DeleteMatch, DeleteUsers, GetCourts, GetMatches, GetUsers } from "../../services/apiCalls";
import deleteUser from "../../../img/userRemove.png";
import deleteMatch from "../../../img/delete.png";
import add from "../../../img/add.png";
import { useNavigate } from "react-router-dom"

export const Admin = () => {

    const [users, setUsers] = useState([])
    const [matches, setMatches] = useState([])
    const [courts, setCourts] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const [showUsers, setShowUsers] = useState(true);
    const [showMatches, setShowMatches] = useState(false);
    const [showCourts, setShowCourts] = useState(false);
    const navigate = useNavigate()

    const handleShowUsers = () => {
        setShowUsers(true);
        setShowMatches(false);
        setShowCourts(false);
    };

    const handleShowMatches = () => {
        setShowUsers(false);
        setShowMatches(true);
        setShowCourts(false);
    };

    const handleShowCourts = () => {
        setShowUsers(false);
        setShowMatches(false);
        setShowCourts(true);
    };

    useEffect(() => {
        if (users.length === 0) {
            const recoverUsers = async () => {
                try {
                    const fetched = await GetUsers(token)
                    setUsers(fetched.data)

                } catch (error) {
                    console.log(error);
                }
            }
            recoverUsers()
        }
    }, [users])

    const userRemove = async (userId) => {
        try {
            await DeleteUsers(userId, token)
            const updatedUsers = await GetUsers(token);
            setUsers(updatedUsers.data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (matches.length === 0) {
            const recoverMatches = async () => {
                try {
                    const fetched = await GetMatches(token)
                    setMatches(fetched)

                } catch (error) {
                    console.log(error);
                }
            }
            recoverMatches()
        }
    }, [matches])

    const matchRemove = async (matchId) => {
        try {
            await DeleteMatch(matchId, token)
            const updatedMatches = await GetMatches(token);
            setMatches(updatedMatches);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (courts.length === 0) {
            const recoverCourts = async () => {
                try {
                    const fetched = await GetCourts(token)
                    setCourts(fetched.data)

                } catch (error) {
                    console.log(error);
                }
            }
            recoverCourts()
        }
    }, [courts])

    const courtRemove = async (courtId) => {
        try {
            await DeleteCourt(courtId, token)
            const updatedCourts = await GetCourts(token);
            setCourts(updatedCourts.data);

        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="adminDesign"
        style={{
            backgroundImage: `url(${('../../../img/court-70.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '88vh',
        }}>
            <div className="containTable">
                <button className="buttonTableAdmin" onClick={handleShowUsers}>Users</button>
                <button className="buttonTableAdmin" onClick={handleShowCourts}>Pistas</button>
                <button className="buttonTableAdmin" onClick={handleShowMatches}>Partidos</button>
            </div>
            <div className="adminDesign">
                {showUsers ? (
                    <div className="table">
                        {users.length > 0 ? (
                            <table>
                                <thead>
                                    <tr className="header">
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Nickname</th>
                                        <th>Email</th>
                                        <th>Posición</th>
                                        <th>Presentación</th>
                                        <th>Url foto</th>
                                        <th>Rol</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.nickname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.favorite_position}</td>
                                            <td>{user.presentation}</td>
                                            <td>{user.image}</td>
                                            {/* <td>{user.presentation.length > 80 ? user.presentation.substring(0, 80) + "..." : user.presentation}</td> */}
                                            {/* <td>{user.image.length > 50 ? user.image.substring(0, 50) + "..." : user.image}</td> */}
                                            <td>{user.role.name}</td>
                                            <td>
                                                <button
                                                    className="buttonDeleteAdmin"
                                                    onClick={() => userRemove(user.id)}>
                                                    <img className="deleteUser" src={deleteUser} alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>CARGANDO</div>
                        )}
                    </div>
                ) : null}
                {showMatches ? (
                    <div className="table">
                        {matches && matches.length > 0 ? (
                            <table>
                                <thead>
                                    <tr className="header">
                                        <th>Id</th>
                                        <th>Número jugadores</th>
                                        <th>Información</th>
                                        <th>Fecha</th>
                                        <th>Fecha creación</th>
                                        <th>Fecha actualización</th>
                                        <th>Pista</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matches.map(match => (
                                        <tr key={match.id}>
                                            <td>{match.id}</td>
                                            <td>{match.number_players}</td>
                                            <td>{match.information.length > 55 ? match.information.substring(0, 55) + "..." : match.information}</td>
                                            <td>{formatDate(match.match_date)}</td>
                                            <td>{formatDate(match.created_at)}</td>
                                            <td>{formatDate(match.updated_at)}</td>
                                            <td>{match.court.name}</td>
                                            <td>
                                                <button
                                                    className="buttonDeleteAdmin"
                                                    onClick={() => matchRemove(match.id)}>
                                                    <img className="deleteUser" src={deleteMatch} alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>LOADING</div>
                        )}
                    </div>
                ) : null}
                {showCourts ? (
                    <div className="table">
                        {courts && courts.length > 0 ? (
                            <table>
                                <thead>
                                    <tr className="header">
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Dirección</th>
                                        <th>Fecha creación</th>
                                        <th>Fecha actualización</th>
                                        <th>
                                            <button
                                                className="buttonDeleteAdmin"
                                                onClick={() => navigate("/new-court")}
                                            >
                                                <img className="deleteUser" src={add} alt="Nueva pista" />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courts.map(court => (
                                        <tr key={court.id}>
                                            <td>{court.id}</td>
                                            <td>{court.name}</td>
                                            <td>{court.direction}</td>
                                            <td>{formatDate(court.created_at)}</td>
                                            <td>{formatDate(court.updated_at)}</td>
                                            <td>
                                                <button
                                                    className="buttonDeleteAdmin"
                                                    onClick={() => courtRemove(court.id)}>
                                                    <img className="deleteUser" src={deleteMatch} alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>LOADING</div>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
};