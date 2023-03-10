import { useContext, useEffect, useState } from "react";
import "./AdminPanel.scss";
import { ContextApp } from "../../Context";
import Draggable from "react-draggable";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from "react-accessible-accordion";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function AdminPanelAuth() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    return (
        <section className="adminPanelAuth">
            <form className="adminPanelAuth__form" action="">
                <h1>You Admin?</h1>
                <input type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    onClick={e => {
                        e.preventDefault();
                        axios
                            .post(
                                "https://nft-one.art/api/auth/login",
                                {
                                    login,
                                    password,
                                },
                                {
                                    auth: {
                                        username: "odmen",
                                        password: "NFTflsy",
                                    },
                                },
                            )
                            .then(response => {
                                localStorage.setItem("adminToken", response.data.token);
                                window.location.reload();
                            })
                            .catch(error => {
                                alert("???????????????? ???????????? ?????? ??????????");
                            });
                    }}>
                    Enter
                </button>
            </form>
        </section>
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
                    {showItems ? "Hide 3 items" : "Show 3 items"}
                    <img
                        className="adminPanel__content-table-header-show-img"
                        src="./img/adminPanel/arrow.svg"
                        alt=""
                        style={{ transform: showItems ? "rotate(180deg)" : "rotate(0deg)" }}
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

function AdminPanelFAQ() {
    const { changeTheme } = useContext(ContextApp);

    const [FAQs, setFAQs] = useState([]);
    const [FAQsOnce, setFAQsOnce] = useState([]);

    // ???????????????? ??????????????-????????????
    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/faq/list",
                {},
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                setFAQs(() => response.data.items);
            })
            .catch(error => {
                console.log("???????????? ?????? ?????????????????? FAQ:", error);
            });
    }, []);

    // ?????????????????? ???????? isEdit
    useEffect(() => {
        if (FAQs.length > 0) {
            const FAQs_copy = [...FAQs];
            FAQs_copy.map(faq => (!("isEdit" in faq) ? (faq.isEdit = false) : null));
            FAQs_copy.map(faq => (!("name_default" in faq) ? (faq.name_default = faq.name) : null));
            FAQs_copy.map(faq => (!("info_default" in faq) ? (faq.info_default = faq.info) : null));
            setFAQs(FAQs);
        }
    }, [FAQs]);

    // ?????????????????? ????????????-??????????
    const addFAQ = () => {
        let lastID = FAQs.length > 0 ? Number(FAQs[FAQs.length - 1].id) : 0;
        setFAQs([...FAQs, { id: lastID + 1, name: "Question", info: "Answer", name_default: "Question", question_default: "Answer", isEdit: false }]);
    };

    // ?????????????? ????????????-??????????
    const deleteFAQ = id => {
        let FAQs_copy = [...FAQs];
        FAQs_copy = FAQs_copy.filter(faq => faq.id != Number(id))
        setFAQs(FAQs_copy);
    };

    // ?????????????????? ???????????? ???? ??????????????
    const saveFAQ = async () => {
        
        // ?????????????? ?????? ?????????????????? FAQ
        await axios
            .post(
                "https://nft-one.art/api/faq/list",
                {},
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                setFAQsOnce(() => response.data.items);
                console.log("1. ???????????????? ?????? FAQ")
            })
            .catch(error => {
                console.log("???????????? ?????? ?????????????????? FAQ:", error);
            });
        
        // ?????????????????? ??????????
    }

    useEffect(() => {
        const idss = [];
        FAQsOnce.map(faqOnce => idss.push(Number(faqOnce.id)));
        if(FAQsOnce.length > 0) {
            console.log(idss);
            axios
                .post(
                    "https://nft-one.art/api/faq/delete",
                    {
                        ids: [...idss]
                    },
                    {
                        headers: {
                            Token: localStorage.getItem("adminToken"),
                        },
                        auth: {
                            username: "odmen",
                            password: "NFTflsy",
                        },
                    },
                )
                .then(response => {
                    console.log("2. ?????????????? ?????? FAQ")
                })
                .catch(error => {
                    console.log("???????????? ?????? ???????????????? FAQ:", error);
                });
                FAQs.map(faq => {
                    axios
                    .post(
                        "https://nft-one.art/api/faq/upsert",
                        {
                            items: [
                                {
                                    name: faq.name,
                                    info: faq.info,
                                },
                            ],
                        },
                        {
                            headers: {
                                Token: localStorage.getItem("adminToken"),
                            },
                            auth: {
                                username: "odmen",
                                password: "NFTflsy",
                            },
                        },
                    )
                    .then(response => {
                        console.log("3. FAQ ??????????????????")
                    })
                    .catch(error => {
                        console.log("???????????? ?????? ???????????????????? ??????????????-???????????? ?? FAQ:", error);
                    });
                })
                toast.success("Saved", {
                    position: "bottom-right",
                    style: {
                        font: "400 21px/100% 'DM Sans'",
                    },
                })
        }
    }, [FAQsOnce])

    const setNameOrInfoChange = (e, type) => {
        let FAQs_copy = [...FAQs];
        if (type === "name") {
            FAQs_copy.map(faq =>
                Number(e.target.getAttribute("data-id")) == faq.id ? (faq.name = e.target.value) : null,
            );
        } else {
            FAQs_copy.map(faq =>
                Number(e.target.getAttribute("data-id")) == faq.id ? (faq.info = e.target.value) : null,
            );
        }
        setFAQs(FAQs_copy);
    }

    return (
        <section className="faqAdmin" style={{ backgroundColor: changeTheme("#f4f6fa", "#15191E") }}>
            <Toaster/>
            <div className="faqAdmin__box">
                <h1 className="faqAdmin__box-title" style={{ color: changeTheme("", "#fff") }}>
                    Frequently Asked Questions
                </h1>
                {FAQs.length > 0 ? (
                    <Accordion className="faqAdmin__box-items" allowMultipleExpanded={true} allowZeroExpanded={true}>
                        {FAQs.map(faq => (
                            <AccordionItem className="faqAdmin__box-items-item" dangerouslySetExpanded={faq.isEdit ? true : null}>
                                <AccordionItemHeading className="faqAdmin__box-items-item-question">
                                    <AccordionItemButton
                                        className={changeTheme(
                                            "faqAdmin__box-items-item-question-btn",
                                            "faqAdmin__box-items-item-question-btn faqAdmin__box-items-item-question-btn--dark",
                                        )}>
                                        {
                                            faq.isEdit ? <input onKeyDown={(ev) => {ev.stopPropagation()}} id="nameFAQ" data-id={faq.id} className="faqAdmin__box-items-item-question-edit" type="text" value={faq.name} onChange={(e) => setNameOrInfoChange(e, "name")}/> : faq.name
                                        }
                                        <AccordionItemState>
                                            {expanded =>
                                                expanded.expanded ? (
                                                    <img
                                                        src="./img/sections/faq/arrow-light.svg"
                                                        alt=""
                                                        style={{ transform: "rotate(180deg) translateY(50%)" }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="./img/sections/faq/arrow-light.svg"
                                                        alt=""
                                                        style={{ transform: "rotate(0deg) translateY(-50%)" }}
                                                    />
                                                )
                                            }
                                        </AccordionItemState>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="faqAdmin__box-items-item-answer">
                                    {faq.isEdit ? <input data-id={faq.id} className="faqAdmin__box-items-item-answer-edit" type="text" value={faq.info} onChange={(e) => setNameOrInfoChange(e, "info")}/> : faq.info}
                                </AccordionItemPanel>
                                {faq.isEdit ? (
                                    <>
                                        <img
                                            className="faqAdmin__box-items-item-yes"
                                            src="./img/adminPanel/yes.svg"
                                            alt=""
                                            data-faq-id={faq.id}
                                            onClick={(e) => {
                                                let FAQs_copy = [...FAQs];
                                                FAQs_copy.map(faq => {
                                                    if(Number(e.target.getAttribute("data-faq-id")) == faq.id) {
                                                        faq.name_default = faq.name
                                                        faq.info_default = faq.info
                                                        faq.isEdit = false
                                                    }
                                                });
                                                setFAQs(FAQs_copy);
                                            }}
                                        />
                                        <img
                                            data-id={faq.id}
                                            className="faqAdmin__box-items-item-no"
                                            src="./img/adminPanel/no.svg"
                                            alt=""
                                            onClick={(e) => {
                                                let FAQs_copy = [...FAQs];
                                                FAQs_copy.map(faq => {
                                                    if(Number(e.target.getAttribute("data-id")) == faq.id) {
                                                        faq.name = faq.name_default
                                                        faq.info = faq.info_default
                                                        faq.isEdit = false
                                                    }
                                                });
                                                setFAQs(FAQs_copy);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="faqAdmin__box-items-item-edit"
                                            src="./img/adminPanel/edit.svg"
                                            alt=""
                                            data-faq-id={faq.id}
                                            onClick={e => {
                                                const FAQs_copy = [...FAQs];
                                                FAQs_copy.map(faq =>
                                                    Number(e.target.getAttribute("data-faq-id")) == Number(faq.id)
                                                        ? (faq.isEdit = true)
                                                        : null,
                                                );
                                                setFAQs(FAQs_copy);
                                            }}
                                        />
                                        <img
                                            data-id={faq.id}
                                            onClick={e => {
                                                deleteFAQ(e.target.getAttribute("data-id"));
                                            }}
                                            className="faqAdmin__box-items-item-delete"
                                            src="./img/adminPanel/delete.svg"
                                            alt=""
                                        />
                                    </>
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className="faqAdmin__box-empty">FAQ is empty</p>
                )}
                <div className="faqAdmin__box-btns">
                    <button
                        className="faqAdmin__box-add"
                        onClick={() => {
                            saveFAQ();
                        }}
                        >
                        Save
                    </button>
                    <button
                        className="faqAdmin__box-add"
                        onClick={() => {
                            addFAQ();
                        }}>
                        + Add
                    </button>
                </div>
            </div>
        </section>
    );
}

function AdminPanel() {
    const { theme, setTheme, changeTheme } = useContext(ContextApp);
    const [menu, setMenu] = useState(true);
    const [currentPage, setCurrentPage] = useState("faq");
    const [adminPopup, setAdminPopup] = useState(false);

    return (
        <>
            {localStorage.getItem("adminToken") ? (
                <>
                    <header className="adminPanel__header" style={{ background: changeTheme("", "#1C2026") }}>
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
                                <div
                                    className={
                                        currentPage === item.toLowerCase() ? "adminPanel__mobileMenu--active" : null
                                    }>
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
                            ) : currentPage === "faq" ? (
                                <AdminPanelFAQ />
                            ) : null}
                        </div>
                    </section>
                </>
            ) : (
                <AdminPanelAuth />
            )}
        </>
    );
}

export default AdminPanel;
