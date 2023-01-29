import { useContext } from "react";
import { ContextApp } from "../../Context";
import "./Header.scss";

function Header() {
    const globalContext = useContext(ContextApp);
    return (
        <header className="header" style={{ backgroundColor: globalContext.theme === "light" ? "#004f87" : "#1C2026" }}>
            <div class="header__logo">
                <a href="#">
                    <img src="./img/header/header-logo.svg" alt="Logo" />
                </a>
            </div>
            <nav class="header__menu">
                <a className="header__menu-link header__menu-link--active" href="#">
                    Marketplace
                </a>
                <a className="header__menu-link" href="#">
                    Catalog
                </a>
                <a className="header__menu-link" href="#">
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
            <div class="header__buttons">
                <button className="header__buttons-connect">Connect wallet</button>
                <button className="header__buttons-theme">
                    <img
                        onClick={() => globalContext.setTheme(globalContext.theme === "light" ? "dark" : "light")}
                        src={`./img/header/${globalContext.theme}-theme.svg`}
                        alt={`${globalContext.theme} theme`}
                    />
                </button>
            </div>
        </header>
    );
}

export default Header;
