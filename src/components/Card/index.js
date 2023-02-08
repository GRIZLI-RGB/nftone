import { useContext, useState } from "react";
import "./Card.scss";
import { ContextApp } from "../../Context";

function Card({nft}) {
    const [diamond, setDiamond] = useState("dark");
    const { theme, changeTheme } = useContext(ContextApp);
    return (
        <div
            className={changeTheme("card", "card card--dark")}
            onMouseOver={() => setDiamond('light')}
            onMouseOut={() => setDiamond('dark')}>
            <img className="card__photo" src={`./img/card/photo-${nft?.img}.svg`} alt="Card" />
            <div className="card__info">
                <div className="card__info-left">
                    <h6 className="card__info-left-title">{nft?.name}</h6>
                    <p className="card__info-left-price">
                        <img src={`./img/card/diamond-${diamond}.png`} alt="Price" />
                        {nft?.price}
                    </p>
                </div>
                <div className="card__info-right">
                    <div class="card__info-right-user">
                        <img className="card__info-right-user-avatar" src="./img/card/avatar.png" alt="Avatar" />
                        <p className="card__info-right-user-name">by {nft?.creator}</p>
                    </div>
                    <ul className="card__info-right-emoji">
                        <li className={"card__info-right-emoji-item-" + theme}>
                            ❤️<span>{nft?.emotions[0]}</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🤣<span>{nft?.emotions[1]}</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            😍<span>{nft?.emotions[2]}</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            😡<span>{nft?.emotions[3]}</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🙀<span>{nft?.emotions[4]}</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🥴<span>{nft?.emotions[5]}</span>
                        </li>
                        <li className={"card__info-right-emoji-item-" + theme}>
                            🤑<span>{nft?.emotions[6]}</span>
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
