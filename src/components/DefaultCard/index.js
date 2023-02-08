import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import "./DefaultCard.scss";

function DefaultCard({nft}) {
    const [diamond, setDiamond] = useState("dark");
    const { theme, changeTheme } = useContext(ContextApp);
    return (
        <div
            className={`${theme === "light" ? "cardDefault" : "cardDefault cardDefault-dark"}`}
            onMouseOver={() => setDiamond("light")}
            onMouseOut={() => setDiamond("dark")}
            style={{ background: theme === "light" ? "#fff" : "#2B3239", color: theme === "light" ? "#000" : "#fff" }}>
            <img className="cardDefault__photo" src={`./img/card/photo-${nft?.img}.svg`} alt="Card" />
            <div className="cardDefault__info">
                <div className="cardDefault__info-left">
                    <h6 className="cardDefault__info-left-title">{nft?.name}</h6>
                    <p
                        className="cardDefault__info-left-price"
                        style={{ color: theme === "light" ? "#0088cc" : "#fff" }}>
                        <img src={`./img/card/diamond-${diamond}.png`} alt="Price" />
                        {nft?.price}
                    </p>
                </div>
                <div className="cardDefault__info-right">
                    <div class="cardDefault__info-right-user">
                        <img className="cardDefault__info-right-user-avatar" src="./img/card/avatar.png" alt="Avatar" />
                        <p className="cardDefault__info-right-user-name">by {nft?.creator}</p>
                    </div>
                    <button class="cardDefault__info-right-auction">{nft?.status}</button>
                    <ul className="cardDefault__info-right-emoji">
                        <li className={"cardDefault__info-right-emoji-item-" + theme}>
                            ❤️<span>{nft?.emotions[0]}</span>
                        </li>
                        <li className={"cardDefault__info-right-emoji-item-" + theme}>
                            🤣<span>{nft?.emotions[1]}</span>
                        </li>
                        <li className={"cardDefault__info-right-emoji-item-" + theme}>
                            😍<span>{nft?.emotions[2]}</span>
                        </li>
                        <li className={"cardDefault__info-right-emoji-item-" + theme}>
                            😡<span>{nft?.emotions[3]}</span>
                        </li>
                        <li className={"cardDefault__info-right-emoji-itemCount"}>
                            +3
                        </li>
                    </ul>
                </div>
            </div>
            <ul className="cardDefault__menuEmoji" style={{backgroundColor: changeTheme("#fff", "#2B3239")}}>
                <li className="cardDefault__menuEmoji-item">❤️</li>
                <li className="cardDefault__menuEmoji-item">🤣</li>
                <li className="cardDefault__menuEmoji-item">😍</li>
                <li className="cardDefault__menuEmoji-item">😡</li>
                <li className="cardDefault__menuEmoji-item">🙀</li>
                <li className="cardDefault__menuEmoji-item">🥴</li>
                <li className="cardDefault__menuEmoji-item">🤑</li>
            </ul>
            <ul class="cardDefault__emoji">
                <li className={"cardDefault__emoji-item-" + theme}>
                    ❤️<span>{nft?.emotions[0]}</span>
                </li>
                <li className={"cardDefault__emoji-item-" + theme}>
                    🤣<span>{nft?.emotions[1]}</span>
                </li>
                <li className={"cardDefault__emoji-item-" + theme}>
                    😍<span>{nft?.emotions[2]}</span>
                </li>
                <li className={"cardDefault__emoji-item-" + theme}>
                    😡<span>{nft?.emotions[3]}</span>
                </li>
                <li className={"cardDefault__emoji-item-" + theme}>
                    🙀<span>{nft?.emotions[4]}</span>
                </li>
                <li className={"cardDefault__emoji-item-" + theme}>
                    🥴<span>{nft?.emotions[5]}</span>
                </li>
                <li className={"cardDefault__emoji-item-" + theme}>
                    🤑<span>{nft?.emotions[6]}</span>
                </li>
            </ul>
        </div>
    );
}

export default DefaultCard;
