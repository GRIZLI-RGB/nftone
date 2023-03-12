import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import "./DefaultCard.scss";

function DefaultCard({nft, currentUser}) {
    const [diamond, setDiamond] = useState("dark");
    const { theme, changeTheme } = useContext(ContextApp);

    const [likes, setLikes] = useState([0, 0, 0, 0, 0, 0, 0]);

    // set likes on start card
    useEffect(() => {
        if(nft.likes.length > 0) {
            let likes_copy = [0, 0, 0, 0, 0, 0, 0];
            nft.likes.map(like => likes_copy[Number(like.type_id) - 1] += 1);
            setLikes(likes_copy);
        }
    }, [nft.likes]);

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
            className={`${theme === "light" ? "cardDefault" : "cardDefault cardDefault-dark"}`}
            onMouseOver={() => setDiamond("light")}
            onMouseOut={() => setDiamond("dark")}
            style={{ background: theme === "light" ? "#fff" : "#2B3239", color: theme === "light" ? "#000" : "#fff" }}>
            <div className="cardDefault__photo" style={{background: `${`url(https://nft-one.art/api/files/thumb/?hash=${nft?.img?.hash}) no-repeat center center/cover`}`}} alt="Card"></div>
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
                        <img className="cardDefault__info-right-user-avatar" src={`https://nft-one.art/api/files/thumb/?hash=${nft.creator.img.hash}`} alt="Avatar" />
                        <p className="cardDefault__info-right-user-name">by {nft?.creator.name}</p>
                    </div>
                    <button class="cardDefault__info-right-auction">{nft?.state}</button>
                    <ul className="cardDefault__info-right-emoji">
                            {
                                likes.every(el => el === 0) ? (
                                    <li className={"cardDefault__info-right-emoji-item-" + theme} style={{opacity: "0"}}>
                                        😡<span>0</span>
                                    </li>
                                ) : (
                                    ["❤️", "🤣", "😍", "😡", "🙀", "🥴", "🤑"].map((emoji, index) =>
                                    <li className={"cardDefault__info-right-emoji-item-" + theme} key={index} style={{display: `${likes[index] === 0 ? "none" : ""}`}}>
                                        {emoji}<span>{likes[index]}</span>
                                    </li>
                                    )
                                )
                            }
                        <li className={"cardDefault__info-right-emoji-itemCount"}>
                            +3
                        </li>
                    </ul>
                </div>
            </div>
            <ul className="cardDefault__menuEmoji" style={{backgroundColor: changeTheme("#fff", "#2B3239")}}>
                {
                    ["❤️", "🤣", "😍", "😡", "🙀", "🥴", "🤑"].map((item, index) => <li data-emoji={index + 1} className="cardDefault__menuEmoji-item" onClick={(e) => handleUserLike(e)}>{item}</li>)
                }
            </ul>
            <ul class="cardDefault__emoji">
                    {
                                likes.every(el => el === 0) ? (
                                    <li className={"cardDefault__emoji-item-" + theme} style={{opacity: "0"}}>
                                        😡<span>0</span>
                                    </li>
                                ) : (
                                    ["❤️", "🤣", "😍", "😡", "🙀", "🥴", "🤑"].map((emoji, index) =>
                                    <li className={"cardDefault__emoji-item-" + theme} key={index} style={{display: `${likes[index] === 0 ? "none" : ""}`}}>
                                        {emoji}<span>{likes[index]}</span>
                                    </li>
                                    )
                                )
                            }
            </ul>
        </div>
    );
}

export default DefaultCard;