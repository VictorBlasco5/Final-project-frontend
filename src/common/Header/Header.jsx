import "./Header.css"
import { Navigator } from "../Navigator/Navigator"
import ball from "../../../img/logo.png";

//redux
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../app/slices/userSlice"
import { useEffect } from "react"


export const Header = () => {

    //instancia conexion lectura
    const reduxUser = useSelector(userData)

    //intancia conexion escritura
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(reduxUser, "credenciales auth");
    }, [reduxUser])

    return (
        
            <div className="headerDesign">

                <div className="ballNavBar">
                    <div className="ball"><img className="icon" src={ball} alt="ball" /></div>
                </div>

                {
                    reduxUser?.credentials?.token
                        ? (
                            <div className="positionNavBar">
                                {reduxUser?.credentials?.user?.roleName === "admin"
                                    ? (
                                        <div ><Navigator title={"Admin"} path={"/admin"} /></div>
                                    ) : (
                                        <div></div>
                                    )}
                                {reduxUser?.credentials?.user?.roleName === "user"
                                    ? (
                                        <div > <Navigator title={"Matches"} path={"/"} /></div>
                                    ) : (
                                        <div></div>
                                    )}
                                <Navigator title={reduxUser?.credentials?.user?.name} path="/profile" />
                                < div className="logOutDesign"
                                    onClick={() => dispatch(logout({ credentials: "" }))}>
                                    Log out
                                </div>
                            </div>
                        ) : (
                            <div className="positionNavBar">
                                <Navigator title={"Register"} path={"/register"} />
                                <Navigator title={"Login"} path={"/login"} />
                            </div>
                        )
                }
            </div>
        
    )
}