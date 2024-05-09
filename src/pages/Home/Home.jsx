import "./Home.css";
import logoPerson from "../../../img/logo.png";
import friend from "../../../img/friends.png";
import number1 from "../../../img/n1.png";
import court from "../../../img/court.png";


export const Home = () => {
    return (
        <div className="homeDesign"
            style={{
                backgroundImage: `url(${('../../../img/court-70.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '88vh',
            }}
        >
            <div className="leftHome">
                <img className="logoHome" src={logoPerson} alt="Logo" />
            </div>
            <div>
                <div className="textHome">
                    <div className="title">Steal-Dunk</div>
                    <div className="subtitle">¡Bienvenido a la comunidad de baloncesto más grande del mundo!</div>
                </div>
                <div className="downHome">
                    <div className="friends">
                        <img className="logoFriends" src={friend} alt="Amigos" />
                        <div className="textLogos">Conecta con personas que comparten tu pasión y crea una comunidad emocionante.</div>
                    </div>
                    <div className="numberOne">
                        <img className="logoNumberOne" src={number1} alt="Número 1" />
                        <div className="textLogos"> Reconocidos como la aplicación número 1 para los fanáticos del baloncesto en todo el mundo.</div>
                    </div>
                    <div className="court">
                        <img className="logoCourt" src={court} alt="Pista" />
                        <div className="textLogos">Más de 100 partidos esperándote cada mes.</div>
                    </div>
                </div>
            </div>

        </div>
    )
}