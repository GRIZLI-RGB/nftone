import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import "./SimpleCard.scss";

function SimpleCard({nft, avatarHash}) {
    const [diamond, setDiamond] = useState("dark");
    const { theme, changeTheme } = useContext(ContextApp);
    return (
        <div
            className={changeTheme("simpleCard", "simpleCard simpleCard--dark")}
            onMouseOver={() => setDiamond("light")}
            onMouseOut={() => setDiamond("dark")}
            style={{ background: changeTheme("#fff", "#2B3239"), color: changeTheme("#000", "#fff") }}>
            <img className="simpleCard__photo" src={`https://nft-one.art/api/files/thumb/?hash=${nft.img.hash}`} alt="Card" />
            <div className="simpleCard__info">
                <div className="simpleCard__info-left">
                    <h6 className="simpleCard__info-left-title">{nft?.name}</h6>
                    <p className="simpleCard__info-left-price" style={{ color: theme === "light" ? "#0088cc" : "#fff" }}>
                        <img src={`./img/card/diamond-${diamond}.png`} alt="Price" />
                        {nft?.price}
                    </p>
                </div>
                <div className="simpleCard__info-right">
                    <div class="simpleCard__info-right-user">
                        <img className="simpleCard__info-right-user-avatar" src={avatarHash ? `https://nft-one.art/api/files/thumb/?hash=${avatarHash}` : "./img/sections/myNFT/avatar.svg"} alt="Avatar" />
                        <p className="simpleCard__info-right-user-name">by {nft.creator.name}</p>
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
