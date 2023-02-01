import { useContext, useState } from "react";
import Slider from "react-slick";
import Card from "../../components/Card";
import "./Home.scss";
import { ContextApp } from "./../../Context";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";

function Home() {
    const [popularFilter, setPopularFilter] = useState("nft");
    const [recentFilter, setRecentFilter] = useState("nft");
    const { theme } = useContext(ContextApp);
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
    return (
        <>
            <Header currentPage={"zero"} />
            <section className="welcome" style={{ background: theme === "light" ? "rgba(217, 224, 236, 0.3)" : "#15191E" }}>
                <div class="welcome__bg" style={{ display: theme === "light" ? "none" : "block" }}></div>
                <div className="welcome__info">
                    <h1 className="welcome__info-title" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                        Discover, and collect Digital Art NFTs
                    </h1>
                    <p className="welcome__info-text" style={{ color: theme === "light" ? "#565656" : "#fff" }}>
                        Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, Sell, and
                        discover exclusive digital assets.
                    </p>
                    <button className="welcome__info-btn">Explore Now</button>
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
                className="popular"
                style={{ background: theme === "light" ? "#fff" : "#15191E" }}>
                <h2 class="popular__title" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                    Popular NFTs
                </h2>
                <div class="popular__categories">
                    <button
                        onClick={() => setPopularFilter("nft")}
                        className={`popular__categories-nfts ${
                            popularFilter === "nft" ? "popular__categories-nfts--active" : ""
                        } ${popularFilter !== "nft" ? "popular__categories-nfts--hoverMe" : ""}`}
                        style={{
                            color: theme === "light" && popularFilter !== "nft" ? "#000" : "#fff",
                            background: theme === "light" ? "rgba(220, 220, 220, 0.5)" : "#2B3239",
                        }}>
                        NFTs
                    </button>
                    <button
                        onClick={() => setPopularFilter("collection")}
                        className={`popular__categories-collections ${
                            popularFilter === "collection" ? "popular__categories-collections--active" : ""
                        } ${popularFilter !== "collection" ? "popular__categories-collections--hoverMe" : ""}`}
                        style={{
                            color: theme === "light" && popularFilter !== "collection" ? "#000" : "#fff",
                            background: theme === "light" ? "rgba(220, 220, 220, 0.5)" : "#2B3239",
                        }}>
                        Collections
                    </button>
                </div>
                <Slider class="popular__list" {...settingsForSlider}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                        <Card />
                    ))}
                </Slider>
            </section>
            <section
                className="recent"
                style={{
                    background:
                        theme === "light"
                            ? "conic-gradient(from 138.04deg at 49.21% 52.37%,#2442ad 0deg,#2240e0 105.21deg,#1fbdeb 203.25deg,#f39475 313.87deg,#2442ad 360deg)"
                            : "#15191E",
                }}>
                <div class="recent__bg"></div>
                <h2 class="recent__title">Recent added</h2>
                <div class="recent__categories">
                    <button
                        className={`recent__categories-nfts ${
                            recentFilter === "nft" ? "recent__categories-nfts--active" : ""
                        } ${recentFilter !== "nft" ? "recent__categories-nfts--hoverMe" : ""}`}
                        onClick={() => setRecentFilter("nft")}
                        style={{
                            color:
                                theme === "light" && recentFilter !== "nft"
                                    ? "#fff"
                                    : theme === "dark" && recentFilter !== "nft"
                                    ? "#fff"
                                    : "#000",
                            background:
                                theme === "light" && recentFilter !== "nft"
                                    ? "#ff4500"
                                    : theme === "dark" && recentFilter !== "nft"
                                    ? "#2B3239"
                                    : "#fff",
                        }}>
                        NFTs
                    </button>
                    <button
                        className={`recent__categories-collections ${
                            recentFilter === "collection" ? "recent__categories-collections--active" : ""
                        } ${recentFilter !== "collection" ? "recent__categories-collections--hoverMe" : ""}`}
                        onClick={() => setRecentFilter("collection")}
                        style={{
                            color:
                                theme === "light" && recentFilter !== "collection"
                                    ? "#fff"
                                    : theme === "dark" && recentFilter !== "collection"
                                    ? "#fff"
                                    : "#000",
                            background:
                                theme === "light" && recentFilter !== "collection"
                                    ? "#ff4500"
                                    : theme === "dark" && recentFilter !== "collection"
                                    ? "#2B3239"
                                    : "#fff",
                        }}>
                        Collections
                    </button>
                </div>
                <Slider class="recent__list" {...settingsForSlider}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                        <Card />
                    ))}
                </Slider>
                <div class="recent__all">
                    <button className="recent__all-btn">View all</button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;