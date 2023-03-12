import "./Catalog.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../Context";
import CollectionCard from "../../components/CollectionCard";
import DefaultCard from "../../components/DefaultCard";
import Filters from "../../components/Filters";
import axios from "axios";

function Catalog() {
    const { theme, changeTheme, filterStatus, filterQuantity, filterPriceAt, filterPriceTo, filterRarity, filterCategory, filterEmotional, setFilterStatus, setFilterQuantity, setFilterPriceAt, setFilterPriceTo, setFilterCategory, setFilterEmotional, setFilterRarity } =
        useContext(ContextApp);

    const [filter, setFilter] = useState("nft");
    const [sortingPopup, setSortingPopup] = useState(false);
    const [sortingCurrent, setSortingCurrent] = useState("Recently created");
    const [pricePopup, setPricePopup] = useState(false);
    const [priceCurrent, setPriceCurrent] = useState("Low to High");

    const [filtersMobile, setFiltersMobile] = useState(false);
    const [sortMobile, setSortMobile] = useState(false);
    const [priceMobile, setPriceMobile] = useState(false);

    const [showMore, setShowMore] = useState(false);

    const [NFTs, setNFTs] = useState([]);
    const [collections, setCollections] = useState([]);

    const [currentUser, setCurrentUser] = useState({});

    const [currentSort, setCurrentSort] = useState("");

    function OneOrMinusOne(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    }

    function checkScore(nft) {
        let typeIDs = [];
        let score = 0;
        filterEmotional?.map((emot) => (
            emot === "Red Heart"
                ? typeIDs.push("1")
                : emot === "Rolling on the Floor Laughing"
                ? typeIDs.push("2")
                : emot === "Smiling Face with Heart-Eyes"
                ? typeIDs.push("3")
                : emot === "Enraged Face"
                ? typeIDs.push("4")
                : emot === "Weary Cat"
                ? typeIDs.push("5")
                : emot === "Woozy Face"
                ? typeIDs.push("6")
                : emot === "Money-Mouth Face"
                ? typeIDs.push("7")
                : null
            )
        );
        if(nft.likes.length > 0) {
            nft.likes.map(like => {
                    if(typeIDs.includes(like.type_id)) {
                        score += 1;
                    }
                }
            )
        }
        return score;
    }

    useEffect(() => {
        if(localStorage.getItem("auth").toString() === "true") {
            axios
                .post(
                    "https://nft-one.art/api/auth/current",
                    {
                    },
                    {
                        headers: {
                            Token: localStorage.getItem("tonkeeperToken") ? localStorage.getItem("tonkeeperToken") : localStorage.getItem("tonhubToken")
                        },
                        auth: {
                            username: "odmen",
                            password: "NFTflsy",
                        },
                    },
                )
                .then(response => {
                    setCurrentUser(response.data.user);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [])

    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/batch",
                {
                    "nfts": {
                        "action": "nfts/list",
                        subqueries: {
                            img: {},
                            likes: {},
                            creator: {
                                subqueries: {
                                    img: {}
                                }
                            }
                        },
                    },
                    "collections": {
                        "action": "nft_collections/list",
                        subqueries: {
                            likes: {},
                            img: {},
                            creator: {
                                subqueries: {
                                    img: {}
                                }
                            }
                        },
                    },
                },
                {
                    auth: {
                        username: "odmen",
                        password: "NFTflsy",
                    },
                },
            )
            .then(response => {
                setNFTs(response.data.nfts.items);
                setCollections(response.data.collections.items);
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

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
                                        setFilter("nft");
                                        setCurrentSort("");
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
                                        setFilter("collection");
                                        setCurrentSort("");
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
                                                onClick={e => {
                                                    setSortingCurrent(e.target.innerText)
                                                    setCurrentSort("Sorting");
                                                }}>
                                                Recently created
                                            </li>
                                            <li
                                                className="catalog__container-content-options-sorting-popup-item"
                                                onClick={e => {
                                                    setSortingCurrent(e.target.innerText)
                                                    setCurrentSort("Sorting");
                                                }}>
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
                                                onClick={e => {setPriceCurrent(e.target.innerText)
                                                    setCurrentSort("Price")
                                                }}>
                                                Low to High
                                            </li>
                                            <li
                                                className="catalog__container-content-options-sorting-popup-item"
                                                onClick={e => {setPriceCurrent(e.target.innerText)
                                                    setCurrentSort("Price")}}>
                                                High to Low
                                            </li>
                                        </ul>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div class="catalog__container-content-items">
                            {/* {filter === "collection"
                                ? collections
                                .sort((a, b) =>
                                          sortingCurrent === "Most popular" ? OneOrMinusOne(a.popular, b.popular) : OneOrMinusOne(b.popular, a.popular),
                                )
                                .map(collection => <CollectionCard collection={collection} />)
                                : NFTs
                                      .filter(nft => filterRarity.length === 0 ? nft : filterRarity.includes(nft.rarity))
                                      .map(nft => <DefaultCard nft={nft} />)} */}
                                      {filter === "collection"
                                ? collections
                                .filter(collection => {
                                            if (filterCategory.length === 0) {
                                                return collection
                                            } else {
                                                let flag = false;
                                                if(collection?.categories) {
                                                    collection.categories.map(cat =>
                                                    filterCategory.includes(cat.toLowerCase()) ? (flag = true) : null,
                                                );
                                                }
                                                return flag;
                                            }
                                })
                                .sort((a, b) => currentSort === "Price" ? (priceCurrent === "Low to High"
                                                ? Number(a.price) - Number(b.price)
                                                : Number(b.price) - Number(a.price)) : currentSort === "Sorting" ? (sortingCurrent === "Recently created" ? (Number(a.add_time) - Number(b.add_time))  : (Number(b.add_time) - Number(a.add_time))) : 0)
                                .sort((a, b) => {
                                    return OneOrMinusOne(checkScore(b), checkScore(a));
                                })
                                .map(collection => <CollectionCard collection={collection} />)
                                : NFTs
                                .filter(nft =>
                                      filterStatus === "all"
                                          ? nft
                                          : filterStatus === "Buy now"
                                          ? nft.state === "sale"
                                          : nft.state === "auction",
                                  )
                                .filter(nft =>
                                          filterQuantity === "all"
                                              ? nft
                                              : filterQuantity === "single"
                                              ? nft.collection_id == null
                                              : nft.collection_id != null,
                                )
                                .filter(nft =>
                                      filterPriceAt !== "" ? Number(nft.price) >= filterPriceAt : nft,
                                )
                                .filter(nft =>
                                            filterPriceTo !== "" ? Number(nft.price) <= filterPriceTo : nft,
                                )
                                .filter(nft => {
                                            if (filterCategory.length === 0) {
                                                return nft
                                            } else {
                                                let flag = false;
                                                if(nft?.categories) {
                                                    nft.categories.map(cat =>
                                                    filterCategory.includes(cat.toLowerCase()) ? (flag = true) : null,
                                                );
                                                }
                                                return flag;
                                            }
                                })
                                .sort((a, b) => currentSort === "Price" ? (priceCurrent === "Low to High"
                                                ? Number(a.price) - Number(b.price)
                                                : Number(b.price) - Number(a.price)) : currentSort === "Sorting" ? (sortingCurrent === "Recently created" ? (Number(a.add_time) - Number(b.add_time))  : 0) : 0)
                                .sort((a, b) => {
                                    return OneOrMinusOne(checkScore(b), checkScore(a));
                                })
                                .map((nft, index) => {
                                    return <DefaultCard nft={nft} currentUser={currentUser} key={index}/>
                                })}
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

export default Catalog;
