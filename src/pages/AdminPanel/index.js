import { useContext, useState } from "react";
import "./AdminPanel.scss";
import { ContextApp } from "../../Context";
import { logDOM } from "@testing-library/react";

function AdminPanel() {
    const { theme, setTheme } = useContext(ContextApp);
    const [menu, setMenu] = useState(true);
    const [currentPage, setCurrentPage] = useState("home");
    return (
        <>
            <header className="adminPanel__header">
                <img className="adminPanel__header-logo" src="./img/header/header-logo.svg" alt="" />
                <div className="adminPanel__header-btns">
                    <button>
                        You are logged in as Admin
                        <img src="./img/header/arrow-light.svg" alt="" />
                    </button>
                    <img
                        className="adminPanel__header-btns-theme"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        src={`./img/header/${theme}-theme.svg`}
                        alt=""
                    />
                </div>
            </header>
            <section className="adminPanel">
                <div class={`adminPanel__menu ${!menu ? "adminPanel__menu--low" : ""}`}>
                    <img
                        className="adminPanel__menu-burger"
                        onClick={() => setMenu(!menu)}
                        src="./img/header/burger.svg"
                        alt=""
                    />
                    {["Home", "Finance", "Users", "Collections", "NFT", "FAQ", "Statistics"].map(item => (
                        <div
                            className={`adminPanel__menu-item ${
                                currentPage === item.toLowerCase() ? "adminPanel__menu--active" : null
                            }`}
                            data-item={item.toLowerCase()}
                            onClick={e => {
                                setCurrentPage(e.target.getAttribute("data-item"));
                            }}>
                            <img
                                src={`./img/header/${item.toLowerCase()}.svg`}
                                alt=""
                                data-item={item.toLowerCase()}
                                onClick={e => {
                                    setCurrentPage(e.target.getAttribute("data-item"));
                                }}
                            />
                            <a
                                className="adminPanel__menu-item-text"
                                href="#"
                                data-item={item.toLowerCase()}
                                onClick={e => {
                                    setCurrentPage(e.target.getAttribute("data-item"));
                                }}>
                                {menu && item}
                            </a>
                        </div>
                    ))}
                </div>
                <div class="adminPanel__content">
                    <div class="adminPanel__content-table">
                        <div className="adminPanel__content-table-header">
                            <h1 className="adminPanel__content-table-header-title">Users</h1>
                            <button className="adminPanel__content-table-header-show">
                                Show 11 items
                                <img
                                    className="adminPanel__content-table-header-show-img"
                                    src="./img/adminPanel/arrow.svg"
                                    alt=""
                                />
                            </button>
                        </div>
                        <div className="adminPanel__content-table-search">
                            <img src="./img/adminPanel/search.svg" alt="" />
                            <input placeholder="Search Name, Date, Number..." type="text" class="adminPanel__content-table-search-input" />
                        </div>
                        <div className="adminPanel__content-table-main">Заглушка</div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminPanel;
