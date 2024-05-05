import "./Home.css";
import ball from "../../../img/logo.png";
import amigo from "../../../img/friends.png";
import number1 from "../../../img/n1.png";
import court from "../../../img/court.png";


export const Home = () => {
    return (
        <div className="homeDesign"
        >
            <div className="leftHome">
                <img className="logoHome" src={ball} alt="ball" />
            </div>
            <div>
                <div className="textHome">
                    <div>NOMBRE</div>
                    <div>La web número 1 de España para jugar y hacer amigos</div>

                </div>
                <div className="downHome">
                    <div className="friends">
                        <img className="logoFriends" src={amigo} alt="Amigos" />
                        <div>Haz amigos tio</div>
                    </div>
                    <div className="numberOne">
                        <img className="logoNumberOne" src={number1} alt="Número 1" />
                        <div>Semos los megore</div>
                    </div>
                    <div className="court">
                        <img className="logoCourt" src={court} alt="Pista" />
                        <div>Moltos matches</div>
                    </div>
                </div>
            </div>

        </div>
    )
}