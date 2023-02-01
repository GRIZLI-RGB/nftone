import { useContext } from "react";
import { ContextApp } from "../../Context";
import "./CollectionCard.scss";

function CollectionCard() {
    const { theme,changeTheme } = useContext(ContextApp);
    return (
        <div className="collectionCard">
            <img className="collectionCard__img" src="./img/sections/catalog/collection-card-photo.svg" alt="" />
            <div class="collectionCard__tag">
                <div className="collectionCard__tag-bg"></div>
                <p className="collectionCard__tag-text">Collection</p>
            </div>
            <ul class="collectionCard__emoji">
                <li className={"collectionCard__emoji-item-" + theme}>
                    ❤️<span>250</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🤣<span>25</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    😍<span>250</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    😡<span>25</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🙀<span>25</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🥴<span>25</span>
                </li>
                <li className={"collectionCard__emoji-item-" + theme}>
                    🤑<span>25</span>
                </li>
            </ul>
            <div class="collectionCard__info">
                <div class="collectionCard__info-bg"></div>
                <p className="collectionCard__info-text">Bid on Fragment's NFTs</p>
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
