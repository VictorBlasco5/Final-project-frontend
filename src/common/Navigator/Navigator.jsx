import "./Navigator.css"

import { useNavigate } from "react-router-dom"

export const Navigator = ({ title, path }) => {

    const navigate = useNavigate()

    return (
        <div className="navigatorDesign" onClick={() => navigate(path)}>
            {title}
        </div>
    )
}