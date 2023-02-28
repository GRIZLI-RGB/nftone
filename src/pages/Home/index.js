import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "../../components/Card";
import CollectionCard from "../../components/CollectionCard";
import "./Home.scss";
import { ContextApp } from "./../../Context";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

function Home() {
    const [popularNFT, setPopularNFT] = useState([]);
    const [popularCollection, setPopularCollection] = useState([]);

    const [recentNFT, setRecentNFT] = useState([]);
    const [recentCollection, setRecentCollection] = useState([]);

    const [isLoadingPopular, setIsLoadingPopular] = useState(true);
    const [isLoadingRecent, setIsLoadingRecent] = useState(true);

    const [popularFilter, setPopularFilter] = useState("nft");
    const [recentFilter, setRecentFilter] = useState("nft");

    const { changeTheme } = useContext(ContextApp);

    const settingsForSlider = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    // Получение с сервера Popular NFTs
    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/nfts/list",
                {
                    order_by: "most_popular desc",
                    subqueries: {
                        img: {}
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
                setPopularNFT(response.data.items);
                setIsLoadingPopular(false);
            })
            .catch(error => {
                console.log("Ошибка при получении Popular NFTs:", error);
            });
    }, [])

    // Получение с сервера Recent NFTs
    useEffect(() => {
        axios
            .post(
                "https://nft-one.art/api/nfts/list",
                {
                    order_by: "most_popular desc",
                    subqueries: {
                        img: {}
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
                setPopularNFT(response.data.items);
                setIsLoadingPopular(false);
            })
            .catch(error => {
                console.log("Ошибка при получении Popular NFTs:", error);
            });
    }, [])

    useEffect(() => {
        popularFilter === "collection" ? setIsLoadingPopular(true) : setIsLoadingPopular(false);
    }, [popularFilter])

    useEffect(() => {
        recentFilter === "collection" ? setIsLoadingRecent(true) : setIsLoadingRecent(false);
    }, [recentFilter])

    return (
        <>
            <Header currentPage={"zero"} />
            <section className={`welcome ${changeTheme("", "welcome--dark")}`}>
                <div class="welcome__bg"></div>
                <div className="welcome__info">
                    <h1 className="welcome__info-title">Discover, and collect Digital Art NFTs</h1>
                    <p className="welcome__info-text">
                        Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, Sell, and
                        discover exclusive digital assets.
                    </p>
                    <button className="welcome__info-btn" id="popular-btn">
                        Explore Now
                    </button>
                </div>
                <div className="welcome__library">
                    <div className="welcome__library-item welcome__library-item-1">
                        <img className="welcome__library-item-bg" src="./img/card/card-bg.svg" alt="Card background" />
                        <h6 className="welcome__library-item-title">Abstr Gradient NFT</h6>
                        <div className="welcome__library-item-user">
                            <img
                                className="welcome__library-item-user-avatar"
                                src="./img/card/avatar-big.png"
                                alt="Avatar"
                            />
                            <p className="welcome__library-item-user-name">Arkhan17</p>
                        </div>
                        <div class="welcome__library-item-info">
                            <div class="welcome__library-item-info-left">
                                <p class="welcome__library-item-info-left-label">Current Bid</p>
                                <p class="welcome__library-item-info-left-price">0.25 TON</p>
                            </div>
                            <div class="welcome__library-item-info-right">
                                <p class="welcome__library-item-info-right-label">Ends in</p>
                                <p class="welcome__library-item-info-right-time">12h 43m 42s</p>
                            </div>
                        </div>
                    </div>
                    <div className="welcome__library-item welcome__library-item-2">
                        <img className="welcome__library-item-bg" src="./img/card/card-bg.svg" alt="Card background" />
                        <h6 className="welcome__library-item-title">Abstr Gradient NFT</h6>
                        <div className="welcome__library-item-user">
                            <img
                                className="welcome__library-item-user-avatar"
                                src="./img/card/avatar-big.png"
                                alt="Avatar"
                            />
                            <p className="welcome__library-item-user-name">Arkhan17</p>
                        </div>
                        <div class="welcome__library-item-info">
                            <div class="welcome__library-item-info-left">
                                <p class="welcome__library-item-info-left-label">Current Bid</p>
                                <p class="welcome__library-item-info-left-price">0.25 TON</p>
                            </div>
                            <div class="welcome__library-item-info-right">
                                <p class="welcome__library-item-info-right-label">Ends in</p>
                                <p class="welcome__library-item-info-right-time">12h 43m 42s</p>
                            </div>
                        </div>
                    </div>
                    <div className="welcome__library-item welcome__library-item-3">
                        <img className="welcome__library-item-bg" src="./img/card/card-bg.svg" alt="Card background" />
                        <h6 className="welcome__library-item-title">Abstr Gradient NFT</h6>
                        <div className="welcome__library-item-user">
                            <img
                                className="welcome__library-item-user-avatar"
                                src="./img/card/avatar-big.png"
                                alt="Avatar"
                            />
                            <p className="welcome__library-item-user-name">Arkhan17</p>
                        </div>
                        <div class="welcome__library-item-info">
                            <div class="welcome__library-item-info-left">
                                <p class="welcome__library-item-info-left-label">Current Bid</p>
                                <p class="welcome__library-item-info-left-price">0.25 TON</p>
                            </div>
                            <div class="welcome__library-item-info-right">
                                <p class="welcome__library-item-info-right-label">Ends in</p>
                                <p class="welcome__library-item-info-right-time">12h 43m 42s</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="welcome__libraryMobile">
                    <div className="welcome__libraryMobile-item welcome__libraryMobile-item-1">
                        <img
                            className="welcome__libraryMobile-item-bg"
                            src="./img/card/card-bg.svg"
                            alt="Card background"
                        />
                        <h6 className="welcome__libraryMobile-item-title">Abstr Gradient NFT</h6>
                        <div className="welcome__libraryMobile-item-user">
                            <img
                                className="welcome__libraryMobile-item-user-avatar"
                                src="./img/card/avatar-big.png"
                                alt="Avatar"
                            />
                            <p className="welcome__libraryMobile-item-user-name">Arkhan17</p>
                        </div>
                        <div class="welcome__libraryMobile-item-info">
                            <div class="welcome__libraryMobile-item-info-left">
                                <p class="welcome__libraryMobile-item-info-left-label">Current Bid</p>
                                <p class="welcome__libraryMobile-item-info-left-price">0.25 TON</p>
                            </div>
                            <div class="welcome__libraryMobile-item-info-right">
                                <p class="welcome__libraryMobile-item-info-right-label">Ends in</p>
                                <p class="welcome__libraryMobile-item-info-right-time">12h 43m 42s</p>
                            </div>
                        </div>
                    </div>
                    <div className="welcome__libraryMobile-item welcome__libraryMobile-item-2">
                        <img
                            className="welcome__libraryMobile-item-bg"
                            src="./img/card/card-bg.svg"
                            alt="Card background"
                        />
                        <h6 className="welcome__libraryMobile-item-title">Abstr Gradient NFT</h6>
                        <div className="welcome__libraryMobile-item-user">
                            <img
                                className="welcome__libraryMobile-item-user-avatar"
                                src="./img/card/avatar-big.png"
                                alt="Avatar"
                            />
                            <p className="welcome__libraryMobile-item-user-name">Arkhan17</p>
                        </div>
                        <div class="welcome__libraryMobile-item-info">
                            <div class="welcome__libraryMobile-item-info-left">
                                <p class="welcome__libraryMobile-item-info-left-label">Current Bid</p>
                                <p class="welcome__libraryMobile-item-info-left-price">0.25 TON</p>
                            </div>
                            <div class="welcome__libraryMobile-item-info-right">
                                <p class="welcome__libraryMobile-item-info-right-label">Ends in</p>
                                <p class="welcome__libraryMobile-item-info-right-time">12h 43m 42s</p>
                            </div>
                        </div>
                    </div>
                    <div className="welcome__libraryMobile-item welcome__libraryMobile-item-3">
                        <img
                            className="welcome__libraryMobile-item-bg"
                            src="./img/card/card-bg.svg"
                            alt="Card background"
                        />
                        <h6 className="welcome__libraryMobile-item-title">Abstr Gradient NFT</h6>
                        <div className="welcome__libraryMobile-item-user">
                            <img
                                className="welcome__libraryMobile-item-user-avatar"
                                src="./img/card/avatar-big.png"
                                alt="Avatar"
                            />
                            <p className="welcome__libraryMobile-item-user-name">Arkhan17</p>
                        </div>
                        <div class="welcome__libraryMobile-item-info">
                            <div class="welcome__libraryMobile-item-info-left">
                                <p class="welcome__libraryMobile-item-info-left-label">Current Bid</p>
                                <p class="welcome__libraryMobile-item-info-left-price">0.25 TON</p>
                            </div>
                            <div class="welcome__libraryMobile-item-info-right">
                                <p class="welcome__libraryMobile-item-info-right-label">Ends in</p>
                                <p class="welcome__libraryMobile-item-info-right-time">12h 43m 42s</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="popular-section"
                className={`popular ${changeTheme("", "popular--dark")} ${
                    popularFilter === "nft" ? "popular--nft" : ""
                }`}>
                <h2 class="popular__title">Popular NFTs</h2>
                <div class="popular__categories">
                    <button
                        onClick={() => setPopularFilter("nft")}
                        className={`popular__categories-nfts ${
                            popularFilter === "nft" ? "popular__categories-nfts--active" : ""
                        }`}>
                        NFTs
                    </button>
                    <button
                        onClick={() => setPopularFilter("collection")}
                        className={`popular__categories-collections ${
                            popularFilter === "collection" ? "popular__categories-collections--active" : ""
                        }`}>
                        Collections
                    </button>
                </div>

                {(isLoadingPopular) ? (
                    <Skeleton height="24.21vw" style={{marginTop: "47px"}} count={1} />
                ) : (
                    <Slider class="popular__list" {...settingsForSlider}>
                        {popularFilter === "nft"
                            ? popularNFT.map(nft => <Card nft={nft} />)
                            : popularCollection.map(collection => <CollectionCard collection={collection} />)}
                    </Slider>
                )}
            </section>
            <section className={`recent ${changeTheme("", "recent--dark")}`}>
                <div class="recent__bg"></div>
                <h2 class="recent__title">Recent added</h2>
                <div class="recent__categories">
                    <button
                        className={`recent__categories-nfts ${
                            recentFilter === "nft" ? "recent__categories-nfts--active" : ""
                        }`}
                        onClick={() => setRecentFilter("nft")}>
                        NFTs
                    </button>
                    <button
                        className={`recent__categories-collections ${
                            recentFilter === "collection" ? "recent__categories-collections--active" : ""
                        }`}
                        onClick={() => setRecentFilter("collection")}>
                        Collections
                    </button>
                </div>
                {isLoadingRecent ? (
                    <Skeleton height="24.21vw" style={{marginTop: "47px"}} count={1} />
                ) : (
                    <Slider class="popular__list" {...settingsForSlider}>
                        {recentFilter === "nft"
                            ? popularNFT.map(nft => <Card nft={nft} />)
                            : popularCollection.map(collection => <CollectionCard collection={collection} />)}
                    </Slider>
                )}
                <div class="recent__all">
                    <a href="/marketplace" className="recent__all-btn">
                        View all
                    </a>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;
