import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../Context";
import "./Header.scss";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

import TonConnect, { toUserFriendlyAddress } from "@tonconnect/sdk";

function Header({ currentPage }) {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [popup, setPopup] = useState(false);
    const [searchPopup, setSearchPopup] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [searchFilter, setSearchFilter] = useState("nft");
    const [NFTs, setNFTs] = useState([]);
    const [collections, setCollections] = useState([]);
    const [focus, setFocus] = useState(false);
    const { theme, setTheme, changeTheme, auth, setAuth } = useContext(ContextApp);

    const [tonkeeperToken, setTonkeeperToken] = useState("");
    const [tonkeeperQR, setTonkeeperQR] = useState(false);
    const [tonkeeperUniversalLink, setTonkeeperUniversalLink] = useState("");

    const [tonhubData, setTonhubData] = useState({});
    const [tonhubQR, setTonhubQR] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [avatarHash, setAvatarHash] = useState();

    // take currentUser and set avatar in header, if auth is true
    useEffect(() => {
        if(localStorage.getItem("auth").toString() === "true") {
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
                    setAvatarHash(response.data.user.img.hash)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    // ???????????????? ?????? ???????????? ???????????????? ???? ????, ?????????????????????? ???? ???????????????????????? (?????????????????????? ?????????????? ?????????????? ?? localStorage)
    useEffect(() => {
        if(localStorage.getItem("tonkeeperToken") || localStorage.getItem("tonhubToken")) {
            setAuth(true);
            localStorage.setItem("auth", true)
        } else {
            setAuth(false);
            localStorage.setItem("auth", false);
        }
    }, [])

    // ?????????? ???????????? ???????? ???? localStorage (?????????????? ?????? ????????????) ?? ?????????????? ???? auth
    useEffect(() => {
        setTheme(localStorage.getItem("theme") === null ? "light" : localStorage.getItem("theme"));
        setAuth(localStorage.getItem("auth"));
    }, []);

    const userExit = () => {
        setAuth(false);
        localStorage.setItem("auth", false);
        setUserMenu(false);
        localStorage.removeItem("tonkeeperUsername");
        localStorage.removeItem("tonkeeperToken");
        localStorage.removeItem("tonhubUsername");
        localStorage.removeItem("tonhubToken");
        localStorage.removeItem("ton-connect-storage_http-bridge-gateway");
        localStorage.removeItem("ton-connect-storage_bridge-connection");
    }

    const tonkeeperAuthClick = () => {
        axios
            .post(
                "https://nft-one.art/api/auth/start_tonkeeper",
                {},
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(function (response) {
                setTonkeeperToken(response.data.token);
                const connector = new TonConnect({ manifestUrl: 'https://grizli-rgb.github.io/meta-info-nftone/tonconnect-manifest.json' });
                connector.restoreConnection();
                setTonkeeperQR(true);
                const walletConnectionSource = {
                    universalLink: "https://app.tonkeeper.com/ton-connect",
                    bridgeUrl: "https://bridge.tonapi.io/bridge",
                };
                setTonkeeperUniversalLink(connector.connect(walletConnectionSource, { tonProof: response.data.token }));
                connector.onStatusChange(walletInfo => {
                    setPopup(false);
                    setTonkeeperQR(false);
                    setAuth(true);
                    localStorage.setItem("auth", true);
                    localStorage.setItem("tonkeeperToken", response.data.token);
                    localStorage.setItem("tonkeeperUsername", toUserFriendlyAddress(walletInfo.account.address));
                    axios
                        .post(
                            "https://nft-one.art/api/auth/check_tonkeeper",
                            {
                                ton_addr: walletInfo.account.address.toString(),
                                state_init: walletInfo.account.walletStateInit,
                                proof: walletInfo.connectItems.tonProof.proof
                            },
                            {
                                headers: {
                                    Token: response.data.token
                                },
                                auth: {
                                    username: "odmen",
                                    password: "NFTflsy",
                                },
                            },
                        )
                        .then(function (response) {
                            window.location.reload()
                        })
                        .catch(function (error) {
                            console.log("????????????: ", error);
                        });
                })
            })
            .catch(function (error) {
                console.log("???????????? ?????????????????? ???????????? ?? ??????????????: ", error);
            });
    };

    const tonhubAuthClick = () => {
        axios
            .post(
                "https://nft-one.art/api/auth/start_tonhub",
                {},
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(function (response) {
                setTonhubData(response.data);
                setTonhubQR(true);
                const checkTonhubAuth = setInterval(() => {
                    axios
                    .post(
                        "https://nft-one.art/api/auth/check_tonhub",
                        {},
                        {
                            headers: {
                                Token: response.data.token
                            },
                            auth: {
                                username: "odmen",
                                password: "NFTflsy",
                            },
                        },
                    )
                    .then(function (res) {
                        if(res.data.ok) {
                            localStorage.setItem("tonhubToken", response.data.token);
                            localStorage.setItem("tonhubUsername", res.data.user.name);
                            setPopup(false);
                            setTonhubQR(false);
                            setAuth(true);
                            localStorage.setItem("auth", true);
                            clearInterval(checkTonhubAuth);
                            window.location.reload()
                        }
                    })
                    .catch(function (error) {
                        console.log("????????????: ", error);
                    });
                }, 1200);
            })
            .catch(function (error) {
                console.log("???????????? ?????????????????? ???????????? ?? ??????????????: ", error);
            });
    };

    // auth/start_tonkeeper
    useEffect(() => {
        // axios
        //     .post(
        //         "https://nft-one.art/api/auth/start_tonkeeper",
        //         {},
        //         {
        //             auth: {
        //                 username: "odmen",
        //                 password: "NFTflsy",
        //             },
        //         },
        //     )
        //     .then(function (response) {
        //         setTonkeeperToken(response.data.token);
        //     })
        //     .catch(function (error) {
        //         console.log("???????????? ?????????????????? ???????????? ?? ??????????????: ", error);
        //     });
    }, []);

    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/batch",
                {
                    "nfts": {
                        "action": "nfts/list",
                        "subqueries": {
                            "img": {}
                        }
                    },
                    "collections": {
                        "action": "nft_collections/list",
                        "subqueries": {
                            "img": {}
                        }
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
                setNFTs(response.data.nfts.items);
                setCollections(response.data.collections.items);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    useEffect(() => {
        if (popup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            document.body.style.overflowX = "hidden";
        }
    }, [popup, setPopup]);

    return (
        <header className="header" style={{ backgroundColor: theme === "light" ? "#004f87" : "#1C2026" }}>
            {!openSearch && (
                <div className="header__logo">
                    <a href="/">
                        <img src="/img/header/header-logo.svg" alt="Logo" />
                    </a>
                </div>
            )}
            <nav className="header__menu">
                {["Marketplace", "Catalog", "FAQ"].map((item, index) => (
                    <a
                        key={index}
                        href={`/${item.toLowerCase()}`}
                        className={`header__menu-link ${theme === "light" ? "" : "header__menu-link--dark"} ${
                            currentPage === item.toLocaleLowerCase() ? "header__menu-link--active" : ""
                        }`}>
                        {item}
                    </a>
                ))}
            </nav>
            <div className="header__search">
                <input
                    onFocus={() => {
                        setFocus(true);
                        setSearchPopup(true);
                    }}
                    onBlur={() => setFocus(false)}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search"
                    style={{
                        backgroundColor: theme === "light" ? "#fff" : "#272E37",
                        borderColor: theme === "light" ? "#efefef" : "#373F4A",
                        color: changeTheme("", "#fff"),
                    }}
                />
                <img
                    src={`/img/header/${searchQuery !== "" ? "clear" : "search"}.svg`}
                    alt=""
                    onClick={() => setSearchQuery("")}
                />
                {searchQuery !== "" && (
                    <div className="header__search-popup">
                        <div className="header__search-popup-btns">
                            <button
                                onClick={() => {
                                    setSearchFilter("nft");
                                }}
                                className={`header__search-popup-btns-nfts ${
                                    searchFilter === "nft" ? "header__search-popup-btns-nfts--active" : ""
                                }`}>
                                NFTs
                            </button>
                            <button
                                onClick={() => setSearchFilter("collection")}
                                className={`header__search-popup-btns-collections ${
                                    searchFilter === "collection" ? "header__search-popup-btns-collections--active" : ""
                                }`}>
                                Collections
                            </button>
                        </div>
                        <ul className="header__search-popup-list">
                            {searchFilter === "nft"
                                ? NFTs.filter(
                                      nft =>
                                          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                          searchQuery !== "",
                                  ).map(nft => (
                                      <li className="header__search-popup-list-item">
                                          <a href={`/nft/${nft.id}`}>
                                            <div style={{background: `${`url(https://nft-one.art/api/files/thumb/?hash=${nft.img.hash}) no-repeat center center/cover`}`}}></div>
                                            <p>{nft?.name}</p>
                                          </a>
                                      </li>
                                  ))
                                : collections
                                      .filter(
                                          collection =>
                                              collection.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                              searchQuery !== "",
                                      )
                                      .map(collection => (
                                          <li className="header__search-popup-list-item">
                                            <a href={`/collection/${collection.id}`}>
                                                <div  style={{background: `${`url(https://nft-one.art/api/files/thumb/?hash=${collection.img.hash}) no-repeat center center/cover`}`}}></div>
                                                <p>{collection?.name}</p>
                                              </a>
                                          </li>
                                      ))}
                        </ul>
                        <a className="header__search-popup-all" href="/marketplace">
                            See all results
                        </a>
                    </div>
                )}
            </div>
            {!openSearch && (
                <div className="header__buttons">
                    {!auth || auth === "false" ? (
                        <button onClick={() => setPopup(true)} className="header__buttons-connect">
                            {window.innerWidth <= 1440 ? "Connect" : "Connect wallet"}
                        </button>
                    ) : (
                        <>
                            <button className="header__buttons-user" onClick={() => setUserMenu(!userMenu)}>
                                <img className="header__buttons-user-avatar" src={avatarHash ? `https://nft-one.art/api/files/thumb/?hash=${avatarHash}` : "/img/sections/myNFT/avatar.svg"} alt="" />
                                {
                                    localStorage.getItem("tonhubUsername")
                                    ? localStorage.getItem("tonhubUsername").slice(0, 8)
                                    : localStorage.getItem("tonkeeperUsername")
                                    ? localStorage.getItem("tonkeeperUsername").slice(0, 8)
                                    : "EQA8weLF"
                                }...
                                <img
                                    className="header__buttons-user-arrow"
                                    src="/img/header/arrow.svg"
                                    alt=""
                                    style={{ transform: `rotate(${userMenu ? "180deg" : "0deg"})` }}
                                />
                            </button>
                            {userMenu && (
                                <ul
                                    className={`header__buttons-userMenu ${changeTheme(
                                        "",
                                        "header__buttons-userMenu--dark",
                                    )}`}>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`/img/header/profile-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href={`/profile/${currentUser.id}`}>
                                            Profile
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`/img/header/collections-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/profile#collection">
                                            My Collections
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`/img/header/create-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/create-nft">
                                            Create
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`/img/header/favorite-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/profile#favorite">
                                            Favorites
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`/img/header/settings-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/profile">
                                            Settings
                                        </a>
                                    </li>
                                    <li
                                        className="header__buttons-userMenu-item"
                                        onClick={() => {
                                            userExit();
                                        }}>
                                        <img src={`/img/header/exit-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="#">
                                            Exit
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </>
                    )}
                    <button className="header__buttons-theme">
                        <img
                            onClick={() => {
                                setTheme(theme === "light" ? "dark" : "light");
                                localStorage.setItem("theme", theme === "light" ? "dark" : "light");
                            }}
                            src={`/img/header/${theme}-theme.png`}
                            alt={`${theme} theme`}
                        />
                    </button>
                </div>
            )}
            {!openSearch && (
                <div className="header__mobile">
                    <button className="header__mobile-search" onClick={() => setOpenSearch(true)}>
                        <img src="/img/header/search-white.svg" alt="Search" />
                    </button>
                    <div className="header__mobile-hamburger" onClick={() => setOpenMobileMenu(true)}>
                        <div className="header__mobile-hamburger-line"></div>
                        <div className="header__mobile-hamburger-line"></div>
                        <div className="header__mobile-hamburger-line"></div>
                    </div>
                </div>
            )}
            <div
                className="header__mobileMenu"
                style={{
                    right: openMobileMenu ? "0" : "-600px",
                    color: theme === "light" ? "#000" : "#fff",
                    backgroundColor: theme === "light" ? "#fff" : "#1C2026",
                }}>
                <img
                    className="header__mobileMenu-close"
                    src={`/img/header/${theme === "light" ? "close" : "close-white"}.png`}
                    alt="Close"
                    onClick={() => setOpenMobileMenu(false)}
                />
                <ul className="header__mobileMenu-list">
                    <li className="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="/marketplace">
                            Marketplace
                        </a>
                    </li>
                    <li className="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="/catalog">
                            Catalog
                        </a>
                    </li>
                    <li className="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="/faq">
                            FAQ
                        </a>
                    </li>
                    <li className="header__mobileMenu-list-item header__mobileMenu-list-item-mode">
                        <a className="header__mobileMenu-list-item-link" href="#">
                            Dark mode
                        </a>
                        <div className="header__mobileMenu-list-item-switch">
                            <input type="checkbox" id="switch" />
                            <label onClick={() => setTheme(theme === "light" ? "dark" : "light")} htmlFor="switch">
                                Toggle
                            </label>
                        </div>
                    </li>
                </ul>
                <div className="header__mobileMenu-down">
                    <button className="header__mobileMenu-connect" onClick={() => setPopup(true)}>
                        Connect
                    </button>
                    <div className="header__mobileMenu-items">
                        <a href="#">
                            <img src="/img/footer/vk.svg" alt="VK" className="header__mobileMenu-items-item" />
                        </a>
                        <a href="#">
                            <img
                                src="/img/footer/telegram.svg"
                                alt="Telegram"
                                className="header__mobileMenu-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="/img/footer/twitter.svg"
                                alt="Twitter"
                                className="header__mobileMenu-items-item"
                            />
                        </a>
                        <a href="#">
                            <img src="/img/footer/reddit.svg" alt="Reddit" className="header__mobileMenu-items-item" />
                        </a>
                        <a href="#">
                            <img
                                src="/img/footer/discord.svg"
                                alt="Discord"
                                className="header__mobileMenu-items-item"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="header__mobileSearch" style={{ left: openSearch ? "58px" : "958px" }}>
                <input
                    className="header__mobileSearch-enter"
                    type="text"
                    placeholder="Search"
                    onChange={e => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    style={{
                        backgroundColor: theme === "light" ? "#fff" : "#272E37",
                        borderColor: theme === "light" ? "#efefef" : "#373F4A",
                        color: theme === "light" ? "#2d333e" : "#fff",
                    }}
                />
                <img
                    className="header__mobileSearch-back"
                    src="/img/header/arrow-left.png"
                    alt="Back"
                    onClick={() => setOpenSearch(false)}
                />
                <img
                    className="header__mobileSearch-clear"
                    src="/img/header/close-grey.png"
                    alt="Clear"
                    onClick={() => setSearchQuery("")}
                />
                {searchQuery !== "" && (
                    <div className="header__search-popup">
                        <div className="header__search-popup-btns">
                            <button
                                onClick={() => {
                                    setSearchFilter("nft");
                                }}
                                className={`header__search-popup-btns-nfts ${
                                    searchFilter === "nft" ? "header__search-popup-btns-nfts--active" : ""
                                }`}>
                                NFTs
                            </button>
                            <button
                                onClick={() => setSearchFilter("collection")}
                                className={`header__search-popup-btns-collections ${
                                    searchFilter === "collection" ? "header__search-popup-btns-collections--active" : ""
                                }`}>
                                Collections
                            </button>
                        </div>
                        <ul className="header__search-popup-list">
                            {searchFilter === "nft"
                                ? NFTs.filter(
                                      nft =>
                                          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                          searchQuery !== "",
                                  ).map(nft => (
                                      <li className="header__search-popup-list-item">
                                          <img src={`/img/card/photo-${nft?.img}.svg`} alt="" />
                                          <p>{nft?.name}</p>
                                      </li>
                                  ))
                                : collections
                                      .filter(
                                          collection =>
                                              collection.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                              searchQuery !== "",
                                      )
                                      .map(collection => (
                                          <li className="header__search-popup-list-item">
                                              <img src={`/img/card/photo-${collection?.img}.svg`} alt="" />
                                              <p>{collection?.name}</p>
                                          </li>
                                      ))}
                        </ul>
                        <a className="header__search-popup-all" href="/marketplace">
                            See all results
                        </a>
                    </div>
                )}
            </div>
            {popup && (
                <>
                    <div className="connect">
                        <div
                            className="connect__popup"
                            style={{ backgroundColor: theme === "light" ? "#fff" : "#1C2026", padding: `${tonhubQR ? "65px" : ""}` }}>
                            {tonhubQR && window.innerWidth > 768 ? (
                                <>
                                    <img
                                        onClick={() => {
                                            setPopup(false);
                                            setTonhubQR(false);
                                        }}
                                        className="connect__popup-img"
                                        src={`/img/header/${theme === "light" ? "close" : "close-white"}.png`}
                                        alt="Close"
                                    />
                                    <h6
                                        className="connect__popup-title-qr"
                                        style={{ color: theme === "light" ? "#000" : "#fff" }}>
                                        Scan this QR-code in the Tonhub app
                                    </h6>
                                    <QRCodeSVG 
                                    value={tonhubData?.link}
                                    size={200}
                                    imageSettings={{src: "/img/sections/connect/crystal.png"}}
                                    />
                                </>
                            ) : 
                            tonkeeperQR && window.innerWidth > 768 ? (
                                <>
                                    <img
                                        onClick={() => {
                                            setPopup(false);
                                            setTonkeeperQR(false);
                                        }}
                                        className="connect__popup-img"
                                        src={`/img/header/${theme === "light" ? "close" : "close-white"}.png`}
                                        alt="Close"
                                    />
                                    <h6
                                        className="connect__popup-title-qr"
                                        style={{ color: theme === "light" ? "#000" : "#fff" }}>
                                        Scan this QR-code in the Tonkeeper app
                                    </h6>
                                    <QRCodeSVG 
                                    value={tonkeeperUniversalLink}
                                    size={200}
                                    imageSettings={{src: "/img/sections/connect/diamond-big.png"}}
                                    />
                                </>
                            ) :
                            (window.innerWidth <= 768) ? (
                                <>
                                    <img
                                        onClick={() => {
                                            setPopup(false);
                                        }}
                                        className="connect__popup-img"
                                        src={`/img/header/${theme === "light" ? "close" : "close-white"}.png`}
                                        alt="Close"
                                    />
                                    <h6
                                        className="connect__popup-title"
                                        style={{ color: theme === "light" ? "#000" : "#fff" }}>
                                        Connect Wallet
                                    </h6>
                                    <p
                                        className="connect__popup-text"
                                        style={{
                                            color:
                                                theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.7)",
                                        }}>
                                        A wallet is a simple, anonymous way to log in. To create ('mint') or buy an NFT,
                                        you must connect a wallet or create a new one.
                                    </p>
                                    <a
                                        href={tonkeeperUniversalLink}
                                        className="connect__popup-btn"
                                        onClick={() => {
                                            tonkeeperAuthClick();
                                        }}
                                        style={{
                                            color: theme === "light" ? "#000" : "#fff",
                                            backgroundColor: theme === "light" ? "#f4f4f4" : "#272E37",
                                        }}>
                                        Tonkeeper
                                    </a>
                                    <a
                                        href={tonhubData.link}
                                        className="connect__popup-btn"
                                        onClick={() => {
                                            tonhubAuthClick();
                                        }}
                                        style={{
                                            color: theme === "light" ? "#000" : "#fff",
                                            backgroundColor: theme === "light" ? "#f4f4f4" : "#272E37",
                                        }}>
                                        Tonhub
                                    </a>
                                </>
                            )
                            :
                             (
                                <>
                                    <img
                                        onClick={() => {
                                            setPopup(false);
                                        }}
                                        className="connect__popup-img"
                                        src={`/img/header/${theme === "light" ? "close" : "close-white"}.png`}
                                        alt="Close"
                                    />
                                    <h6
                                        className="connect__popup-title"
                                        style={{ color: theme === "light" ? "#000" : "#fff" }}>
                                        Connect Wallet
                                    </h6>
                                    <p
                                        className="connect__popup-text"
                                        style={{
                                            color:
                                                theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.7)",
                                        }}>
                                        A wallet is a simple, anonymous way to log in. To create ('mint') or buy an NFT,
                                        you must connect a wallet or create a new one.
                                    </p>
                                    <button
                                        className="connect__popup-btn"
                                        onClick={() => {
                                            tonkeeperAuthClick();
                                        }}
                                        style={{
                                            color: theme === "light" ? "#000" : "#fff",
                                            backgroundColor: theme === "light" ? "#f4f4f4" : "#272E37",
                                        }}>
                                        Tonkeeper
                                    </button>
                                    <button
                                        className="connect__popup-btn"
                                        onClick={() => {
                                            tonhubAuthClick();
                                        }}
                                        style={{
                                            color: theme === "light" ? "#000" : "#fff",
                                            backgroundColor: theme === "light" ? "#f4f4f4" : "#272E37",
                                        }}>
                                        Tonhub
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;
