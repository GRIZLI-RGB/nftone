import { useContext, useEffect, useState } from "react";
import "./Card.scss";
import { ContextApp } from "../../Context";
import axios from "axios";

function Card({nft, currentUser}) {
    const [diamond, setDiamond] = useState("dark");
    const { theme, changeTheme } = useContext(ContextApp);

    const [likes, setLikes] = useState([0, 0, 0, 0, 0, 0, 0]);

    // set likes on start card
    useEffect(() => {
        if(nft.likes.length > 0) {
            let likes_copy = [...likes];
            nft.likes.map(like => likes_copy[Number(like.type_id) - 1] += 1);
            setLikes(likes_copy);
        }
    }, []);

    const handleUserLike = (e) => {
        let hasUserLike = false;
        if(localStorage.getItem("auth").toString() === "true") {
            axios
            .post(
                "https://nft-one.art/api/nft_likes/list",
                {
                    filters: {
                        nft_id: nft.id,
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
                                nft_id: nft.id,
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
                                    nft_id: nft.id,
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
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    
    return (
        <div
            className={changeTheme("card", "card card--dark")}
            onMouseOver={() => setDiamond('light')}
            onMouseOut={() => setDiamond('dark')}>
            <div className="card__photo" style={{background: `${`url(https://nft-one.art/api/files/thumb/?hash=${nft.img.hash}) no-repeat center center/cover`}`}}></div>
            <div className="card__info">
                <div className="card__info-left">
                    <h6 className="card__info-left-title">{nft.name}</h6>
                    <p className="card__info-left-price">
                        <img src={`./img/card/diamond-${diamond}.png`} alt="Price" />
                        {nft.price}
                    </p>
                </div>
                <div className="card__info-right">
                    <div class="card__info-right-user">
                        <img className="card__info-right-user-avatar" src={`https://nft-one.art/api/files/thumb/?hash=${nft.creator.img.hash}`} alt="Avatar" />
                        <p className="card__info-right-user-name">by {nft.creator.name}</p>
                    </div>
                    <ul className="card__info-right-emoji">
                        {
                            likes.every(el => el === 0) ? (
                                <li className={"card__info-right-emoji-item-" + theme} style={{opacity: "0"}}>
                                    😡<span>0</span>
                                </li>
                            ) : (
                                ["❤️", "🤣", "😍", "😡", "🙀", "🥴", "🤑"].map((emoji, index) =>
                                <li className={"card__info-right-emoji-item-" + theme} key={index} style={{display: `${likes[index] === 0 ? "none" : ""}`}}>
                                    {emoji}<span>{likes[index]}</span>
                                </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
            <ul className="card__menuEmoji">
                {
                    ["❤️", "🤣", "😍", "😡", "🙀", "🥴", "🤑"].map((item, index) => <li data-emoji={index + 1} className="card__menuEmoji-item" onClick={(e) => handleUserLike(e)}>{item}</li>)
                }
            </ul>
        </div>
    );
}

export default Card;
