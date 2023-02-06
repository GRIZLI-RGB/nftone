import { useContext } from "react";
import { ContextApp } from "../../Context";
import "./CollectionCard.scss";

function CollectionCard({collection}) {
    const { theme,changeTheme } = useContext(ContextApp);
    return (
        <div className="collectionCard">
            <img className="collectionCard__img" src={`./img/sections/catalog/photo-${collection?.img}.svg`} alt="" />
            <div class="collectionCard__tag">
                <div className="collectionCard__tag-bg"></div>
                <p className="collectionCard__tag-text">{collection?.tag}</p>
            </div>
            <ul class="collectionCard__emoji">
                <li className={"collectionCard__emoji-item-" + theme}>
                    ❤️<span>{collection?.emotions[0]}</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🤣<span>{collection?.emotions[1]}</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    😍<span>{collection?.emotions[2]}</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    😡<span>{collection?.emotions[3]}</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🙀<span>{collection?.emotions[4]}</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🥴<span>{collection?.emotions[5]}</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🤑<span>{collection?.emotions[6]}</span>
                </li>
            </ul>
            <div class="collectionCard__info">
                <div class="collectionCard__info-bg"></div>
                <p className="collectionCard__info-text">{collection?.name}</p>
            </div>
            <ul className="collectionCard__menuEmoji"
                style={{backgroundColor: changeTheme("#fff", "#2B3239")}}
            >
                <li className="collectionCard__menuEmoji-item">❤️</li>
                <li className="collectionCard__menuEmoji-item">🤣</li>
                <li className="collectionCard__menuEmoji-item">😍</li>
                <li className="collectionCard__menuEmoji-item">😡</li>
                <li className="collectionCard__menuEmoji-item">🙀</li>
                <li className="collectionCard__menuEmoji-item">🥴</li>
                <li className="collectionCard__menuEmoji-item">🤑</li>
            </ul>
        </div>
    );
}

export default CollectionCard;
