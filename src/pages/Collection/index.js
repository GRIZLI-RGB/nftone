import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ContextApp } from "../../Context";
import "./Collection.scss";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import Checkbox from "../../components/Checkbox";
import Filters from "../../components/Filters";
import SimpleCard from "../../components/SimpleCard";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const optionsVolumeAndFloor = {
    responsive: true,
    maintainAspectRatio: false,
};

export const dataVolume = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            data: [26.8, 27, 27.9, 26.5, 26.3, 26.8, 26.1],
            borderColor: "#004d8C",
            backgroundColor: "#004d8C",
            tension: 0.5,
            pointRadius: 0,
        },
    ],
};

export const dataFloor = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
        {
            data: [25.8, 23, 26.4, 24.5],
            borderColor: "#004d8C",
            backgroundColor: "#004d8C",
            tension: 0.5,
            pointRadius: 0,
        },
    ],
};

function Collection() {
    const { theme, changeTheme, filterStatus, filterQuantity, filterCategory, filterPriceAt, filterPriceTo, filterRarity, filterEmotional } = useContext(ContextApp);
    const [graphView, setGraphView] = useState("volume");
    const [sortingCurrent, setSortingCurrent] = useState("Recently created");
    const [sortingPopup, setSortingPopup] = useState(false);
    const [priceCurrent, setPriceCurrent] = useState("Low to High");
    const [pricePopup, setPricePopup] = useState(false);
    const [graphPopup, setGraphPopup] = useState(false);
    const [checkes, setCheckes] = useState([]);
    const [filtersMobile, setFiltersMobile] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [NFTs, setNFTs] = useState([]);

    function addOrRemoveCheck(status) {
        if (checkes.includes(status)) {
            setCheckes(checkes.filter(rar => rar !== status));
        } else {
            setCheckes([...checkes, status]);
        }
    }

    function OneOrMinusOne(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    }

    function CompareSmiles(elem) {
        let score = 0;
        filterEmotional?.forEach((emot) => {
            if(emot === "Red Heart") {
                score += elem.emotions[0];
            }
            if(emot === "Rolling on the Floor Laughing") {
                score += elem.emotions[1];
            }
            if(emot === "Smiling Face with Heart-Eyes") {
                score += elem.emotions[2];
            }
            if(emot === "Enraged Face") {
                score += elem.emotions[3];
            }
            if(emot === "Weary Cat") {
                score += elem.emotions[4];
            }
            if(emot === "Woozy Face") {
                score += elem.emotions[5];
            }
            if(emot === "Money-Mouth Face") {
                score += elem.emotions[6];
            }
        })
        return score;
    }

    useEffect(() => {
        fetch("/nfts.json")
            .then(res => {
                return res.json();
            })
            .then(json => {
                setNFTs(json);
            });
    }, []);

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
                {
                    window.innerWidth <= 768 ? filtersMobile && <Filters /> : <Filters />
                }
                <button className="collection__filtersMobile" onClick={() => setFiltersMobile(!filtersMobile)}>
                    Filters
                    <img src={`./img/sections/collection/filters-${theme}.svg`} alt="" />
                </button>
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
                                    onClick={() => setGraphPopup(!graphPopup)}
                                />
                            </div>
                        </div>
                        <div className="collection__main-graph-down">
                            {graphView === "volume" ? (
                                <Line options={optionsVolumeAndFloor} data={dataVolume} />
                            ) : (
                                <Line options={optionsVolumeAndFloor} data={dataFloor} />
                            )}
                        </div>
                    </div>
                    <div class="collection__main-cards">
                        <div class="collection__main-cards-options">
                            <div class="collection__main-cards-options-search">
                                <input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
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
                                <Checkbox text={"Not for sale"} onClick={(e) => addOrRemoveCheck(e.target.innerText)} />
                                <Checkbox text={"Buy now"} onClick={(e) => addOrRemoveCheck(e.target.innerText)} />
                                <Checkbox text={"On auction"} onClick={(e) => addOrRemoveCheck(e.target.innerText)} />
                            </div>
                            <div class="collection__main-cards-options-filters">
                                <div
                                    class="collection__main-cards-options-filters-sort"
                                    onClick={() => setSortingPopup(!sortingPopup)}>
                                    {window.innerWidth <= 768 ? "Sort" : `Sorting: ${sortingCurrent}`}
                                    {sortingPopup && (
                                        <ul className="collection__main-cards-options-filters-sort-popup">
                                            <li className="collection__main-cards-options-filters-sort-popup-item" onClick={(e) => setSortingCurrent(e.target.innerText)}>
                                                Recently created
                                            </li>
                                            <li className="collection__main-cards-options-filters-sort-popup-item" onClick={(e) => setSortingCurrent(e.target.innerText)}>
                                                Recently sold
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
                                    {window.innerWidth <= 768 ? "Price" : `Price: ${priceCurrent}`}
                                    {pricePopup && (
                                        <ul className="collection__main-cards-options-filters-price-popup">
                                            <li className="collection__main-cards-options-filters-price-popup-item" onClick={(e) => setPriceCurrent(e.target.innerText)} >
                                                Low to High
                                            </li>
                                            <li className="collection__main-cards-options-filters-price-popup-item" onClick={(e) => setPriceCurrent(e.target.innerText)}>
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
                            {NFTs
                            .filter(nft =>
                                searchQuery !== "" ? nft.name.toLowerCase().includes(searchQuery.toLowerCase()) : nft,
                            )
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
                            .filter(nft => filterPriceAt !== "" ? nft.price >= filterPriceAt : nft)
                            .filter(nft => filterPriceTo !== "" ? nft.price <= filterPriceTo : nft)
                            .filter(nft => filterRarity.length === 0 ? nft : filterRarity.includes(nft.rarity))
                            .filter(nft => filterCategory.length === 0 ? nft : filterCategory.includes(nft.category))
                            .filter(nft => checkes.length === 0 ? nft : checkes.includes(nft.collectionDo))
                            .sort((a, b) => sortingCurrent === "Recently created" ? new Date(b.created) - new Date(a.created) : new Date(b.sold) - new Date(a.sold))
                            .sort((a, b) =>
                                          priceCurrent === "Low to High" ? a.price - b.price : b.price - a.price,
                                      )
                            .sort((a, b) => OneOrMinusOne(CompareSmiles(b), CompareSmiles(a)))
                            .map(nft => (
                                <SimpleCard nft={nft} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {graphPopup && (
                <div
                    className="graph-popup"
                    onClick={e => e.target.getAttribute("class") === "graph-popup" && setGraphPopup(!graphPopup)}>
                    <div className="graph-popup-two">
                        {graphView === "volume" ? (
                            <Line options={optionsVolumeAndFloor} data={dataVolume} />
                        ) : (
                            <Line options={optionsVolumeAndFloor} data={dataFloor} />
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Collection;
