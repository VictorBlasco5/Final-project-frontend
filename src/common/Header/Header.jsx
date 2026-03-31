import "./Header.css"
import { Navigator } from "../Navigator/Navigator"
import logoPerson from "../../../img/logo.png";
import star from "../../../img/star.png";
import { useNavigate } from "react-router-dom"

//redux
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../app/slices/userSlice"
import { useEffect, useState } from "react"

export const Header = () => {

    const reduxUser = useSelector(userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const closeMobileMenu = () => setIsMobileMenuOpen(false)

    const handleLogout = () => {
        dispatch(logout({ credentials: "" }));
        closeMobileMenu();
        navigate('/');
    }

    useEffect(() => {
        closeMobileMenu();
    }, [reduxUser])

    return (
        <div className="headerDesign">
            <div className="logoNavBar">
                <div className="logoPerson"><img draggable="false" className="icon" src={logoPerson} alt="Logo" /></div>
            </div>
            <button
                className="hamburgerButton"
                onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
                aria-label="Abrir menu"
                aria-expanded={isMobileMenuOpen}
                type="button"
            >
                {isMobileMenuOpen ? "X" : "☰"}
            </button>
            {
                reduxUser?.credentials?.token
                    ? (
                        <div className={`positionNavBar ${isMobileMenuOpen ? "mobileMenuOpen" : ""}`}>
                            {reduxUser?.credentials?.user?.roleName === "admin"
                                ? (
                                    <div className="navGroup">
                                        <Navigator title={"Admin"} path={"/admin"} onNavigate={closeMobileMenu} />
                                        <Navigator title={"Pistas"} path={"/court-admin"} onNavigate={closeMobileMenu} />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            {reduxUser?.credentials?.user?.roleName === "user"
                                ? (
                                    <div className="navGroup">
                                        <Navigator title={<img draggable="false" className="starHeader" src={star} alt="Favortios" />} path={"/favorite-court"} onNavigate={closeMobileMenu} />
                                        <Navigator title={"Partidos"} path={"/matches"} onNavigate={closeMobileMenu} />
                                        <Navigator title={"Pistas"} path={"/court"} onNavigate={closeMobileMenu} />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            <Navigator title={reduxUser?.credentials?.user?.name} path="/profile" onNavigate={closeMobileMenu} />

                            < div className="logOutDesign"
                                onClick={handleLogout}>
                                Cerrar sesión
                            </div>
                        </div>
                    ) : (
                        <div className={`positionNavBar ${isMobileMenuOpen ? "mobileMenuOpen" : ""}`}>
                            <Navigator title={"Registro"} path={"/register"} onNavigate={closeMobileMenu} />
                            <Navigator title={"Iniciar sesión"} path={"/login"} onNavigate={closeMobileMenu} />
                        </div>
                    )
            }
        </div>
    )
}