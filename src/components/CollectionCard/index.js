import axios from "axios";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { ContextApp } from "../../Context";
import "./CollectionCard.scss";

function CollectionCard({collection, currentUser}) {
    const { theme,changeTheme } = useContext(ContextApp);

    const [likes, setLikes] = useState([0, 0, 0, 0, 0, 0, 0]);

    // set likes on start collection
    useEffect(() => {
        if(collection.likes.length > 0) {
            let likes_copy = [0, 0, 0, 0, 0, 0, 0];
            collection.likes.map(like => likes_copy[Number(like.type_id) - 1] += 1);
            setLikes(likes_copy);
        }
    }, [collection.likes]);

    const handleUserLike = (e) => {
        let hasUserLike = false;
        axios
            .post(
                "https://nft-one.art/api/nft_likes/list",
                {
                    filters: {
                        collection_id: collection.id,
                        user_id: currentUser.id,
                        type_id: e.target.getAttribute("data-emoji")
                    }
                },
                {
                    headers: {
                        Token: localStorage.getItem("tonkeeperToken") ? localStorage.getItem("tonkeeperToken") : localStorage.getItem("tonhubToken")
                    },
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                hasUserLike = (response.data.items.length > 0);
                if(hasUserLike) {
                    axios
                        .post(
                            "https://nft-one.art/api/nft_likes/unlike",
                            {
                                collection_id: collection.id,
                                type_id: e.target.getAttribute("data-emoji")
                            },
                            {
                                headers: {
                                    Token: localStorage.getItem("tonkeeperToken") ? localStorage.getItem("tonkeeperToken") : localStorage.getItem("tonhubToken")
                                },
                                auth: {
                                    username: "odmen",
                                    password: "NFTflsy",
                                },
                            },
                        )
                        .then(response => {
                            let likes_copy = [...likes];
                            likes_copy[Number(e.target.getAttribute("data-emoji")) - 1] -= 1;
                            setLikes([...likes_copy]);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    axios
                        .post(
                            "https://nft-one.art/api/nft_likes/upsert",
                            {
                                items: [{
                                    collection_id: collection.id,
                                    type_id: e.target.getAttribute("data-emoji"),
                                    user_id: currentUser.id
                                }]
                            },
                            {
                                headers: {
                                    Token: localStorage.getItem("tonkeeperToken") ? localStorage.getItem("tonkeeperToken") : localStorage.getItem("tonhubToken")
                                },
                                auth: {
                                    username: "odmen",
                                    password: "NFTflsy",
                                },
                            },
                        )
                        .then(response => {
                            let likes_copy = [...likes];
                            likes_copy[Number(e.target.getAttribute("data-emoji")) - 1] += 1;
                            setLikes([...likes_copy]);
                        })
                        .catch(error => {
                            console.log("Лайк не ставится:", error);
                            console.log(localStorage.getItem("tonkeeperToken"))
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="collectionCard" style={{background: `${`url(https://nft-one.art/api/files/thumb/?hash=${collection.img.hash}) no-repeat center center/cover`}`}}>
            <a href={`/collection/${collection.id}`}>
                <img className="collectionCard__img" src={`https://nft-one.art/api/files/thumb/?hash=${collection.img.hash}`} alt="" />
                <div class="collectionCard__tag">
                    <div className="collectionCard__tag-bg"></div>
                    <p className="collectionCard__tag-text">Collection</p>
                </div>
                <ul class="collectionCard__emoji">
                    {
                        ["❤️", "🤣", "😍", "😡", "🙀", "🥴", "🤑"].map((emoji, index) =>
                            <li className={"collectionCard__emoji-item-" + theme} key={index} style={{display: `${likes[index] === 0 ? "none" : ""}`}}>
                                {emoji}<span>{likes[index]}</span>
                            </li>
                        )
                    }
                </ul>
                <div class="collectionCard__info">
                    <div class="collectionCard__info-bg"></div>
                    <p className="collectionCard__info-text">{collection?.name}</p>
                </div>
            </a>
            <ul className="collectionCard__menuEmoji"
                style={{backgroundColor: changeTheme("#fff", "#2B3239")}}
            >
                {
                    ["❤️", "🤣", "😍", "😡", "🙀", "🥴", "🤑"].map((item, index) => <li data-emoji={index + 1} className="collectionCard__menuEmoji-item" onClick={(e) => handleUserLike(e)}>{item}</li>)
                }
            </ul>
        </div>
    );
}

export default CollectionCard;
