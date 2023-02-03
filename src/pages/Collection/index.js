import { useContext, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ContextApp } from "../../Context";
import "./Collection.scss";
import Checkbox from "../../components/Checkbox";
import Filters from "../../components/Filters";
import SimpleCard from "../../components/SimpleCard";

function Collection() {
    const { theme, changeTheme } = useContext(ContextApp);
    const [graphView, setGraphView] = useState("volume");
    const [sortingPopup, setSortingPopup] = useState(false);
    const [pricePopup, setPricePopup] = useState(false);
    return (
        <>
            <Header />
            <section className="banner">
                <div class="banner__content">
                    <div class="banner__content-card" style={{ backgroundColor: changeTheme("#fff", "#1C2026") }}>
                        <img class="banner__content-card-img" src="./img/sections/collection/card-photo.svg" alt="" />
                        <ul class="banner__content-card-emoji">
                            <li
                                className="banner__content-card-emoji-item"
                                style={{
                                    backgroundColor: changeTheme("rgba(0, 77, 140, 0.1)", "rgba(255, 255, 255, 0.1)"),
                                }}>
                                ❤️
                                <span style={{ color: changeTheme("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)") }}>
                                    250
                                </span>
                            </li>
                            <li
                                className="banner__content-card-emoji-item"
                                style={{
                                    backgroundColor: changeTheme("rgba(0, 77, 140, 0.1)", "rgba(255, 255, 255, 0.1)"),
                                }}>
                                🤣
                                <span style={{ color: changeTheme("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)") }}>
                                    25
                                </span>
                            </li>
                            <li
                                className="banner__content-card-emoji-item"
                                style={{
                                    backgroundColor: changeTheme("rgba(0, 77, 140, 0.1)", "rgba(255, 255, 255, 0.1)"),
                                }}>
                                😍
                                <span style={{ color: changeTheme("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)") }}>
                                    250
                                </span>
                            </li>
                            <li
                                className="banner__content-card-emoji-item"
                                style={{
                                    backgroundColor: changeTheme("rgba(0, 77, 140, 0.1)", "rgba(255, 255, 255, 0.1)"),
                                }}>
                                😡
                                <span style={{ color: changeTheme("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)") }}>
                                    25
                                </span>
                            </li>
                            <li
                                className="banner__content-card-emoji-item"
                                style={{
                                    backgroundColor: changeTheme("rgba(0, 77, 140, 0.1)", "rgba(255, 255, 255, 0.1)"),
                                }}>
                                🙀
                                <span style={{ color: changeTheme("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)") }}>
                                    25
                                </span>
                            </li>
                            <li
                                className="banner__content-card-emoji-item"
                                style={{
                                    backgroundColor: changeTheme("rgba(0, 77, 140, 0.1)", "rgba(255, 255, 255, 0.1)"),
                                }}>
                                🥴
                                <span style={{ color: changeTheme("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)") }}>
                                    25
                                </span>
                            </li>
                            <li
                                className="banner__content-card-emoji-item"
                                style={{
                                    backgroundColor: changeTheme("rgba(0, 77, 140, 0.1)", "rgba(255, 255, 255, 0.1)"),
                                }}>
                                🤑
                                <span style={{ color: changeTheme("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)") }}>
                                    25
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="banner__content-info">
                        <h1 class="banner__content-info-title">Mystic funeral</h1>
                        <p class="banner__content-info-text">
                            To scream, and to fail being heard. How can I make myself heard? How can I be understood?
                            How can I be found in the game of hide-and-seek, where the main point is not to be found?
                            Drapi Superpower: making everything visible
                        </p>
                    </div>
                </div>
                <div className="banner__social">
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/facebook.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/vk.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/tg.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/twitter.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/reddit.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/instagram.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/discord.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/tik-tok.svg"
                            alt=""
                        />
                    </a>
                    <a className="banner__social-link" href="#">
                        <img
                            className="banner__social-link-img"
                            src="./img/sections/collection/social-icons/youtube.svg"
                            alt=""
                        />
                    </a>
                </div>
            </section>
            <section className={`collection ${changeTheme("", "collection--dark")}`}>
                <Filters />
                <button className="collection__filtersMobile">Filters
                <img src={`./img/sections/collection/filters-${theme}.svg`} alt=""/></button>
                <div class="collection__main">
                    <div class="collection__main-info">
                        <div class="collection__main-info-box">
                            <h6 className="collection__main-info-box-title">Create date</h6>
                            <p class="collection__main-info-box-text">15.02.2022</p>
                        </div>
                        <div class="collection__main-info-box">
                            <h6 className="collection__main-info-box-title">Commission</h6>
                            <p class="collection__main-info-box-text">$2</p>
                        </div>
                        <div class="collection__main-info-box">
                            <h6 className="collection__main-info-box-title">Floor price</h6>
                            <p class="collection__main-info-box-text">$25</p>
                        </div>
                        <div class="collection__main-info-box">
                            <h6 className="collection__main-info-box-title">Total</h6>
                            <p class="collection__main-info-box-text">$30</p>
                        </div>
                        <div className="collection__main-info-buttons">
                            <img
                                className="collection__main-info-buttons-open"
                                src={`./img/sections/collection/open-${theme}.svg`}
                                alt=""
                            />
                            <img
                                className="collection__main-info-buttons-repost"
                                src={`./img/sections/collection/repost-${theme}.svg`}
                                alt=""
                            />
                            <img
                                className="collection__main-info-buttons-flag"
                                src={`./img/sections/collection/flag-${theme}.svg`}
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="collection__main-people">
                        <div class="collection__main-people-owner">
                            <h6 class="collection__main-people-owner-title">Owner</h6>
                            <div class="collection__main-people-owner-left">
                                <img
                                    class="collection__main-people-owner-left-avatar"
                                    src="./img/sections/NFT/user.svg"
                                    alt=""
                                />
                                <p class="collection__main-people-owner-left-name">John Doe</p>
                            </div>
                            <img
                                class="collection__main-people-owner-arrow"
                                src={`./img/sections/collection/arrow-right-${theme}.svg`}
                                alt=""
                            />
                        </div>
                        <div class="collection__main-people-creator">
                            <h6 class="collection__main-people-creator-title">Creator</h6>
                            <div class="collection__main-people-creator-left">
                                <img
                                    class="collection__main-people-creator-left-avatar"
                                    src="./img/sections/NFT/user.svg"
                                    alt=""
                                />
                                <p class="collection__main-people-creator-left-name">John Doe</p>
                            </div>
                            <img
                                class="collection__main-people-creator-arrow"
                                src={`./img/sections/collection/arrow-right-${theme}.svg`}
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="collection__main-other">
                        <h6 className="collection__main-other-title">Other</h6>
                        <div class="collection__main-other-box">
                            <p class="collection__main-other-box-title">Contract Address</p>
                            <p class="collection__main-other-box-text">
                                {window.innerWidth <= 768
                                    ? "EQB0PAgMahaikkK..."
                                    : "EQB0PAgMahaikkKhqNXc8AR4o9sIDQgkyHYZUlcdOUHdxCkc"}
                            </p>
                            <img
                                class="collection__main-other-box-img"
                                src={`./img/sections/nft/arrow-extra-${theme}.svg`}
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="collection__main-graph">
                        <div class="collection__main-graph-up">
                            <h6 class="collection__main-graph-up-title">Graph</h6>
                            <div class="collection__main-graph-up-settings">
                                <button
                                    className={`collection__main-graph-up-settings-volume ${
                                        graphView === "volume"
                                            ? "collection__main-graph-up-settings-volume--active"
                                            : ""
                                    }`}
                                    onClick={() => setGraphView("volume")}>
                                    Volume
                                </button>
                                <button
                                    className={`collection__main-graph-up-settings-floor ${
                                        graphView === "floor" ? "collection__main-graph-up-settings-floor--active" : ""
                                    }`}
                                    onClick={() => setGraphView("floor")}>
                                    Floor price
                                </button>
                                <img
                                    className="collection__main-graph-up-settings-resize"
                                    src={`./img/sections/nft/resize-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <img
                            class="collection__main-graph-down"
                            src={`./img/sections/collection/graphic-${theme}.svg`}
                            alt=""
                        />
                    </div>
                    <div class="collection__main-cards">
                        <div class="collection__main-cards-options">
                            <div class="collection__main-cards-options-search">
                                <input
                                    placeholder="Search"
                                    type="text"
                                    class="collection__main-cards-options-search-input"
                                />
                                <img
                                    class="collection__main-cards-options-search-img"
                                    src={`./img/sections/collection/search-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                            <div class="collection__main-cards-options-checkboxes">
                                <Checkbox text={"Not for sale"} />
                                <Checkbox text={"Buy now"} />
                                <Checkbox text={"On auction"} />
                            </div>
                            <div class="collection__main-cards-options-filters">
                                <div
                                    class="collection__main-cards-options-filters-sort"
                                    onClick={() => setSortingPopup(!sortingPopup)}>
                                    {
                                        window.innerWidth <= 768 ? "Sort" : "Sorting: New"
                                    }
                                    {sortingPopup && (
                                        <ul className="collection__main-cards-options-filters-sort-popup">
                                            <li className="collection__main-cards-options-filters-sort-popup-item">
                                                Recently listed
                                            </li>
                                            <li className="collection__main-cards-options-filters-sort-popup-item">
                                                Recently created
                                            </li>
                                            <li className="collection__main-cards-options-filters-sort-popup-item">
                                                Recently sold
                                            </li>
                                            <li className="collection__main-cards-options-filters-sort-popup-item">
                                                Recently received
                                            </li>
                                        </ul>
                                    )}
                                    <img
                                        src={`./img/sections/collection/arrow-up-${theme}.svg`}
                                        alt=""
                                        style={{ transform: sortingPopup ? "rotate(-180deg)" : "rotate(0deg)" }}
                                    />
                                </div>
                                <div
                                    class="collection__main-cards-options-filters-price"
                                    onClick={() => setPricePopup(!pricePopup)}>
                                    
                                    {
                                        window.innerWidth <= 768 ? "Price" : "Price: Low to High"
                                    }
                                    {pricePopup && (
                                        <ul className="collection__main-cards-options-filters-price-popup">
                                            <li className="collection__main-cards-options-filters-price-popup-item">
                                                Hign to Low
                                            </li>
                                        </ul>
                                    )}
                                    <img
                                        src={`./img/sections/collection/arrow-up-${theme}.svg`}
                                        alt=""
                                        style={{ transform: pricePopup ? "rotate(-180deg)" : "rotate(0deg)" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="collection__main-cards-items">
                            <SimpleCard />
                            <SimpleCard />
                            <SimpleCard />
                            <SimpleCard />
                            <SimpleCard />
                            <SimpleCard />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Collection;
