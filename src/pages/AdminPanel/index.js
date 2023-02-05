import { useContext, useState } from "react";
import "./AdminPanel.scss";
import { ContextApp } from "../../Context";
import Draggable from "react-draggable";

function AdminPanelStatistics() {
    return (
        <div className="adminPanel__content-content-statistics">
            <div className="adminPanel__content-statistics-info">
                <div className="adminPanel__content-statistics-info-item">Total users: 1640</div>
                <div className="adminPanel__content-statistics-info-item">Active users: 593</div>
                <div className="adminPanel__content-statistics-info-item">Banned users: 162</div>
            </div>
        </div>
    );
}

function AdminPanelUsers() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showItems, setShowItems] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);
    const users = [
        {
            id: 1,
            name: "Evgeniy Kozlov",
            date: "12.10.2004 20:53",
            "title-1": 50094345,
            "title-2": 5432423,
            "title-3": 543534534,
            "title-4": 7644352,
            status: true,
        },
        {
            id: 2,
            name: "Andrey Popov",
            date: "30.04.2001 21:23",
            "title-1": 50946345,
            "title-2": 12312423,
            "title-3": 5432312,
            "title-4": 5434352,
            status: false,
        },
        {
            id: 3,
            name: "Andrey Lobov",
            date: "04.03.2004 05:10",
            "title-1": 65094345,
            "title-2": 93432423,
            "title-3": 563534534,
            "title-4": 1234432,
            status: false,
        },
    ];
    function checkboxAdd(e) {
        if (e.target.getAttribute("class") === "adminPanel__content-table-main-head-title--checked") {
            e.target.classList.remove("adminPanel__content-table-main-head-title--checked");
        } else {
            e.target.classList.add("adminPanel__content-table-main-head-title--checked");
        }
    }
    return (
        <div class="adminPanel__content-table">
            <div className="adminPanel__content-table-header">
                <h1 className="adminPanel__content-table-header-title">Users</h1>
                <button className="adminPanel__content-table-header-show" onClick={() => setShowItems(!showItems)}>
                    {
                        showItems ? "Hide 3 items" : "Show 3 items"
                    }
                    <img
                        className="adminPanel__content-table-header-show-img"
                        src="./img/adminPanel/arrow.svg"
                        alt=""
                        style={{transform: showItems ? "rotate(180deg)" : "rotate(0deg)"}}
                    />
                </button>
            </div>
            {showItems && (
                <>
                    <div className="adminPanel__content-table-search">
                        <img src="./img/adminPanel/search.svg" alt="" />
                        <input
                            placeholder="Search Name, Date, Number..."
                            type="text"
                            class="adminPanel__content-table-search-input"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="adminPanel__content-table-main">
                        <div class="adminPanel__content-table-main-head">
                            <div class="adminPanel__content-table-main-head-title">
                                <div
                                    className={
                                        selectedAll ? "adminPanel__content-table-main-head-title--checked" : null
                                    }>
                                    <input type="checkbox" onClick={() => setSelectedAll(!selectedAll)} />
                                </div>
                                First Name Last Name
                                <img src="./img/adminPanel/sort.svg" alt="" />
                            </div>
                            <div class="adminPanel__content-table-main-head-title">
                                Date
                                <img src="./img/adminPanel/sort.svg" alt="" />
                            </div>
                            <div class="adminPanel__content-table-main-head-title">
                                Title
                                <img src="./img/adminPanel/sort.svg" alt="" />
                            </div>
                            <div class="adminPanel__content-table-main-head-title">
                                Title
                                <img src="./img/adminPanel/sort.svg" alt="" />
                            </div>
                            <div class="adminPanel__content-table-main-head-title">
                                Title
                                <img src="./img/adminPanel/sort.svg" alt="" />
                            </div>
                            <div class="adminPanel__content-table-main-head-title">
                                Title
                                <img src="./img/adminPanel/sort.svg" alt="" />
                            </div>
                            <div class="adminPanel__content-table-main-head-title">
                                Status
                                <img src="./img/adminPanel/sort.svg" alt="" />
                            </div>
                        </div>
                        {users
                            .filter(
                                item =>
                                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item["title-1"].toString().includes(searchQuery.toLowerCase()) ||
                                    item["title-2"].toString().includes(searchQuery.toLowerCase()) ||
                                    item["title-3"].toString().includes(searchQuery.toLowerCase()) ||
                                    item["title-4"].toString().includes(searchQuery.toLowerCase()),
                            )
                            .map(user => (
                                <div class="adminPanel__content-table-main-row">
                                    <div class="adminPanel__content-table-main-row-name">
                                        <div
                                            className={
                                                selectedAll
                                                    ? "adminPanel__content-table-main-head-title--checked"
                                                    : null
                                            }
                                            onClick={e => {
                                                checkboxAdd(e);
                                            }}>
                                            <input type="checkbox" />
                                        </div>
                                        {user.name}
                                    </div>
                                    <div class="adminPanel__content-table-main-row-date">{user.date}</div>
                                    <div class="adminPanel__content-table-main-row-title">{user["title-1"]}</div>
                                    <div class="adminPanel__content-table-main-row-title">{user["title-2"]}</div>
                                    <div class="adminPanel__content-table-main-row-title">{user["title-3"]}</div>
                                    <div class="adminPanel__content-table-main-row-title">{user["title-4"]}</div>
                                    <div class="adminPanel__content-table-main-row-status">
                                        {user.status ? (
                                            <div className="adminPanel__content-table-main-row-status-active">
                                                Active
                                            </div>
                                        ) : (
                                            <div className="adminPanel__content-table-main-row-status-banned">
                                                Banned
                                            </div>
                                        )}
                                    </div>
                                    <div className="adminPanel__content-table-main-row-btns">
                                        <img src="./img/adminPanel/delete.svg" alt="Delete user" />
                                        <img src="./img/adminPanel/edit.svg" alt="Edit user" />
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}

function AdminPanel() {
    const { theme, setTheme, changeTheme } = useContext(ContextApp);
    const [menu, setMenu] = useState(true);
    const [currentPage, setCurrentPage] = useState("users");
    const [adminPopup, setAdminPopup] = useState(false);

    return (
        <>
            <header className="adminPanel__header" style={{background: changeTheme("", "#1C2026")}}>
                <img className="adminPanel__header-logo" src="./img/header/header-logo.svg" alt="" />
                <div className="adminPanel__header-btns">
                    <button onClick={() => setAdminPopup(!adminPopup)}>
                        You are logged in as Admin
                        <img
                            src="./img/header/arrow-light.svg"
                            alt=""
                            style={{ transform: adminPopup ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                        {adminPopup && (
                            <ul className="adminPanel__header-btns-popup">
                                <li className="adminPanel__header-btns-popup-item">
                                    <a href="/">Go to site</a>
                                </li>
                            </ul>
                        )}
                    </button>
                    <img
                        className="adminPanel__header-btns-theme"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        src={`./img/header/${theme}-theme.svg`}
                        alt=""
                    />
                </div>
            </header>
            <section className={`adminPanel ${changeTheme("", "adminPanel--dark")}`}>
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
                                href={"#"}
                                data-item={item.toLowerCase()}
                                onClick={e => {
                                    setCurrentPage(e.target.getAttribute("data-item"));
                                }}>
                                {menu && item}
                            </a>
                        </div>
                    ))}
                </div>
                <div class="adminPanel__mobileMenu">
                    {["Home", "Finance", "Users", "Collections", "NFT", "FAQ", "Statistics"].map(item => (
                        <div className={currentPage === item.toLowerCase() ? "adminPanel__mobileMenu--active" : null}>
                            <img src={`./img/header/${item.toLowerCase()}.svg`} alt="" />
                            <a
                                className="adminPanel__mobileMenu-link"
                                href={"#"}
                                data-item={item.toLowerCase()}
                                onClick={e => {
                                    setCurrentPage(e.target.getAttribute("data-item"));
                                }}>
                                {item}
                            </a>
                        </div>
                    ))}
                </div>
                <div class="adminPanel__content">
                    {currentPage === "users" ? (
                        window.innerWidth <= 768 ? (
                            <Draggable axis="x">
                                <div>
                                    <AdminPanelUsers />
                                </div>
                            </Draggable>
                        ) : (
                            <AdminPanelUsers />
                        )
                    ) : currentPage === "statistics" ? (
                        <AdminPanelStatistics />
                    ) : null}
                </div>
            </section>
        </>
    );
}

export default AdminPanel;
