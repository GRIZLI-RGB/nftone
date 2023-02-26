import "./Marketplace.scss";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../Context";
import CollectionCard from "../../components/CollectionCard";
import DefaultCard from "../../components/DefaultCard";
import Filters from "../../components/Filters";

function Marketplace() {
    const [filter, setFilter] = useState("nft");
    const { theme, changeTheme, NFTs, collections, setNFTs, setCollections, filterStatus, filterQuantity, filterPriceAt, filterPriceTo, filterRarity, filterCategory, filterEmotional, setFilterStatus, setFilterQuantity, setFilterPriceAt, setFilterPriceTo, setFilterCategory, setFilterEmotional, setFilterRarity } =
        useContext(ContextApp);
    const [sortingPopup, setSortingPopup] = useState(false);
    const [sortingCurrent, setSortingCurrent] = useState("Recently created");
    const [pricePopup, setPricePopup] = useState(false);
    const [priceCurrent, setPriceCurrent] = useState("Low to High");

    const [filtersMobile, setFiltersMobile] = useState(false);
    const [sortMobile, setSortMobile] = useState(false);
    const [priceMobile, setPriceMobile] = useState(false);

    const [showMore, setShowMore] = useState(false);

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

    function resetFilters() {
        setFilterStatus("all");
        setFilterQuantity("all");
        setFilterPriceAt("");
        setFilterPriceTo("");
        setFilterRarity([]);
        setFilterEmotional();
        setFilterCategory([]);
    }

    return (
        <>
            <Header currentPage={"catalog"} />
            <section className="catalog" style={{ backgroundColor: changeTheme("#f4f6fa", "#15191E") }}>
                <h1 className="catalog__title" style={{ color: changeTheme("#000", "#fff") }}>
                    Catalog
                </h1>
                <div class="catalog__container">
                    {window.innerWidth > 768 && <Filters example={filter === "nft" ? "nft" : "collection"} />}
                    {window.innerWidth <= 768 && filtersMobile && <Filters example={filter === "nft" ? "nft" : "collection"}/>}
                    <div class="catalog__container-content">
                        <div
                            class="catalog__container-content-optionsMobile"
                            style={{ color: changeTheme("#000", "#fff") }}>
                            <button
                                class="catalog__container-content-optionsMobile-filters"
                                style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}
                                onClick={() => setFiltersMobile(!filtersMobile)}>
                                Filters
                                <img
                                    src={`./img/sections/catalog/arrow-${theme}.png`}
                                    alt=""
                                    style={{ transform: filtersMobile ? "rotate(180deg)" : "rotate(0deg)" }}
                                />
                            </button>
                            <button
                                class="catalog__container-content-optionsMobile-sort"
                                style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}
                                onClick={() => setSortMobile(!sortMobile)}>
                                Sort
                                <img
                                    src={`./img/sections/catalog/arrow-${theme}.png`}
                                    alt=""
                                    style={{ transform: sortMobile ? "rotate(180deg)" : "rotate(0deg)" }}
                                />
                                {sortMobile && (
                                    <ul className="catalog__container-content-options-sorting-popup">
                                        <li
                                            className="catalog__container-content-options-sorting-popup-item"
                                            onClick={e => setSortingCurrent(e.target.innerText)}>
                                            Recently created
                                        </li>
                                        <li
                                            className="catalog__container-content-options-sorting-popup-item"
                                            onClick={e => setSortingCurrent(e.target.innerText)}>
                                            Recently sold
                                        </li>
                                    </ul>
                                )}
                            </button>
                            <button
                                class="catalog__container-content-optionsMobile-price"
                                style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}
                                onClick={() => setPriceMobile(!priceMobile)}>
                                Price
                                <img
                                    src={`./img/sections/catalog/arrow-${theme}.png`}
                                    alt=""
                                    style={{ transform: priceMobile ? "rotate(180deg)" : "rotate(0deg)" }}
                                />
                                {priceMobile && (
                                    <ul className="catalog__container-content-options-sorting-popup">
                                        <li
                                            className="catalog__container-content-options-sorting-popup-item"
                                            onClick={e => setPriceCurrent(e.target.innerText)}>
                                            Low to High
                                        </li>
                                        <li
                                            className="catalog__container-content-options-sorting-popup-item"
                                            onClick={e => setPriceCurrent(e.target.innerText)}>
                                            High to Low
                                        </li>
                                    </ul>
                                )}
                            </button>
                        </div>
                        <div class="catalog__container-content-options">
                            <div class="catalog__container-content-options-categories">
                                <button
                                    onClick={() => {
                                        // resetFilters();
                                        setFilter("nft");
                                    }}
                                    className={`catalog__container-content-options-categories-nfts ${
                                        filter === "nft"
                                            ? "catalog__container-content-options-categories-nfts--active"
                                            : ""
                                    } ${
                                        filter !== "nft"
                                            ? "catalog__container-content-options-categories-nfts--hoverMe"
                                            : ""
                                    }`}
                                    style={{
                                        color: theme === "light" && filter !== "nft" ? "#000" : "#fff",
                                        background: theme === "light" ? "rgba(220, 220, 220, 0.5)" : "#2B3239",
                                    }}>
                                    NFTs
                                </button>
                                <button
                                    onClick={() => {
                                        // resetFilters();
                                        setFilter("collection");
                                    }}
                                    className={`catalog__container-content-options-categories-collections ${
                                        filter === "collection"
                                            ? "catalog__container-content-options-categories-collections--active"
                                            : ""
                                    } ${
                                        filter !== "collection"
                                            ? "catalog__container-content-options-categories-collections--hoverMe"
                                            : ""
                                    }`}
                                    style={{
                                        color: theme === "light" && filter !== "collection" ? "#000" : "#fff",
                                        background: theme === "light" ? "rgba(220, 220, 220, 0.5)" : "#2B3239",
                                    }}>
                                    Collections
                                </button>
                            </div>
                            <div
                                class="catalog__container-content-options-sorting"
                                style={{ color: changeTheme("#000", "#fff") }}>
                                <button
                                    style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}
                                    onClick={() => setSortingPopup(!sortingPopup)}>
                                    Sorting: {sortingCurrent}
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt=""
                                        style={{ transform: sortingPopup ? "rotate(-180deg)" : "rotate(0deg)" }}
                                    />
                                    {sortingPopup && (
                                        <ul className="catalog__container-content-options-sorting-popup">
                                            <li
                                                className="catalog__container-content-options-sorting-popup-item"
                                                onClick={e => setSortingCurrent(e.target.innerText)}>
                                                Recently created
                                            </li>
                                            <li
                                                className="catalog__container-content-options-sorting-popup-item"
                                                onClick={e => setSortingCurrent(e.target.innerText)}>
                                                {filter === "nft" ? "Recently sold" : "Most popular"}
                                            </li>
                                        </ul>
                                    )}
                                </button>
                                <button
                                    style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}
                                    onClick={() => setPricePopup(!pricePopup)}>
                                    {filter === "nft" ? "Price" : "Floor price"}: {priceCurrent}
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt=""
                                        style={{ transform: pricePopup ? "rotate(-180deg)" : "rotate(0deg)" }}
                                    />
                                    {pricePopup && (
                                        <ul className="catalog__container-content-options-sorting-popup">
                                            <li
                                                className="catalog__container-content-options-sorting-popup-item"
                                                onClick={e => setPriceCurrent(e.target.innerText)}>
                                                Low to High
                                            </li>
                                            <li
                                                className="catalog__container-content-options-sorting-popup-item"
                                                onClick={e => setPriceCurrent(e.target.innerText)}>
                                                High to Low
                                            </li>
                                        </ul>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div class="catalog__container-content-items">
                            {filter === "collection"
                                ? collections
                                .filter(collection => filterCategory.length === 0 ? collection : filterCategory.includes(collection.category))
                                .sort((a, b) => OneOrMinusOne(CompareSmiles(b), CompareSmiles(a)))
                                .sort((a, b) =>
                                          priceCurrent === "Low to High" ? a.price - b.price : b.price - a.price,
                                )
                                .sort((a, b) =>
                                          sortingCurrent === "Most popular" ? OneOrMinusOne(a.popular, b.popular) : OneOrMinusOne(b.popular, a.popular),
                                )
                                .map(collection => <CollectionCard collection={collection} />)
                                : NFTs.filter(nft =>
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
                                      .sort((a, b) => sortingCurrent === "Recently created" ? new Date(b.created) - new Date(a.created) : new Date(b.sold) - new Date(a.sold))
                                      .sort((a, b) =>
                                          priceCurrent === "Low to High" ? a.price - b.price : b.price - a.price,
                                      )
                                      .sort((a, b) => OneOrMinusOne(CompareSmiles(b), CompareSmiles(a)))
                                      .map(nft => <DefaultCard nft={nft} />)}
                        </div>
                        <div className="catalog__container-content-more">
                            <button
                                style={{
                                    borderColor: changeTheme("#004d8c", "#fff"),
                                    color: changeTheme("#004d8c", "#fff"),
                                }}
                                onClick={() => setShowMore(!showMore)}>
                                {!showMore ? "Show more" : "Hide"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Marketplace;
