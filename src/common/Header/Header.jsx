import "./Header.css"
import { Navigator } from "../Navigator/Navigator"
import logoPerson from "../../../img/logo.png";
import star from "../../../img/star.png";
import { useNavigate } from "react-router-dom"

//redux
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../app/slices/userSlice"
import { useEffect } from "react"

export const Header = () => {

    //instancia conexion lectura
    const reduxUser = useSelector(userData)

    //intancia conexion escritura
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // console.log(reduxUser, "credenciales auth");
    }, [reduxUser])

    return (
        <div className="headerDesign">

            <div className="logoNavBar">
                <div className="logoPerson"><img className="icon" src={logoPerson} alt="Logo" /></div>
            </div>

            {
                reduxUser?.credentials?.token
                    ? (
                        <div className="positionNavBar">

                            {reduxUser?.credentials?.user?.roleName === "admin"
                                ? (
                                    <div className="navigatorDesign"><Navigator title={"Admin"} path={"/admin"} /></div>
                                ) : (
                                    <div></div>
                                )}
                            {reduxUser?.credentials?.user?.roleName === "user"
                                ? (
                                    <div className="navigatorDesign">
                                        <Navigator title={<img className="starHeader" src={star} alt="Favortios" />} path={"/favorite-court"} />
                                        <Navigator title={"Partidos"} path={"/matches"} />
                                        <Navigator title={"Pistas"} path={"/court"} />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            <Navigator title={reduxUser?.credentials?.user?.name} path="/profile" />

                            < div className="logOutDesign"
                                onClick={() => {
                                    dispatch(logout({ credentials: "" }));
                                    navigate('/');
                                }}>
                                Cerrar sesión
                            </div>
                        </div>
                    ) : (
                        <div className="positionNavBar">
                            <Navigator title={"Registro"} path={"/register"} />
                            <Navigator title={"Iniciar sesión"} path={"/login"} />
                        </div>
                    )
            }
        </div>
    )
}