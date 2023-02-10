import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../Context";
import "./Header.scss";

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
    useEffect(() => {
        if (popup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            document.body.style.overflowX = "hidden";
        }
    }, [popup, setPopup]);
    useEffect(() => {
        setTheme(localStorage.getItem("theme") === null ? "light" : localStorage.getItem("theme"));
        setAuth(localStorage.getItem("auth"));
    }, []);

    return (
        <header className="header" style={{ backgroundColor: theme === "light" ? "#004f87" : "#1C2026" }}>
            {!openSearch && (
                <div class="header__logo">
                    <a href="/">
                        <img src="./img/header/header-logo.svg" alt="Logo" />
                    </a>
                </div>
            )}
            <nav class="header__menu">
                {["Marketplace", "Catalog", "FAQ"].map(item => (
                    <a
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
                    onFocus={() => {setFocus(true)
                    setSearchPopup(true)}}
                    onBlur={() => setFocus(false)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search"
                    style={{
                        backgroundColor: theme === "light" ? "#fff" : "#272E37",
                        borderColor: theme === "light" ? "#efefef" : "#373F4A",
                        color: changeTheme("", "#fff")
                    }}
                />
                <img src={`./img/header/${searchQuery !== "" ? "clear" : "search"}.svg`} alt="" onClick={() => setSearchQuery("")}/>
                {searchQuery !== "" && (
                    <div class="header__search-popup">
                        <div class="header__search-popup-btns">
                            <button
                                onClick={() => {
                                    setSearchFilter("nft")
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
                        <ul class="header__search-popup-list">
                            {searchFilter === "nft"
                                ? NFTs
                                .filter(nft => nft.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery !== "")
                                .map(nft => (
                                      <li class="header__search-popup-list-item">
                                          <img src={`./img/card/photo-${nft?.img}.svg`} alt="" />
                                          <p>{nft?.name}</p>
                                      </li>
                                  ))
                                : collections
                                .filter(collection => (collection.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery !== ""))
                                .map(collection => (
                                      <li class="header__search-popup-list-item">
                                          <img src={`./img/card/photo-${collection?.img}.svg`} alt="" />
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
            {!openSearch && (
                <div class="header__buttons">
                    {!auth || auth === "false" ? (
                        <button onClick={() => setPopup(true)} className="header__buttons-connect">
                            {window.innerWidth <= 1440 ? "Connect" : "Connect wallet"}
                        </button>
                    ) : (
                        <>
                            <button className="header__buttons-user" onClick={() => setUserMenu(!userMenu)}>
                                <img className="header__buttons-user-avatar" src="./img/header/avatar.svg" alt="" />
                                EQA8weLF...
                                <img
                                    className="header__buttons-user-arrow"
                                    src="./img/header/arrow.svg"
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
                                        <img src={`./img/header/profile-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/my-nft">
                                            Profile
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`./img/header/collections-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/my-nft#collection">
                                            My Collections
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`./img/header/create-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/create-nft">
                                            Create
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`./img/header/favorite-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/my-nft#favorite">
                                            Favorites
                                        </a>
                                    </li>
                                    <li className="header__buttons-userMenu-item">
                                        <img src={`./img/header/settings-${theme}.svg`} alt="" />
                                        <a className="header__buttons-userMenu-item-link" href="/my-nft">
                                            Settings
                                        </a>
                                    </li>
                                    <li
                                        className="header__buttons-userMenu-item"
                                        onClick={() => {
                                            setAuth(false);
                                            localStorage.setItem("auth", false);
                                            setUserMenu(false);
                                        }}>
                                        <img src={`./img/header/exit-${theme}.svg`} alt="" />
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
                            src={`./img/header/${theme}-theme.png`}
                            alt={`${theme} theme`}
                        />
                    </button>
                </div>
            )}
            {!openSearch && (
                <div class="header__mobile">
                    <button class="header__mobile-search" onClick={() => setOpenSearch(true)}>
                        <img src="./img/header/search-white.svg" alt="Search" />
                    </button>
                    <div class="header__mobile-hamburger" onClick={() => setOpenMobileMenu(true)}>
                        <div class="header__mobile-hamburger-line"></div>
                        <div class="header__mobile-hamburger-line"></div>
                        <div class="header__mobile-hamburger-line"></div>
                    </div>
                </div>
            )}
            <div
                class="header__mobileMenu"
                style={{
                    right: openMobileMenu ? "0" : "-600px",
                    color: theme === "light" ? "#000" : "#fff",
                    backgroundColor: theme === "light" ? "#fff" : "#1C2026",
                }}>
                <img
                    className="header__mobileMenu-close"
                    src={`./img/header/${theme === "light" ? "close" : "close-white"}.png`}
                    alt="Close"
                    onClick={() => setOpenMobileMenu(false)}
                />
                <ul class="header__mobileMenu-list">
                    <li class="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="/marketplace">
                            Marketplace
                        </a>
                    </li>
                    <li class="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="/catalog">
                            Catalog
                        </a>
                    </li>
                    <li class="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="/faq">
                            FAQ
                        </a>
                    </li>
                    <li class="header__mobileMenu-list-item header__mobileMenu-list-item-mode">
                        <a className="header__mobileMenu-list-item-link" href="#">
                            Dark mode
                        </a>
                        <div className="header__mobileMenu-list-item-switch">
                            <input type="checkbox" id="switch" />
                            <label onClick={() => setTheme(theme === "light" ? "dark" : "light")} for="switch">
                                Toggle
                            </label>
                        </div>
                    </li>
                </ul>
                <div className="header__mobileMenu-down">
                    <button class="header__mobileMenu-connect" onClick={() => setPopup(true)}>
                        Connect
                    </button>
                    <div className="header__mobileMenu-items">
                        <a href="#">
                            <img src="./img/footer/vk.svg" alt="VK" className="header__mobileMenu-items-item" />
                        </a>
                        <a href="#">
                            <img
                                src="./img/footer/telegram.svg"
                                alt="Telegram"
                                className="header__mobileMenu-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="./img/footer/twitter.svg"
                                alt="Twitter"
                                className="header__mobileMenu-items-item"
                            />
                        </a>
                        <a href="#">
                            <img src="./img/footer/reddit.svg" alt="Reddit" className="header__mobileMenu-items-item" />
                        </a>
                        <a href="#">
                            <img
                                src="./img/footer/discord.svg"
                                alt="Discord"
                                className="header__mobileMenu-items-item"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div class="header__mobileSearch" style={{ left: openSearch ? "58px" : "958px" }}>
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
                    src="./img/header/arrow-left.png"
                    alt="Back"
                    onClick={() => setOpenSearch(false)}
                />
                <img
                    className="header__mobileSearch-clear"
                    src="./img/header/close-grey.png"
                    alt="Clear"
                    onClick={() => setSearchQuery("")}
                />
                {searchQuery !== "" && (
                    <div class="header__search-popup">
                        <div class="header__search-popup-btns">
                            <button
                                onClick={() => {
                                    setSearchFilter("nft")
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
                        <ul class="header__search-popup-list">
                            {searchFilter === "nft"
                                ? NFTs
                                .filter(nft => nft.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery !== "")
                                .map(nft => (
                                      <li class="header__search-popup-list-item">
                                          <img src={`./img/card/photo-${nft?.img}.svg`} alt="" />
                                          <p>{nft?.name}</p>
                                      </li>
                                  ))
                                : collections
                                .filter(collection => (collection.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery !== ""))
                                .map(collection => (
                                      <li class="header__search-popup-list-item">
                                          <img src={`./img/card/photo-${collection?.img}.svg`} alt="" />
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
                <div className="connect">
                    <div class="connect__popup" style={{ backgroundColor: theme === "light" ? "#fff" : "#1C2026" }}>
                        <img
                            onClick={() => {
                                // document.body.style.overflowX = "hidden";
                                setPopup(false);
                            }}
                            className="connect__popup-img"
                            src={`./img/header/${theme === "light" ? "close" : "close-white"}.png`}
                            alt="Close"
                        />
                        <h6 className="connect__popup-title" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                            Connect Wallet
                        </h6>
                        <p
                            className="connect__popup-text"
                            style={{ color: theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.7)" }}>
                            A wallet is a simple, anonymous way to log in. To create ('mint') or buy an NFT, you must
                            connect a wallet or create a new one.
                        </p>
                        <button
                            class="connect__popup-btn"
                            onClick={() => {
                                setPopup(false);
                                setAuth(true);
                                localStorage.setItem("auth", true);
                            }}
                            style={{
                                color: theme === "light" ? "#000" : "#fff",
                                backgroundColor: theme === "light" ? "#f4f4f4" : "#272E37",
                            }}>
                            Tonkeeper
                        </button>
                        <button
                            class="connect__popup-btn"
                            onClick={() => {
                                setPopup(false);
                                setAuth(true);
                                localStorage.setItem("auth", true);
                            }}
                            style={{
                                color: theme === "light" ? "#000" : "#fff",
                                backgroundColor: theme === "light" ? "#f4f4f4" : "#272E37",
                            }}>
                            Tonhub
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
