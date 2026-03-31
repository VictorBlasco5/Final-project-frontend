import "./Navigator.css"

import { useNavigate } from "react-router-dom"

export const Navigator = ({ title, path, onNavigate }) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(path)
        if (onNavigate) {
            onNavigate()
        }
    }

    return (
        <div className="navigatorDesign" onClick={handleNavigate}>
            {title}
        </div>
    )
}