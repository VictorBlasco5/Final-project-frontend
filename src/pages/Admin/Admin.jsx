import "./Admin.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { DeleteCourt, DeleteMatch, DeleteUsers, GetCourts, GetMatches, GetUsers } from "../../services/apiCalls";
import deleteUser from "../../../img/userRemove.png";
import deleteMatch from "../../../img/delete.png";
import add from "../../../img/add.png";
import arrowRight from "../../../img/arrowRight.png";
import arrowLeft from "../../../img/arrowLeft.png";
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

    const [currentPageUsers, setCurrentPageUsers] = useState(1);
    const [currentPageMatches, setCurrentPageMatches] = useState(1);
    const [currentPageCourts, setCurrentPageCourts] = useState(1);
    const itemsPerPage = 8;
    const totalPagesUsers = Math.ceil(users.length / itemsPerPage);
    const totalPagesMatches = Math.ceil(matches.length / itemsPerPage);
    const totalPagesCourts = Math.ceil(courts.length / itemsPerPage);


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

    // Paginación
    const paginate = (items, pageNumber) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    return (
        <div className="adminDesign"
            style={{
                backgroundImage: `url('/court-70.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}>
            <div draggable="false" className="containTable">
                <button className="buttonTableAdmin" onClick={handleShowUsers}>Users</button>
                <button className="buttonTableAdmin" onClick={handleShowCourts}>Pistas</button>
                <button className="buttonTableAdmin" onClick={handleShowMatches}>Partidos</button>
            </div>
            <div className="adminDesign">
                {showUsers && (
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
                                    {paginate(users, currentPageUsers).map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.nickname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.favorite_position}</td>
                                            <td>{user.presentation}</td>
                                            <td>{user.image}</td>
                                            <td>{user.role.name}</td>
                                            <td>
                                                <button
                                                    className="buttonDeleteAdmin"
                                                    onClick={() => userRemove(user.id)}>
                                                    <img draggable="false" className="logoDelete" src={deleteUser} alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>CARGANDO</div>
                        )}
                        <div className="pagination">
                            <button
                                className="buttonAnterior"
                                onClick={() => setCurrentPageUsers(prev => Math.max(prev - 1, 1))}
                                disabled={currentPageUsers === 1} // Deshabilita en la primera página
                            >
                                <img draggable="false" className="logoArrow" src={arrowLeft} alt="Anterior" />
                            </button>
                            <div className="spacePaginate"></div>
                            <span className="numberPage">{currentPageUsers}</span>
                            <div className="spacePaginate"></div>
                            <button
                                className="buttonSiguiente"
                                onClick={() => setCurrentPageUsers(prev => prev + 1)}
                                disabled={currentPageUsers >= totalPagesUsers} // Deshabilita en la última página
                            >
                                <img draggable="false" className="logoArrow" src={arrowRight} alt="Siguiente" />
                            </button>
                        </div>

                    </div>
                )}

                {showMatches && (
                    <div className="table">
                        {matches.length > 0 ? (
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
                                    {paginate(matches, currentPageMatches).map(match => (
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
                                                    <img draggable="false" className="logoDelete" src={deleteMatch} alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>LOADING</div>
                        )}
                        <div className="pagination">
                            <button
                                className="buttonAnterior"
                                onClick={() => setCurrentPageMatches(prev => Math.max(prev - 1, 1))}
                                disabled={currentPageMatches === 1} // Deshabilita en la primera página
                            >
                                <img draggable="false" className="logoArrow" src={arrowLeft} alt="Anterior" />
                            </button>
                            <div className="spacePaginate"></div>
                            <span className="numberPage">{currentPageMatches}</span>
                            <div className="spacePaginate"></div>
                            <button
                                className="buttonSiguiente"
                                onClick={() => setCurrentPageMatches(prev => prev + 1)}
                                disabled={currentPageMatches >= totalPagesMatches} // Deshabilita en la última página
                            >
                                <img draggable="false" className="logoArrow" src={arrowRight} alt="Siguiente" />
                            </button>
                        </div>

                    </div>
                )}

                {showCourts && (
                    <div className="table">
                        {courts.length > 0 ? (
                            <table>
                                <thead>
                                    <tr className="header">
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Dirección</th>
                                        <th>URL google maps</th>
                                        <th>Fecha creación</th>
                                        <th>Fecha actualización</th>
                                        <th>
                                            <button
                                                className="buttonDeleteAdmin"
                                                onClick={() => navigate("/new-court")}
                                            >
                                                <img draggable="false" className="logoDelete" src={add} alt="Nueva pista" />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginate(courts, currentPageCourts).map(court => (
                                        <tr key={court.id}>
                                            <td>{court.id}</td>
                                            <td>{court.name}</td>
                                            <td>{court.direction}</td>
                                            <td>{court.URL_maps}</td>
                                            <td>{formatDate(court.created_at)}</td>
                                            <td>{formatDate(court.updated_at)}</td>
                                            <td>
                                                <button
                                                    className="buttonDeleteAdmin"
                                                    onClick={() => courtRemove(court.id)}>
                                                    <img draggable="false" className="logoDelete" src={deleteMatch} alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>LOADING</div>
                        )}
                        <div className="pagination">
                            <button
                                className="buttonAnterior"
                                onClick={() => setCurrentPageCourts(prev => Math.max(prev - 1, 1))}
                                disabled={currentPageCourts === 1} // Deshabilita en la primera página
                            >
                                <img draggable="false" className="logoArrow" src={arrowLeft} alt="Anterior" />
                            </button>
                            <div className="spacePaginate"></div>
                            <span className="numberPage">{currentPageCourts}</span>
                            <div className="spacePaginate"></div>
                            <button
                                className="buttonSiguiente"
                                onClick={() => setCurrentPageCourts(prev => prev + 1)}
                                disabled={currentPageCourts >= totalPagesCourts} // Deshabilita en la última página
                            >
                                <img draggable="false" className="logoArrow" src={arrowRight} alt="Siguiente" />
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
};