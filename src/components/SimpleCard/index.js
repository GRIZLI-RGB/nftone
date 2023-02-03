import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import "./SimpleCard.scss";

function SimpleCard() {
    const [diamond, setDiamond] = useState("dark");
    const { theme, changeTheme } = useContext(ContextApp);
    return (
        <div
            className={changeTheme("simpleCard", "simpleCard simpleCard--dark")}
            onMouseOver={() => setDiamond("light")}
            onMouseOut={() => setDiamond("dark")}
            style={{ background: changeTheme("#fff", "#2B3239"), color: changeTheme("#000", "#fff") }}>
            <img className="simpleCard__photo" src="./img/card/photo-1.svg" alt="Card" />
            <div className="simpleCard__info">
                <div className="simpleCard__info-left">
                    <h6 className="simpleCard__info-left-title">KingCrypto</h6>
                    <p className="simpleCard__info-left-price" style={{ color: theme === "light" ? "#0088cc" : "#fff" }}>
                        <img src={`./img/card/diamond-${diamond}.png`} alt="Price" />
                        0.25 TON
                    </p>
                </div>
                <div className="simpleCard__info-right">
                    <div class="simpleCard__info-right-user">
                        <img className="simpleCard__info-right-user-avatar" src="./img/card/avatar.png" alt="Avatar" />
                        <p className="simpleCard__info-right-user-name">by Arkhan</p>
                    </div>
                    <div className="simpleCard__info-right-count">
                        1 of 321
                    </div>
                </div>
            </div>
            <ul className="simpleCard__menuEmoji">
                <li className="simpleCard__menuEmoji-item">❤️</li>
                <li className="simpleCard__menuEmoji-item">🤣</li>
                <li className="simpleCard__menuEmoji-item">😍</li>
                <li className="simpleCard__menuEmoji-item">😡</li>
                <li className="simpleCard__menuEmoji-item">🙀</li>
                <li className="simpleCard__menuEmoji-item">🥴</li>
                <li className="simpleCard__menuEmoji-item">🤑</li>
            </ul>
        </div>
    );
}

export default SimpleCard;
