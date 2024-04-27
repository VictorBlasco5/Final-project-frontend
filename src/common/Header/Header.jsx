import "./Header.css"
import { Navigator } from "../Navigator/Navigator"


export const Header = () => {

    return (
        <div className="headerDesign">
            <Navigator title={"Home"} destination={"/"} />
            <Navigator title={"Register"} destination={"/register"} />
        </div>
    )
}