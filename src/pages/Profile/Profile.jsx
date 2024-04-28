import "./Profile.css"
import { useNavigate } from "react-router-dom"
import { userData } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const Profile = () => {

    const navigate = useNavigate()

    //conectar con redux lectura

    const reduxUser = useSelector(userData)

    useEffect(() => {
        if (!reduxUser.credentials.token) {
            navigate("/")
        }
    },[reduxUser])

    return (
        <>
        <div className="profileDesign">
            Profile
        </div>
        </>
    )
}