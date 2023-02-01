import "./Marketplace.scss";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Checkbox from "../../components/Checkbox";
import Radiobutton from "../../components/Radiobutton";
import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import CollectionCard from "../../components/CollectionCard";
import DefaultCard from "../../components/DefaultCard";

function Marketplace() {
    const [filter, setFilter] = useState("nft");
    const [popups, setPopups] = useState([true, true, true, true, true, true]);
    const { theme, changeTheme } = useContext(ContextApp);
    const categories = [
        "Art",
        "Collectibles",
        "Music",
        "Photography",
        "Sports",
        "Trading",
        "Cards",
        "Utility",
        "Virtual",
        "Worlds",
    ];
    return (
        <>
            <Header currentPage={"marketplace"} />
            <section className="catalog" style={{ backgroundColor: changeTheme("#f4f6fa", "#15191E") }}>
                <h1 className="catalog__title" style={{ color: changeTheme("#000", "#fff") }}>
                    Catalog
                </h1>
                <div class="catalog__container">
                    <div
                        class="catalog__container-filters"
                        style={{ backgroundColor: changeTheme("#fff", "#1C2026"), color: changeTheme("#000", "#fff") }}>
                        <div class="catalog__container-filters-status">
                            <div onClick={() => setPopups([!popups[0], popups[1], popups[2], popups[3], popups[4], popups[5]])}>
                                <h6>Status</h6>
                                {popups[0] ? (
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                                ) : (
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt="Arrow"
                                        style={{ transform: "rotate(-90deg) translateX(30%)" }}
                                    />
                                )}
                            </div>
                            {popups[0] && (
                                <div>
                                    <Checkbox text={"Buy Now"} />
                                    <Checkbox text={"On Auction"} />
                                </div>
                            )}
                        </div>
                        <div class="catalog__container-filters-quantity">
                            <div onClick={() => setPopups([popups[0], !popups[1], popups[2], popups[3], popups[4], popups[5]])}>
                                <h6>Quantity</h6>
                                {popups[1] ? (
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                                ) : (
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt="Arrow"
                                        style={{ transform: "rotate(-90deg) translateX(30%)" }}
                                    />
                                )}
                            </div>
                            {popups[1] && (
                                <div>
                                    <Radiobutton text={"All items"} group={"quantity"} />
                                    <Radiobutton text={"Single items"} group={"quantity"} />
                                    <Radiobutton text={"Bundles"} group={"quantity"} />
                                </div>
                            )}
                        </div>
                        <div class="catalog__container-filters-price">
                            <div onClick={() => setPopups([popups[0], popups[1], !popups[2], popups[3], popups[4], popups[5]])}>
                                <h6>Price range</h6>
                                {popups[2] ? (
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                                ) : (
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt="Arrow"
                                        style={{ transform: "rotate(-90deg) translateX(30%)" }}
                                    />
                                )}
                            </div>
                            {popups[2] && (
                                <div className="catalog__container-filters-price-content">
                                    <div>
                                        <p>From</p>
                                        <input type="number" />
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <input type="number" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div class="catalog__container-filters-rarity">
                            <div onClick={() => setPopups([popups[0], popups[1], popups[2], !popups[3], popups[4], popups[5]])}>
                                <h6>Rarity rank</h6>
                                {popups[3] ? (
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                                ) : (
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt="Arrow"
                                        style={{ transform: "rotate(-90deg) translateX(30%)" }}
                                    />
                                )}
                            </div>
                            {popups[3] && (
                                <>
                                    <Checkbox text={"Mutant Hound Collar"} />
                                    <Checkbox text={"Mega Collar"} />
                                </>
                            )}
                        </div>
                        <div class="catalog__container-filters-emotional">
                            <div onClick={() => setPopups([popups[0], popups[1], popups[2], popups[3], !popups[4], popups[5]])}>
                                <h6>The most emotional</h6>
                                {popups[4] ? (
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                                ) : (
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt="Arrow"
                                        style={{ transform: "rotate(-90deg) translateX(30%)" }}
                                    />
                                )}
                            </div>
                            {popups[4] && (
                                <>
                                    <Checkbox text={"Mutant Hound Collar"} />
                                    <Checkbox text={"Mega Collar"} />
                                </>
                            )}
                        </div>
                        <div class="catalog__container-filters-category">
                            <div onClick={() => setPopups([popups[0], popups[1], popups[2], popups[3], popups[4], !popups[5]])}>
                                <h6>Category</h6>
                                {popups[5] ? (
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                                ) : (
                                    <img
                                        src={`./img/sections/catalog/arrow-${theme}.png`}
                                        alt="Arrow"
                                        style={{ transform: "rotate(-90deg) translateX(30%)" }}
                                    />
                                )}
                            </div>
                            {popups[5] && (
                                <div>
                                    {categories.map(category => (
                                        <Checkbox text={category} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="catalog__container-filters-apply">Apply filters</button>
                    </div>
                    <div class="catalog__container-content">
                        <div
                            class="catalog__container-content-optionsMobile"
                            style={{ color: changeTheme("#000", "#fff") }}>
                            <button
                                class="catalog__container-content-optionsMobile-filters"
                                style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}>
                                Filters
                                <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="" />
                            </button>
                            <button
                                class="catalog__container-content-optionsMobile-sort"
                                style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}>
                                Sort
                                <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="" />
                            </button>
                            <button
                                class="catalog__container-content-optionsMobile-price"
                                style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}>
                                Price
                                <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="" />
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
                                <button style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}>
                                    Sorting: Recenly Listed
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="" />
                                </button>
                                <button style={{ backgroundColor: changeTheme("rgba(220, 220, 220, 0.5)", "#2b3239") }}>
                                    Price: Low to High
                                    <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="" />
                                </button>
                            </div>
                        </div>
                        <div class="catalog__container-content-items">
                            <CollectionCard />
                            <CollectionCard />
                            <CollectionCard />
                            <DefaultCard />
                            <DefaultCard />
                            <DefaultCard />
                            <DefaultCard />
                            <DefaultCard />
                        </div>
                        <div className="catalog__container-content-more">
                            <button
                                style={{
                                    borderColor: changeTheme("#004d8c", "#fff"),
                                    color: changeTheme("#004d8c", "#fff"),
                                }}>
                                Show more
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
