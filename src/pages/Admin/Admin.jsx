import "./Admin.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { GetUsers } from "../../services/apiCalls";

export const Admin = () => {

    const [users, setUsers] = useState([])
    const [matches, setMatches] = useState([])
    const reduxUser = useSelector(userData)
    const token = reduxUser.credentials.token || ({});
    const [showUsers, setShowUsers] = useState(true);

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
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Nickname</th>
                                        <th>Email</th>
                                        <th>Posición</th>
                                        <th>Presentación</th>
                                        <th>Url foto</th>
                                        <th>Rol</th>
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
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>CARGANDO</div>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}