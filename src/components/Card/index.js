import { useContext } from "react";
import "./Card.scss";
import { ContextApp } from "../../Context";

function Card() {
    const { theme } = useContext(ContextApp);
    return (
        <div
            className={`${theme === "light" ? "card" : "card card-dark"}`}
            style={{ background: theme === "light" ? "#fff" : "#2B3239", color: theme === "light" ? "#000" : "#fff" }}>
            <img className="card__photo" src="./img/card/photo-1.svg" alt="Card" />
            <div className="card__info">
                <div className="card__info-left">
                    <h6 className="card__info-left-title">KingCrypto</h6>
                    <p className="card__info-left-price" style={{ color: theme === "light" ? "#0088cc" : "#fff" }}>
                        0.25 TON
                    </p>
                </div>
                <div className="card__info-right">
                    <div class="card__info-right-user">
                        <img className="card__info-right-user-avatar" src="./img/card/avatar.png" alt="Avatar" />
                        <p className="card__info-right-user-name">by Arkhan</p>
                    </div>
                    <ul className="card__info-right-emoji">
                        <li className={"card__info-right-emoji-item-" + theme}>
                            ❤️<span>250</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🤣<span>25</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            😍<span>250</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            😡<span>25</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🙀<span>25</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🥴<span>25</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🤑<span>25</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ul className="card__menuEmoji">
                <li className="card__menuEmoji-item">❤️</li>
                <li className="card__menuEmoji-item">🤣</li>
                <li className="card__menuEmoji-item">😍</li>
                <li className="card__menuEmoji-item">😡</li>
                <li className="card__menuEmoji-item">🙀</li>
                <li className="card__menuEmoji-item">🥴</li>
                <li className="card__menuEmoji-item">🤑</li>
            </ul>
        </div>
    );
}

export default Card;
