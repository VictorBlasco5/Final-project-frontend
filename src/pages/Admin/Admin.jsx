import "./Admin.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { DeleteMatch, DeleteUsers, GetMatches, GetUsers } from "../../services/apiCalls";
import deleteUser from "../../../img/userRemove.png";
import deleteMatch from "../../../img/delete.png";

export const Admin = () => {

    const [users, setUsers] = useState([])
    const [matches, setMatches] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const [showUsers, setShowUsers] = useState(true);
    // const [showMatches, setShowMatches] = useState(false);
    // const [showCourts, setShowCourts] = useState(false);

    const handleShowUsers = () => {
        setShowUsers(true);
    };

    const handleShowCourts = () => {
        setShowUsers(false);
    };

    const handleShowMatches = () => {
        setShowUsers(false);
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
    }, [users])

    const matchRemove = async (matchId) => {
        try {
            await DeleteMatch(matchId, token)
            const updatedMatches = await GetMatches(token);
            setMatches(updatedMatches);

        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="adminDesign">
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
                                            <td>{user.role.name}</td>
                                            <td>
                                                <button
                                                    className="buttonDeleteAdmin"
                                                    onClick={() => userRemove(user.id)}>
                                                    <img className="deleteUser" src={deleteUser} alt="" />
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
                ) : (
                    <div>
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
                                                <td>{match.information}</td>
                                                <td>{formatDate(match.match_date)}</td>
                                                <td>{formatDate(match.created_at)}</td>
                                                <td>{formatDate(match.updated_at)}</td>
                                                <td>{match.court.name}</td>
                                                <td>
                                                    <button
                                                        className="buttonDeleteAdmin"
                                                        onClick={() => matchRemove(match.id)}>
                                                        <img className="deleteUser" src={deleteMatch} alt="" />
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
                    </div>
                )}
            </div>
        </div>
    )
}