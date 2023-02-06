import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "../../components/Card";
import CollectionCard from "../../components/CollectionCard";
import "./Home.scss";
import { ContextApp } from "./../../Context";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import $ from "jquery";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {
    const [popularNFT, setPopularNFT] = useState([]);
    const [popularCollection, setPopularCollection] = useState([]);
    const [isLoadingNFT, setIsLoadingNFT] = useState(true);
    const [isLoadingCollection, setIsLoadingCollection] = useState(true);

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

    /* 
        Отсюда прокидываются два fetch-запроса на бэкенд для получения популярных NFTs и популярных Collections
    */
    useEffect(() => {
        fetch("/nfts.json")
            .then(res => {
                return res.json();
            })
            .then(json => {
                setPopularNFT(json);
                setIsLoadingNFT(false);
            });
        fetch("/collections.json")
            .then(res => {
                return res.json();
            })
            .then(json => {
                setPopularCollection(json);
                setIsLoadingCollection(false);
            });
    }, []);

    /*
        Плавная прокрутка для кнопки Explore Now
    */
    useEffect(() => {
        $("#popular-btn").on("click", function () {
            $("html, body").animate(
                {
                    scrollTop: $("#popular-section").offset().top,
                },
                {
                    duration: 400,
                    easing: "linear",
                },
            );

            return false;
        });
    });

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
                        {/* <div className="welcome__library-item-circle">
                            <div class="welcome__library-item-circle-circular">
                                <svg viewBox="0 0 170 170">
                                    <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
                                    <text>
                                        <textPath xlinkHref="#circle">Live auction · Live auction ·</textPath>
                                    </text>
                                </svg>
                            </div>
                        </div> */}
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

                {isLoadingNFT && isLoadingCollection ? (
                    <Skeleton height="24.21vw" style={{marginTop: "47px"}} count={1} />
                ) : (
                    <Slider class="popular__list" {...settingsForSlider}>
                        {popularFilter === "nft"
                            ? popularNFT.map(nft => <Card nft={nft} />)
                            : popularCollection.map(collection => <CollectionCard collection={collection} />)}
                    </Slider>
                )}
                {/* <Slider class="popular__list" {...settingsForSlider}>
                        {!isLoadingNFT ?  : popularFilter === "nft" ? popularNFT.map(nft => <Card nft={nft}/>) : popularCollection.map(collection => <CollectionCard collection={collection}/>)}
                    </Slider> */}
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
                {isLoadingNFT && isLoadingCollection ? (
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
