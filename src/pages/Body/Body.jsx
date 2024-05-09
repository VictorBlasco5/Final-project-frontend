import { Routes, Route, Navigate } from "react-router-dom"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Profile } from "../Profile/Profile"
import { ProfileEdit } from "../ProfileEdit/ProfileEdit"
import { Match } from "../Match/Match"
import { NewMatch } from "../NewMatch/NewMatch"
import { Admin } from "../Admin/Admin"
import { NewCourt } from "../NewCourt/NewCourt"
import { MatchDetail } from "../MatchDetail/MatchDetail"
import { Home } from "../Home/Home"
import { Court } from "../Court/Court"
import { FavoriteCourt } from "../FavoriteCourt/FavoriteCourt"
import { MatchCourt } from "../MatchCourt/MatchCourt"


export const Body = () => {

    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace/>} />
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Match />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/new-match" element={<NewMatch />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/new-court" element={<NewCourt />} />
            <Route path="/match-detail" element={<MatchDetail />} />
            <Route path="/court" element={<Court />} />
            <Route path="/favorite-court" element={<FavoriteCourt />} />
            <Route path="/matches-court" element={<MatchCourt />} />
        </Routes>
    )
}