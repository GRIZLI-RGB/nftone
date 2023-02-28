import "./MyNFT.scss";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Filters from "./../../components/Filters";
import SimpleCard from "./../../components/SimpleCard";
import CollectionCard from "./../../components/CollectionCard";
import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../Context";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function MyNFT() {
    const {
        theme,
        changeTheme,
        filterStatus,
        filterQuantity,
        filterPriceAt,
        filterPriceTo,
        filterRarity,
        filterCategory,
        filterEmotional,
    } = useContext(ContextApp);
    const [windowView, setWindowView] = useState("nft");
    const [sortView, setSortView] = useState("not-sale");
    const [pricePopup, setPricePopup] = useState(false);
    const [priceCurrent, setPriceCurrent] = useState("Low to High");
    const [NFTs, setNFTs] = useState([]);
    const [collections, setCollections] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortingPopup, setSortingPopup] = useState(false);
    const [filtersMobile, setFiltersMobile] = useState(false);

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [bannerHash, setBannerHash] = useState(null);
    const [bannerActive, setBannerActive] = useState(false);
    const [avatarHash, setAvatarHash] = useState(null);
    const [avatarActive, setAvatarActive] = useState(false);
    const [avatarHover, setAvatarHover] = useState(false);

    useEffect(() => {
        let currentTab = window.location.href.split("#")[1];
        setWindowView(currentTab ? currentTab : "nft");
    }, []);

    useEffect(() => {
        fetch("/nfts.json")
            .then(res => {
                return res.json();
            })
            .then(json => {
                setNFTs(json);
            });
        fetch("/collections.json")
            .then(res => {
                return res.json();
            })
            .then(json => {
                setCollections(json);
            });
    }, []);

    function OneOrMinusOne(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    }

    function CompareSmiles(elem) {
        let score = 0;
        filterEmotional?.forEach(emot => {
            if (emot === "Red Heart") {
                score += elem.emotions[0];
            }
            if (emot === "Rolling on the Floor Laughing") {
                score += elem.emotions[1];
            }
            if (emot === "Smiling Face with Heart-Eyes") {
                score += elem.emotions[2];
            }
            if (emot === "Enraged Face") {
                score += elem.emotions[3];
            }
            if (emot === "Weary Cat") {
                score += elem.emotions[4];
            }
            if (emot === "Woozy Face") {
                score += elem.emotions[5];
            }
            if (emot === "Money-Mouth Face") {
                score += elem.emotions[6];
            }
        });
        return score;
    }

    const { acceptedFiles, getRootProps } = useDropzone();

    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/users/list",
                {
                    subqueries: {
                        hdr: {}
                    },
                },
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                setUsers(response.data.items)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        if(users.length > 0) {
            users.map(user => (user.ton_addr === localStorage.getItem("tonhubUsername") || user.ton_addr === localStorage.getItem("tonkeeperUsername")) ? setUsername(user.name) : null)
            users.map(user => (user.ton_addr === localStorage.getItem("tonhubUsername") || user.ton_addr === localStorage.getItem("tonkeeperUsername")) ? setBannerHash(user.hdr?.hash) : null)
        }
    }, [users])

    useEffect(() => {
        if(acceptedFiles.length > 0) {
            if(bannerActive) {
                let currentUserID = null;
                users.map(user => (user.ton_addr === localStorage.getItem("tonhubUsername") || user.ton_addr === localStorage.getItem("tonkeeperUsername")) ? currentUserID = user.id : null);
                const formData = new FormData();
                formData.append("json_data", JSON.stringify({
                    items: [
                        {
                            id: Number(currentUserID),
                            hdr: "hdr"
                        }
                    ]
                }));
                formData.append("hdr", acceptedFiles[0]);
                axios
                    .post(
                        "https://nft-one.art/api/users/upsert",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Token: localStorage.getItem("tonkeeperToken") ? localStorage.getItem("tonkeeperToken") : localStorage.getItem("tonhubToken")
                            },
                            auth: {
                                username: "odmen",
                                password: "NFTflsy",
                            },
                        },
                    )
                    .then(response => {
                    axios
                        .post(
                            "https://nft-one.art/api/users/list",
                            { 
                                subqueries: {
                                    hdr: {}
                                },
                            },
                            {
                                auth: {
                                    username: "odmen",
                                    password: "NFTflsy",
                                },
                            },
                        )
                        .then(response => {
                            response.data.items.map(item => Number(item.id) === Number(currentUserID) ? setBannerHash(item.hdr.hash) : null)
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                setBannerActive(false);
            }
            if(avatarActive) {}
        }
    }, [acceptedFiles])

    return (
        <>
            <Header />
            <section className={`myBanner ${changeTheme("", "myBanner--dark")} ${bannerHash ? "myBanner--hovme" : null} dropzone`} {...getRootProps()}
            style={{background: `${bannerHash ? `url(https://nft-one.art/api/files/thumb/?hash=${bannerHash}) no-repeat center center/cover` : "linear-gradient(105.78deg, #2442ad 0%, #2240e0 35.44%, #1fbdeb 67.05%, #f39475 99.49%)"}`}}
            
            >
            <div className="myBanner__download" style={{opacity: `${bannerHash ? "0" : "1"}`}}>
                    <img src={`./img/sections/myNFT/download-${theme}.svg`} alt="" class="myBanner__download-img" />
                    <p class="myBanner__download-title">Add banner</p>
                    <p class="myBanner__download-text">Optimal dimensions: 2500×650</p>
                </div>
            </section>
            <section className={`myContent ${changeTheme("", "myContent--dark")}`}>
                <div class="myContent__left">
                    <div className="myContent__left-user">
                        <div className="myContent__left-user-box dropzone" {...getRootProps()} onMouseOver={() => setAvatarHover(true)} onMouseOut={() => setAvatarHover(false)}>
                            <img className="myContent__left-user-avatar" src={avatarHash ? `https://nft-one.art/api/files/thumb/?hash=${avatarHash}` : "./img/sections/myNFT/avatar.svg"} alt=""/>
                            <div className="myContent__left-user-avatar--extra" style={{opacity: `${avatarHover ? "1" : "0"}`}}>+</div>
                        </div>
                        <h6 className="myContent__left-user-name">{ username.length > 12 ? username.slice(0, 12) + '...' : username }</h6>
                        <div className="myContent__left-user-social">
                            <a href="#">
                                <img src="./img/sections/myNFT/vk.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/telegram.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/twitter.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/reddit.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/discord.svg" alt="" />
                            </a>
                        </div>
                        <p className="myContent__left-user-text">
                            Let people find out more about you.
                            <br />
                            <br />
                            Fill out your personal information: nickname, description and social media. Add a new
                            banner.
                        </p>
                        <button className="myContent__left-user-edit">Edit profile</button>
                    </div>
                    {(windowView === "collection" && window.innerWidth > 768) && (
                        <>
                            <div class="myContent__left-owner">
                                <h6 class="myContent__left-owner-title">Owner</h6>
                                <div class="myContent__left-owner-left">
                                    <img
                                        class="myContent__left-owner-left-avatar"
                                        src="./img/sections/NFT/user.svg"
                                        alt=""
                                    />
                                    <p class="myContent__left-owner-left-name">John Doe</p>
                                </div>
                                <img
                                    class="myContent__left-owner-arrow"
                                    src={`./img/sections/collection/arrow-right-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                            <div class="myContent__left-other">
                                <h6 className="myContent__left-other-title">Other</h6>
                                <div class="myContent__left-other-box">
                                    <p class="myContent__left-other-box-title">Contract Address</p>
                                    <p class="myContent__left-other-box-text">EQB0PAgMahaikkK...</p>
                                    <img
                                        class="myContent__left-other-box-img"
                                        src={`./img/sections/nft/arrow-extra-${theme}.svg`}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {
                    window.innerWidth <= 768 ? filtersMobile && <Filters example={windowView === "nft" || windowView === "favorite" ? "nft" : "collection"}/> : <Filters example={windowView === "nft" || windowView === "favorite" ? "nft" : "collection"}/>
                }
                </div>
                <div class="myContent__right">
                    <div className="myContent__right-window">
                        <button
                            className={`myContent__right-window-btn ${
                                windowView === "nft" ? "myContent__right-window-btn--active" : ""
                            }`}
                            onClick={() => setWindowView("nft")}>
                            My NFTs
                        </button>
                        <button
                            className={`myContent__right-window-btn ${
                                windowView === "collection" ? "myContent__right-window-btn--active" : ""
                            }`}
                            onClick={() => setWindowView("collection")}>
                            My collections
                        </button>
                        <button
                            className={`myContent__right-window-btn ${
                                windowView === "favorite" ? "myContent__right-window-btn--active" : ""
                            }`}
                            onClick={() => setWindowView("favorite")}>
                            Favorites
                        </button>
                    </div>
                    <div className="myContent__right-settings">
                        <div className="myContent__right-settings-search">
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search"
                                className="myContent__right-settings-search-input"
                                type="text"
                            />
                            <img
                                className="myContent__right-settings-search-img"
                                alt=""
                                src={`./img/sections/collection/search-${theme}.svg`}
                            />
                        </div>
                        <div className="myContent__right-settings-box">
                            <button
                                className="myContent__right-settings-box-price"
                                onClick={() => setPricePopup(!pricePopup)}>
                                Price: {priceCurrent}
                                <img
                                    src={`./img/sections/collection/arrow-up-${theme}.svg`}
                                    alt=""
                                    style={{ transform: pricePopup ? "rotate(-180deg)" : "rotate(0deg)" }}
                                />
                                {pricePopup && (
                                    <ul className="catalog__container-content-options-sorting-popup">
                                        <li
                                            className="catalog__container-content-options-sorting-popup-item"
                                            onClick={e => setPriceCurrent(e.target.innerText)}>
                                            Low to High
                                        </li>
                                        <li
                                            className="catalog__container-content-options-sorting-popup-item"
                                            onClick={e => setPriceCurrent(e.target.innerText)}>
                                            High to Low
                                        </li>
                                    </ul>
                                )}
                            </button>
                            {windowView !== "favorite" && (
                                <button className="myContent__right-settings-box-add">
                                    {windowView === "nft" ? "Add nft" : "Add collection"}
                                </button>
                            )}
                        </div>
                        <div class="myContent__right-settings-boxMobile">
                            <button className="myContent__right-settings-boxMobile-filters" onClick={() => setFiltersMobile(!filtersMobile)}>
                                Filters
                                
                                <img src={`./img/sections/collection/filters-${theme}.svg`} alt="" />
                            </button>
                            <button className="myContent__right-settings-boxMobile-sort"  onClick={() => setSortingPopup(!sortingPopup)}>
                                Sort
                                <img src={`./img/sections/collection/arrow-up-${theme}.svg`} alt="" />
                                {sortingPopup && (
                                        <ul className="collection__main-cards-options-filters-sort-popup">
                                            <li className="collection__main-cards-options-filters-sort-popup-item" onClick={(e) => setPriceCurrent(e.target.innerText)}>
                                                Low to High
                                            </li>
                                            <li className="collection__main-cards-options-filters-sort-popup-item" onClick={(e) => setPriceCurrent(e.target.innerText)}>
                                                High to Low
                                            </li>
                                        </ul>
                                    )}
                            </button>
                        </div>
                    </div>
                    {windowView === "nft" && (
                        <div className="myContent__right-sort">
                            <button
                                className={`myContent__right-sort-btn ${
                                    sortView === "not-sale" ? "myContent__right-sort-btn--active" : ""
                                }`}
                                onClick={() => setSortView("not-sale")}>
                                Not for sale
                            </button>
                            <button
                                className={`myContent__right-sort-btn ${
                                    sortView === "now" ? "myContent__right-sort-btn--active" : ""
                                }`}
                                onClick={() => setSortView("now")}>
                                Buy now
                            </button>
                            <button
                                className={`myContent__right-sort-btn ${
                                    sortView === "auction" ? "myContent__right-sort-btn--active" : ""
                                }`}
                                onClick={() => setSortView("auction")}>
                                On auction
                            </button>
                        </div>
                    )}
                    <div className="myContent__right-items">
                        {windowView === "nft" ? (
                            <>
                                {NFTs.filter(nft =>
                                    filterStatus === "all"
                                        ? nft
                                        : filterStatus === "Buy now"
                                        ? nft.status === "Buy now"
                                        : nft.status === "In auction",
                                )
                                    .filter(nft =>
                                        filterQuantity === "all"
                                            ? nft
                                            : filterQuantity === "single"
                                            ? nft.quantity === "single"
                                            : nft.quantity === "bundles",
                                    )
                                    .filter(nft => (filterPriceAt !== "" ? nft.price >= filterPriceAt : nft))
                                    .filter(nft => (filterPriceTo !== "" ? nft.price <= filterPriceTo : nft))
                                    .filter(nft =>
                                        filterRarity.length === 0 ? nft : filterRarity.includes(nft.rarity),
                                    )
                                    .filter(nft =>
                                        filterCategory.length === 0 ? nft : filterCategory.includes(nft.category),
                                    )
                                    .filter(nft =>
                                        sortView === "not-sale"
                                            ? nft.collectionDo === "Not for sale"
                                            : sortView === "now"
                                            ? nft.collectionDo === "Buy now"
                                            : nft.collectionDo === "On auction",
                                    )
                                    .filter(nft =>
                                        searchQuery !== ""
                                            ? nft.name.toLowerCase().includes(searchQuery.toLowerCase())
                                            : nft,
                                    )
                                    .sort((a, b) =>
                                        priceCurrent === "Low to High" ? a.price - b.price : b.price - a.price,
                                    )
                                    .sort((a, b) => OneOrMinusOne(CompareSmiles(b), CompareSmiles(a)))
                                    .map(nft => (
                                        <SimpleCard nft={nft} />
                                    ))}
                            </>
                        ) : windowView === "collection" ? (
                            <>
                                {collections
                                    .filter(nft =>
                                        searchQuery !== ""
                                            ? nft.name.toLowerCase().includes(searchQuery.toLowerCase())
                                            : nft,
                                    )
                                    .filter(nft =>
                                        filterCategory.length === 0 ? nft : filterCategory.includes(nft.category),
                                    )
                                    .sort((a, b) =>
                                        priceCurrent === "Low to High" ? a.price - b.price : b.price - a.price,
                                    )
                                    .sort((a, b) => OneOrMinusOne(CompareSmiles(b), CompareSmiles(a)))
                                    .map(collection => (
                                        <CollectionCard collection={collection} />
                                    ))}
                            </>
                        ) : (
                            <>
                                {NFTs.filter(nft =>
                                    filterStatus === "all"
                                        ? nft
                                        : filterStatus === "Buy now"
                                        ? nft.status === "Buy now"
                                        : nft.status === "In auction",
                                )
                                    .filter(nft =>
                                        filterQuantity === "all"
                                            ? nft
                                            : filterQuantity === "single"
                                            ? nft.quantity === "single"
                                            : nft.quantity === "bundles",
                                    )
                                    .filter(nft => (filterPriceAt !== "" ? nft.price >= filterPriceAt : nft))
                                    .filter(nft => (filterPriceTo !== "" ? nft.price <= filterPriceTo : nft))
                                    .filter(nft =>
                                        filterRarity.length === 0 ? nft : filterRarity.includes(nft.rarity),
                                    )
                                    .filter(nft =>
                                        filterCategory.length === 0 ? nft : filterCategory.includes(nft.category),
                                    )
                                    .filter(nft =>
                                        sortView === "not-sale"
                                            ? nft.collectionDo === "Not for sale"
                                            : sortView === "now"
                                            ? nft.collectionDo === "Buy now"
                                            : nft.collectionDo === "On auction",
                                    )
                                    .filter(nft =>
                                        searchQuery !== ""
                                            ? nft.name.toLowerCase().includes(searchQuery.toLowerCase())
                                            : nft,
                                    )
                                    .sort((a, b) =>
                                        priceCurrent === "Low to High" ? a.price - b.price : b.price - a.price,
                                    )
                                    .sort((a, b) => OneOrMinusOne(CompareSmiles(b), CompareSmiles(a)))
                                    .map(nft => (
                                        <SimpleCard nft={nft} />
                                    ))}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default MyNFT;
