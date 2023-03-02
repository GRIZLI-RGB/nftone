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
import { toast, Toaster } from "react-hot-toast";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip'

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

    const [currentUser, setCurrentUser] = useState({});
    const [username, setUsername] = useState("");
    const [info, setInfo] = useState("");
    const [socialLinks, setSocialLinks] = useState(
        {
            vk: "",
            telegram: "",
            twitter: "",
            reddit: "",
            discord: ""
        }
    );
    const [email, setEmail] = useState("");

    const [windowView, setWindowView] = useState("nft");
    const [sortView, setSortView] = useState("not-sale");
    const [pricePopup, setPricePopup] = useState(false);
    const [priceCurrent, setPriceCurrent] = useState("Low to High");
    const [NFTs, setNFTs] = useState([]);
    const [collections, setCollections] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortingPopup, setSortingPopup] = useState(false);
    const [filtersMobile, setFiltersMobile] = useState(false);

    const [bannerHash, setBannerHash] = useState(null);
    const [bannerHover, setBannerHover] = useState(false);
    const [avatarHash, setAvatarHash] = useState(null);
    const [avatarHover, setAvatarHover] = useState(false);

    const [editProfile, setEditProfile] = useState(false);

    const [nameForm, setNameForm] = useState("");
    const [infoForm, setInfoForm] = useState("");
    const [socialForm, setSocialForm] = useState(
        {
            vk: "",
            telegram: "",
            twitter: "",
            reddit: "",
            discord: ""
        }
    );
    const [emailForm, setEmailForm] = useState("");

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

    const { acceptedFiles:acceptedFilesFromBanner, getRootProps:getRootPropsFromBanner, getInputProps:getInputPropsFromBanner } = useDropzone();
    const { acceptedFiles:acceptedFilesFromAvatar, getRootProps:getRootPropsFromAvatar, getInputProps:getInputPropsFromAvatar } = useDropzone();

    const setSocialFormChange = (e) => {
        let socialForm_copy = {...socialForm};
        let currentSocial = e.target.getAttribute("data-social");
        socialForm_copy[currentSocial] = e.target.value;
        setSocialForm(socialForm_copy);
    }

    const saveForm = () => {

        const validationForm = () => {
            return true;
        }

        const clearForm = () => {
            setNameForm("");
            setInfoForm("");
            setSocialForm({
                vk: "",
                telegram: "",
                twitter: "",
                reddit: "",
                discord: ""
            });
            setEmailForm("");
        }

        if(validationForm()) {
            axios
                .post(
                    "https://nft-one.art/api/users/upsert",
                    {
                        items: [
                            {
                                id: currentUser.id,
                                name: nameForm === "" ? currentUser.name : nameForm,
                                info: infoForm === "" ? currentUser.info : infoForm,
                                email: emailForm,
                                social_links: socialForm
                            }
                        ],
                        subqueries: {
                            img: {},
                            hdr: {},
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
                    setCurrentUser(response.data.items[0])
                    console.log(response.data.items[0])
                })
                .catch(error => {
                    console.log(error);
                });

            clearForm();

            toast.success(`Data changed`, {
                position: "bottom-right",
                style: {
                    font: "400 21px/100% 'DM Sans'",
                },
            });
        } else {
            toast.error(`Recheck the data`, {
                            position: "bottom-right",
                            style: {
                                font: "400 21px/100% 'DM Sans'",
                            },
                        });
        }
    }

    useEffect(() => {
        let currentTab = window.location.href.split("#")[1];
        setWindowView(currentTab ? currentTab : "nft");
    }, []);

    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/nfts/list",
                {
                    subqueries: {
                        img: {},
                        creator: {}
                    }
                },
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                setNFTs(response.data.items);
            })
            .catch(error => {
                console.log("Ошибка при получении Popular NFTs:", error);
            });
    }, [])

    // Получаем объект текущего пользователя
    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/auth/current",
                {
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
                setCurrentUser(response.data.user)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    // Real-time отображение аватарки и баннера
    useEffect(() => {
        if(acceptedFilesFromBanner.length > 0) {
                const formData = new FormData();
                formData.append("json_data", JSON.stringify({
                    items: [
                        {
                            id: currentUser.id,
                            hdr: "hdr"
                        }
                    ]
                }));
                formData.append("hdr", acceptedFilesFromBanner[0]);
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
                            "https://nft-one.art/api/auth/current",
                            { 
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
                            setBannerHash(response.data.user.hdr.hash);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
        }
        if(acceptedFilesFromAvatar.length > 0) {
                const formData = new FormData();
                formData.append("json_data", JSON.stringify({
                    items: [
                        {
                            id: currentUser.id,
                            img: "avatar"
                        }
                    ]
                }));
                formData.append("avatar", acceptedFilesFromAvatar[0]);
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
                            "https://nft-one.art/api/auth/current",
                            { 
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
                            setAvatarHash(response.data.user.img.hash)
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
        }
    }, [acceptedFilesFromBanner, acceptedFilesFromAvatar])

    // Когда объект пользователя загружен, мы устанавливаем все стейты с данными
    useEffect(() => {
        if(JSON.stringify(currentUser) !== "{}") {
            setUsername(currentUser.name);
            setInfo(currentUser.info);
            setSocialLinks(currentUser.social_links);
            setEmail(currentUser.email);
            setAvatarHash(currentUser.img.hash);
            setBannerHash(currentUser.hdr.hash)
        }
    }, [currentUser])

    return (
        <>
            <Header />
            <section className={`myBanner ${changeTheme("", "myBanner--dark")} ${bannerHash ? "myBanner--hovme" : null} dropzone`} {...getRootPropsFromBanner()}
            style={{background: `${bannerHash ? `url(https://nft-one.art/api/files/thumb/?hash=${bannerHash}) no-repeat center center/cover` : "linear-gradient(105.78deg, #2442ad 0%, #2240e0 35.44%, #1fbdeb 67.05%, #f39475 99.49%)"}`}}
            onMouseOver={() => setBannerHover(true)} onMouseOut={() => setBannerHover(false)}>
                <div className="myBanner__download" style={{opacity: `${bannerHash ? "0" : "1"}`}}>
                        <img src={`./img/sections/myNFT/download-${theme}.svg`} alt="" class="myBanner__download-img" />
                        <p class="myBanner__download-title">Add banner</p>
                        <p class="myBanner__download-text">Optimal dimensions: 2500×650</p>
                </div>
                <div className="myBanner--extra" style={{opacity: `${bannerHover && bannerHash ? "1" : "0"}`}}>+</div>
                {/* <input className="myBanner--mobileLoad" {...getInputPropsFromBanner} type="file" onClick={e => e.stopPropagation()}/> */}
            </section>
            <section className={`myContent ${changeTheme("", "myContent--dark")}`}>
                <div class="myContent__left">
                    <div className="myContent__left-user">
                        <div className="myContent__left-user-box dropzone" {...getRootPropsFromAvatar()} onMouseOver={() => setAvatarHover(true)} onMouseOut={() => setAvatarHover(false)}>
                            <img className="myContent__left-user-avatar" src={avatarHash ? `https://nft-one.art/api/files/thumb/?hash=${avatarHash}` : "./img/sections/myNFT/avatar.svg"} alt=""/>
                            <div className="myContent__left-user-avatar--extra" style={{opacity: `${avatarHover ? "1" : "0"}`}}>+</div>
                            {/* <input className="myContent--mobileLoad" {...getInputPropsFromAvatar} type="file" onClick={e => e.stopPropagation()}/> */}
                        </div>
                        <h6 className="myContent__left-user-name">{ username.length > 18 ? username.slice(0, 18) + '...' : username }</h6>
                                {
                                    (JSON.stringify(socialLinks) !== "{}" && JSON.stringify(socialLinks) !== '{"vk":"","reddit":"","discord":"","twitter":"","telegram":""}') && (
                                        <div className="myContent__left-user-social">
                                            {
                                                Object.keys(socialLinks).map(key => {
                                                    const currentLink = (key === "vk" ? "vk.com/" :
                                                                        key === "telegram" ? "t.me/" :
                                                                        key === "reddit" ? "reddit.com/" :
                                                                        key === "twitter" ? "twitter.com/" :
                                                                        key === "discord" ? "discord.gg/" : null);
                                                    if(socialLinks[key] !== "") {
                                                        return <a href={"https://" + currentLink + socialLinks[key]} target="_blank" rel="noreferrer"><img src={`./img/sections/myNFT/${key}.svg`} alt=""/></a>
                                                    }
                                                })
                                            }
                                        </div>
                                )
                                }
                        <p className="myContent__left-user-text">
                            {
                                info === "" ? (
                                    <>
                                        Let people find out more about you.
                                        <br />
                                        <br />
                                        Fill out your personal information: nickname, description and social media. Add a new
                                        banner.
                                    </>
                                ) : (
                                    info
                                )
                            }
                        </p>
                        <button className="myContent__left-user-edit" onClick={() => setEditProfile(!editProfile)}>Edit profile</button>
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
                                <a className="myContent__right-settings-box-add" href={windowView === "nft" ? "/create-nft" : "create-collection"}>
                                    {windowView === "nft" ? "Add nft" : "Add collection"}
                                </a>
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
                                {/*
                                .filter(nft =>
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
                                    .sort((a, b) => OneOrMinusOne(CompareSmiles(b), CompareSmiles(a)))
                                     */}
                                    {NFTs.length > 0 ? NFTs
                                    .filter(nft =>
                                        searchQuery !== ""
                                            ? nft.name.toLowerCase().includes(searchQuery.toLowerCase())
                                            : nft,
                                    )
                                    .filter(nft => (filterPriceAt !== "" ? Number(nft.price) >= filterPriceAt : nft))
                                    .filter(nft => (filterPriceTo !== "" ? Number(nft.price) <= filterPriceTo : nft))
                                    .sort((a, b) =>
                                        priceCurrent === "Low to High" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price),
                                    )
                                    .map(nft => <SimpleCard nft={nft} avatarHash={avatarHash}/>) : (
                                        <div className="myContent__right-items-zero">No items, <a href="/create-nft">go create your first NFT!</a></div>
                                    )}
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
            {
                editProfile && (
                    <div className={changeTheme("editProfile", "editProfile editProfile--dark")}>
                        <div className="editProfile__box" style={{background: changeTheme("#fff", "#1c2026"), color: changeTheme("", "#fff")}}>
                            <h1>Edit Profile</h1>
                            <div className="editProfile__box-name">
                                <label>
                                    Name
                                </label>
                                <div>
                                    <input value={nameForm} onChange={(e) => setNameForm(e.target.value)} type="text" placeholder="Enter your name"/>
                                </div>
                            </div>
                            <div className="editProfile__box-info">
                                <label>
                                    Info
                                </label>
                                <div>
                                    <textarea value={infoForm} onChange={(e) => setInfoForm(e.target.value)} placeholder="Tell people about yourself"></textarea>
                                </div>
                            </div>
                            <div className="editProfile__box-social">
                                <label>
                                    Social Links
                                </label>
                                <ul>
                                    <li>
                                        <input type="text" placeholder={socialLinks.vk ? socialLinks.vk : `account-id`} value={socialForm.vk}  data-social="vk" onChange={(e) => setSocialFormChange(e)}/>
                                    </li>
                                    <li>
                                        <input type="text" placeholder={socialLinks.telegram ? socialLinks.telegram : `nickname`} value={socialForm.telegram}  data-social="telegram" onChange={(e) => setSocialFormChange(e)}/>
                                    </li>
                                    <li>
                                        <input type="text" placeholder={socialLinks.twitter ? socialLinks.twitter : `nickname`} value={socialForm.twitter}  data-social="twitter" onChange={(e) => setSocialFormChange(e)}/>
                                    </li>
                                    <li>
                                        <input type="text" placeholder={socialLinks.reddit ? socialLinks.reddit : `nickname`} value={socialForm.reddit}  data-social="reddit" onChange={(e) => setSocialFormChange(e)}/>
                                    </li>
                                    <li>
                                        <input type="text" placeholder={socialLinks.discord ? socialLinks.discord : `server-id`} value={socialForm.discord}  data-social="discord" onChange={(e) => setSocialFormChange(e)}/>
                                    </li>
                                </ul>
                            </div>
                            <div className="editProfile__box-email">
                                <label>
                                    Email
                                </label>
                                <div>
                                    <input value={emailForm} onChange={e => setEmailForm(e.target.value)} type="email" placeholder={email !== "" ? email : (currentUser.unconfirmed_email !== "" && currentUser?.unconfirmed_email) ? currentUser.unconfirmed_email : "Enter email"}/>
                                    {
                                        (email !== "") ? (
                                            <img className="editProfile__box-email-confirmed" src="./img/adminPanel/yes.svg" alt=""
                                                data-tooltip-id="check-email"
                                                data-tooltip-content="Email confirmed"
                                                data-tooltip-place="bottom"
                                                data-tooltip-variant="success"
                                            />
                                            ) : (
                                            <img src="./img/editProfile/ex.svg" alt=""
                                                data-tooltip-id="check-email"
                                                data-tooltip-content="Сheck your email"
                                                data-tooltip-place="bottom"
                                            />
                                        )
                                    }
                                    <Tooltip id="check-email" style={{font: "400 12px/100% DM Sans"}}/>
                                </div>
                            </div>
                            <button className="editProfile__box-save" onClick={saveForm}>Save</button>
                            <img onClick={() => setEditProfile(false)} src={`./img/header/${theme === "light" ? "close" : "close-white"}.png`} alt=""/>
                        </div>
                        <Toaster />
                    </div>
                )
            }
            <Footer />
        </>
    );
}

export default MyNFT;
