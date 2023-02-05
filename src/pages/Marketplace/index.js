import "./Marketplace.scss";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import CollectionCard from "../../components/CollectionCard";
import DefaultCard from "../../components/DefaultCard";
import Filters from "../../components/Filters";

function Marketplace() {
    const [filter, setFilter] = useState("nft");
    const { theme, changeTheme } = useContext(ContextApp);
    const [sortingPopup, setSortingPopup] = useState(false);
    const [sortingCurrent, setSortingCurrent] = useState("Recently listed");
    const [pricePopup, setPricePopup] = useState(false);
    const [priceCurrent, setPriceCurrent] = useState("Low to High");

    const [filtersMobile, setFiltersMobile] = useState(false);
    const [sortMobile, setSortMobile] = useState(false);
    const [priceMobile, setPriceMobile] = useState(false);

    const [showMore, setShowMore] = useState(false);
    return (
        <>
            <Header currentPage={"marketplace"} />
            <section className="catalog" style={{ backgroundColor: changeTheme("#f4f6fa", "#15191E") }}>
                <h1 className="catalog__title" style={{ color: changeTheme("#000", "#fff") }}>
                    Catalog
                </h1>
                <div class="catalog__container">
                    <Filters />
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
                                            Recently listed
                                        </li>
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
                                        <li
                                            className="catalog__container-content-options-sorting-popup-item"
                                            onClick={e => setSortingCurrent(e.target.innerText)}>
                                            Recently received
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
                                    onClick={() => setFilter("nft")}
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
                                    onClick={() => setFilter("collection")}
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
                                                Recently listed
                                            </li>
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
                                            <li
                                                className="catalog__container-content-options-sorting-popup-item"
                                                onClick={e => setSortingCurrent(e.target.innerText)}>
                                                Recently received
                                            </li>
                                        </ul>
                                    )}
                                </button>
                                <button
                                    style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}
                                    onClick={() => setPricePopup(!pricePopup)}>
                                    Price: {priceCurrent}
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
                            {filter === "collection" ? (
                                <>
                                    <CollectionCard />
                                    <CollectionCard />
                                    <CollectionCard />
                                </>
                            ) : (
                                <>
                                    {!showMore ? (
                                        <>
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                        </>
                                    ) : <>
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                            <DefaultCard />
                                        </>}
                                </>
                            )}
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
