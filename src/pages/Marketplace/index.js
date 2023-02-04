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
                            {filter === "collection" ? (
                                <>
                                    <CollectionCard />
                                    <CollectionCard />
                                    <CollectionCard />
                                </>
                            ) : (
                                <>
                                    <DefaultCard />
                                    <DefaultCard />
                                    <DefaultCard />
                                    <DefaultCard />
                                    <DefaultCard />
                                    <DefaultCard />
                                </>
                            )}
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
