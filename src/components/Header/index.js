import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextApp } from "../../Context";
import "./Header.scss";

function Header({ currentPage }) {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [popup, setPopup] = useState(false);
    const { theme, setTheme } = useContext(ContextApp);
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
                    <Link
                        href={`/${item.toLowerCase()}`}
                        className={`header__menu-link ${theme === "light" ? "" : "header__menu-link--dark"} ${
                            currentPage === item.toLocaleLowerCase() ? "header__menu-link--active" : ""
                        }`}>
                        {item}
                    </Link>
                ))}
            </nav>
            <div className="header__search">
                <input
                    type="text"
                    placeholder="Search"
                    style={{
                        backgroundColor: theme === "light" ? "#fff" : "#272E37",
                        borderColor: theme === "light" ? "#efefef" : "#373F4A",
                    }}
                />
            </div>
            {!openSearch && (
                <div class="header__buttons">
                    <button onClick={() => setPopup(true)} className="header__buttons-connect">
                        {window.innerWidth <= 1440 ? "Connect" : "Connect wallet"}
                    </button>
                    <button className="header__buttons-theme">
                        <img
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            src={`./img/header/${theme}-theme.png`}
                            alt={`${theme} theme`}
                        />
                    </button>
                </div>
            )}
            {openSearch ? null : (
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
                        <a className="header__mobileMenu-list-item-link" href="#">
                            Marketplace
                        </a>
                    </li>
                    <li class="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="#">
                            Catalog
                        </a>
                    </li>
                    <li class="header__mobileMenu-list-item">
                        <a className="header__mobileMenu-list-item-link" href="#">
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
            </div>
            {popup && (
                <div className="connect">
                    <div class="connect__popup" style={{ backgroundColor: theme === "light" ? "#fff" : "#1C2026" }}>
                        <img
                            onClick={() => setPopup(false)}
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
                            style={{
                                color: theme === "light" ? "#000" : "#fff",
                                backgroundColor: theme === "light" ? "#f4f4f4" : "#272E37",
                            }}>
                            Tonkeeper
                        </button>
                        <button
                            class="connect__popup-btn"
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
