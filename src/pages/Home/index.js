import { useContext } from "react";
import Slider from "react-slick";
import Card from "../../components/Card";
import "./Home.scss";
import { ContextApp } from "./../../Context";

function Home() {
    const { theme } = useContext(ContextApp);
    const settingsForSlider = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        arrows: false,
    };
    return (
        <>
            <section className="welcome" style={{ background: theme === "light" ? "#fff" : "#15191E" }}>
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
                    <img className="welcome__library-item-1" src="./img/sections/welcome/item-1.svg" alt="Card 2" />
                    <img className="welcome__library-item-2" src="./img/sections/welcome/item-2.svg" alt="Card 3" />
                    <img className="welcome__library-item-3" src="./img/sections/welcome/item-3.svg" alt="Card 1" />
                </div>
            </section>
            <section
                className="popular"
                style={{ background: theme === "light" ? "rgba(217, 224, 236, 0.3)" : "#15191E" }}>
                <h2 class="popular__title" style={{ color: theme === "light" ? "#000" : "#fff" }}>
                    Popular NFTs
                </h2>
                <div class="popular__categories">
                    <button className="popular__categories-nfts">NFTs</button>
                    <button
                        className="popular__categories-collections"
                        style={{
                            color: theme === "light" ? "#000" : "#fff",
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
                    <button className="recent__categories-nfts">NFTs</button>
                    <button
                        className="recent__categories-collections"
                        style={{
                            background: theme === "light" ? "#ff4500" : "#2B3239",
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
        </>
    );
}

export default Home;
