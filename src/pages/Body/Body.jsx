import { Routes, Route, Navigate } from "react-router-dom"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Profile } from "../Profile/Profile"
import { ProfileEdit } from "../ProfileEdit/ProfileEdit"
import { Match } from "../Match/Matchs"



export const Body = () => {

    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace/>} />
            <Route path="/" element={<Match />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-edit" element={<ProfileEdit />} />
        </Routes>
    )
}