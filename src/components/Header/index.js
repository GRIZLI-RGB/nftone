import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import "./Header.scss";
import Marketplace from "../../pages/Marketplace";
import { Link } from "react-router-dom";

function Header() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const globalContext = useContext(ContextApp);
    return (
        <header className="header" style={{ backgroundColor: globalContext.theme === "light" ? "#004f87" : "#1C2026" }}>
            {openSearch ? null : (
                <div class="header__logo">
                    <a href="#">
                        <img src="./img/header/header-logo.svg" alt="Logo" />
                    </a>
                </div>
            )}
            <nav class="header__menu">
                <Link
                    to={<Marketplace />}
                    className={`header__menu-link ${globalContext.theme === "light" ? "" : "header__menu-link--dark"}`}
                    href="#">
                    Marketplace
                </Link>
                <a
                    className={`header__menu-link ${globalContext.theme === "light" ? "" : "header__menu-link--dark"}`}
                    href="#">
                    Catalog
                </a>
                <a
                    className={`header__menu-link ${globalContext.theme === "light" ? "" : "header__menu-link--dark"}`}
                    href="#">
                    FAQ
                </a>
            </nav>
            <div className="header__search">
                <input
                    type="text"
                    placeholder="Search"
                    style={{
                        backgroundColor: globalContext.theme === "light" ? "#fff" : "#272E37",
                        borderColor: globalContext.theme === "light" ? "#efefef" : "#373F4A",
                    }}
                />
            </div>
            {openSearch ? null : (
                <div class="header__buttons">
                    <button onClick={() => globalContext.setPopup(true)} className="header__buttons-connect">
                        {window.innerWidth <= 1440 ? "Connect" : "Connect wallet"}
                    </button>
                    <button className="header__buttons-theme">
                        <img
                            onClick={() => globalContext.setTheme(globalContext.theme === "light" ? "dark" : "light")}
                            src={`./img/header/${globalContext.theme}-theme.png`}
                            alt={`${globalContext.theme} theme`}
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
                    color: globalContext.theme === "light" ? "#000" : "#fff",
                    backgroundColor: globalContext.theme === "light" ? "#fff" : "#1C2026",
                }}>
                <img
                    className="header__mobileMenu-close"
                    src={`./img/header/${globalContext.theme === "light" ? "close" : "close-white"}.png`}
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
                            <label
                                onClick={() =>
                                    globalContext.setTheme(globalContext.theme === "light" ? "dark" : "light")
                                }
                                for="switch">
                                Toggle
                            </label>
                        </div>
                    </li>
                </ul>
                <div className="header__mobileMenu-down">
                    <button class="header__mobileMenu-connect" onClick={() => globalContext.setPopup(true)}>
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
                        backgroundColor: globalContext.theme === "light" ? "#fff" : "#272E37",
                        borderColor: globalContext.theme === "light" ? "#efefef" : "#373F4A",
                        color: globalContext.theme === "light" ? "#2d333e" : "#fff",
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
        </header>
    );
}

export default Header;
