import { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import Slider from "react-slick";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ContextApp } from "../../Context";
import "./NFT.scss";

function NFT() {
    const [alsoFilter, setAlsoFilter] = useState("nft");
    const [favorite, setFavorite] = useState(false);
    const { changeTheme, theme } = useContext(ContextApp);
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
            <Header />
            <section className={`nft ${changeTheme("", "nft--dark")}`}>
                <div class="nft__up">
                    <div class="nft__up-left">
                        <div class="nft__up-left-card">
                            <img src="./img/sections/NFT/nft-photo.svg" alt="NFT" />
                            <div
                                className={`nft__up-left-card-favourite ${
                                    favorite ? "nft__up-left-card-favourite--true" : ""
                                }`}
                                onClick={() => setFavorite(!favorite)}>
                                <svg
                                    width="41"
                                    height="35"
                                    viewBox="0 0 41 35"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.5003 34.5925C19.9688 34.5938 19.4423 34.49 18.9511 34.2871C18.4599 34.0841 18.0137 33.7861 17.6381 33.41L3.79747 19.5694C2.70411 18.4642 1.84163 17.1524 1.26026 15.7105C0.6789 14.2686 0.39028 12.7255 0.411219 11.171C0.421754 9.74637 0.713239 8.33785 1.26898 7.02609C1.82472 5.71433 2.63379 4.52509 3.64986 3.5265C4.66592 2.52791 5.86901 1.73959 7.19022 1.20669C8.51142 0.673788 9.92479 0.40678 11.3493 0.42096C12.7994 0.406353 14.2376 0.683093 15.5787 1.23477C16.9198 1.78644 18.1365 2.60181 19.1565 3.63252L20.5003 4.97627L21.6022 3.8744C23.5048 1.92135 26.0507 0.723992 28.7685 0.504103C31.4862 0.284214 34.1915 1.05669 36.3834 2.67846C37.6311 3.63931 38.6598 4.85495 39.4009 6.24445C40.1421 7.63394 40.5786 9.16539 40.6816 10.7368C40.7846 12.3082 40.5516 13.8836 39.9982 15.3579C39.4447 16.8322 38.5835 18.1717 37.4718 19.2872L23.3625 33.41C22.9869 33.7861 22.5407 34.0841 22.0495 34.2871C21.5582 34.49 21.0318 34.5938 20.5003 34.5925ZM11.2956 3.09502C9.15973 3.09284 7.10681 3.92172 5.57122 5.40627C4.78835 6.1595 4.16578 7.06318 3.74089 8.06304C3.31601 9.0629 3.09758 10.1383 3.09872 11.2247C3.08694 12.4197 3.31249 13.6052 3.76229 14.7124C4.21209 15.8196 4.87719 16.8265 5.71903 17.6747L19.5597 31.5153C19.6846 31.6413 19.8332 31.7412 19.9969 31.8095C20.1607 31.8777 20.3363 31.9128 20.5137 31.9128C20.6911 31.9128 20.8667 31.8777 21.0305 31.8095C21.1942 31.7412 21.3429 31.6413 21.4678 31.5153L35.5906 17.3791C36.4196 16.5326 37.0601 15.5202 37.47 14.4086C37.8799 13.2969 38.05 12.1111 37.969 10.9291C37.8973 9.73491 37.5683 8.57035 37.0048 7.51509C36.4412 6.45983 35.6563 5.53879 34.7037 4.81502C33.0323 3.58266 30.9698 2.99996 28.9006 3.17548C26.8314 3.35101 24.8965 4.27279 23.4565 5.76908L21.4543 7.82502C21.3294 7.95097 21.1808 8.05094 21.0171 8.11916C20.8533 8.18738 20.6777 8.2225 20.5003 8.2225C20.3229 8.2225 20.1473 8.18738 19.9835 8.11916C19.8198 8.05094 19.6711 7.95097 19.5462 7.82502L17.2618 5.54065C15.6885 3.98093 13.5648 3.10251 11.3493 3.09502H11.2956Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </div>
                        <ul class="nft__up-left-emoji">
                            <li className={"nft__up-left-emoji-item-" + theme}>
                                ❤️<span>250</span>
                            </li>
                            <li className={"nft__up-left-emoji-item-" + theme}>
                                🤣<span>25</span>
                            </li>
                            <li className={"nft__up-left-emoji-item-" + theme}>
                                😍<span>250</span>
                            </li>
                            <li className={"nft__up-left-emoji-item-" + theme}>
                                😡<span>25</span>
                            </li>
                            <li className={"nft__up-left-emoji-item-" + theme}>
                                🙀<span>25</span>
                            </li>
                            <li className={"nft__up-left-emoji-item-" + theme}>
                                🥴<span>25</span>
                            </li>
                            <li className={"nft__up-left-emoji-item-" + theme}>
                                🤑<span>25</span>
                            </li>
                        </ul>
                        <div class="nft__up-left-people">
                            <div class="nft__up-left-people-owner">
                                <h6 class="nft__up-left-people-owner-title">Owner</h6>
                                <div class="nft__up-left-people-owner-left">
                                    <img
                                        class="nft__up-left-people-owner-left-avatar"
                                        src="./img/sections/NFT/user.svg"
                                        alt=""
                                    />
                                    <p class="nft__up-left-people-owner-left-name">John Doe</p>
                                </div>
                                <img
                                    class="nft__up-left-people-owner-arrow"
                                    src={`./img/sections/NFT/arrow-right-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                            <div class="nft__up-left-people-creator">
                                <h6 class="nft__up-left-people-creator-title">Creator</h6>
                                <div class="nft__up-left-people-creator-left">
                                    <img
                                        class="nft__up-left-people-creator-left-avatar"
                                        src="./img/sections/NFT/user.svg"
                                        alt=""
                                    />
                                    <p class="nft__up-left-people-creator-left-name">John Doe</p>
                                </div>
                                <img
                                    class="nft__up-left-people-creator-arrow"
                                    src={`./img/sections/NFT/arrow-right-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="nft__up-left-collection">
                            <h6 class="nft__up-left-collection-title">Collection</h6>
                            <div class="nft__up-left-collection-user">
                                <img
                                    class="nft__up-left-collection-user-avatar"
                                    src="./img/sections/NFT/user-2.svg"
                                    alt=""
                                />
                                <p class="nft__up-left-collection-user-name">Annihilation</p>
                            </div>
                            <img
                                class="nft__up-left-collection-arrow"
                                src={`./img/sections/NFT/arrow-right-${theme}.svg`}
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="nft__up-right">
                        <div class="nft__up-right-info">
                            <div className="nft__up-right-info-heading">
                                <h1 className="nft__up-right-info-heading-title">SP33 - Reservation #274</h1>
                                <div class="nft__up-right-info-heading-box">
                                    <p className="nft__up-right-info-heading-box-label">Current price</p>
                                    <img
                                        className="nft__up-right-info-heading-box-diamond"
                                        src="./img/sections/nft/diamond-light.svg"
                                        alt=""
                                    />
                                    <p className="nft__up-right-info-heading-box-price">0.25 TON</p>
                                </div>
                            </div>
                            <div className="nft__up-right-info-tags">
                                <div class="nft__up-right-info-tags-tag">Tsunama</div>
                                <div class="nft__up-right-info-tags-tag">Tsunama</div>
                                <div class="nft__up-right-info-tags-tag">Tsunama</div>
                            </div>
                            <div className="nft__up-right-info-extra">
                                <div class="nft__up-right-info-extra-text">
                                    Orange Comet and Legendary Basketball Champion and Hall of Famer, SCOTTIE PIPPEN,
                                    are stepping into the metaverse with SP33, a dynamic limited-edition virtual
                                    wearable cross-platform NFT sneaker collection. Each NFT sneakers will not only
                                    feature Orange Comet's signature 3D animations, but it will also be built as a
                                    Metaverse-Ready digital asset – ready to be worn in just about any ecosystem.
                                </div>
                                <button class="nft__up-right-info-extra-place">Place a bid</button>
                            </div>
                        </div>
                        <div class="nft__up-right-other">
                            <h6 className="nft__up-right-other-title">Other</h6>
                            <div class="nft__up-right-other-box">
                                <p class="nft__up-right-other-box-title">Contract Address</p>
                                <p class="nft__up-right-other-box-text">
                                    {window.innerWidth <= 768
                                        ? "EQB0PAgMahaikkK..."
                                        : "EQB0PAgMahaikkKhqNXc8AR4o9sIDQgkyHYZUlcdOUHdxCkc"}
                                </p>
                                <img
                                    class="nft__up-right-other-box-img"
                                    src={`./img/sections/nft/arrow-extra-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                            <div class="nft__up-right-other-box">
                                <p class="nft__up-right-other-box-title">Sale contract</p>
                                <p class="nft__up-right-other-box-text">
                                    {window.innerWidth <= 768
                                        ? "EQB0PAgMahaikkK..."
                                        : "EQB0PAgMahaikkKhqNXc8AR4o9sIDQgkyHYZUlcdOUHdxCkc"}
                                </p>
                                <img
                                    class="nft__up-right-other-box-img"
                                    src={`./img/sections/nft/arrow-extra-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                            <div class="nft__up-right-other-box">
                                <p class="nft__up-right-other-box-title">Token ID</p>
                                <p class="nft__up-right-other-box-text">97</p>
                            </div>
                            <div class="nft__up-right-other-box">
                                <p class="nft__up-right-other-box-title">Metadata</p>
                                <p class="nft__up-right-other-box-text">Centralized</p>
                            </div>
                        </div>
                        <div class="nft__up-right-history">
                            <h6 class="nft__up-right-history-title">Price history</h6>
                            <div class="nft__up-right-history-box">
                                <div class="nft__up-right-history-box-prices">
                                    <p>1.25 TON</p>
                                    <p>1.20 TON</p>
                                    <p>0</p>
                                </div>
                                <div class="nft__up-right-history-box-graph">
                                    <img
                                        class="nft__up-right-history-box-graph-line"
                                        src="./img/sections/nft/max-line.svg"
                                        alt=""
                                    />
                                    <div class="nft__up-right-history-box-graph-colums">
                                        <div class="nft__up-right-history-box-graph-colums-column">
                                            <p class="nft__up-right-history-box-graph-colums-column-text">Dec 22</p>
                                        </div>
                                        <div class="nft__up-right-history-box-graph-colums-column">
                                            <p class="nft__up-right-history-box-graph-colums-column-text">Dec 23</p>
                                        </div>
                                        <div class="nft__up-right-history-box-graph-colums-column">
                                            <p class="nft__up-right-history-box-graph-colums-column-text">Dec 24</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="nft__up-right-history-resize"
                                src={`./img/sections/nft/resize-${theme}.svg`}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                {window.innerWidth <= 768 ? (
                    <Draggable axis="x">
                        <div>
                            <div class="nft__history" id="nft-history">
                                <h6 class="nft__history-title">Owners history</h6>
                                <div className="nft__history-table">
                                    <div className="nft__history-table-headings">
                                        <div className="nft__history-table-headings-heading">Type</div>
                                        <div className="nft__history-table-headings-heading">Price</div>
                                        <div className="nft__history-table-headings-heading">From</div>
                                        <div className="nft__history-table-headings-heading">To</div>
                                        <div className="nft__history-table-headings-heading">Time</div>
                                    </div>
                                    <div class="nft__history-table-row">
                                        <div className="nft__history-table-row-item">
                                            Put up for sale
                                            <img src="./img/sections/nft/ok-light.svg" alt="Ok" />
                                        </div>
                                        <div className="nft__history-table-row-item">
                                            11 TON
                                            <span>$26.62</span>
                                        </div>
                                        <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                        <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                        <div className="nft__history-table-row-item">19 hours ago</div>
                                    </div>
                                    <div class="nft__history-table-row">
                                        <div className="nft__history-table-row-item">
                                            Put up for sale
                                            <img src="./img/sections/nft/ok-light.svg" alt="Ok" />
                                        </div>
                                        <div className="nft__history-table-row-item">
                                            11 TON
                                            <span>$26.62</span>
                                        </div>
                                        <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                        <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                        <div className="nft__history-table-row-item">19 hours ago</div>
                                    </div>
                                    <div class="nft__history-table-row">
                                        <div className="nft__history-table-row-item">
                                            Put up for sale
                                            <img src="./img/sections/nft/ok-light.svg" alt="Ok" />
                                        </div>
                                        <div className="nft__history-table-row-item">
                                            11 TON
                                            <span>$26.62</span>
                                        </div>
                                        <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                        <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                        <div className="nft__history-table-row-item">19 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                ) : (
                    <div class="nft__history" id="nft-history">
                        <h6 class="nft__history-title">Owners history</h6>
                        <div className="nft__history-table">
                            <div className="nft__history-table-headings">
                                <div className="nft__history-table-headings-heading">Type</div>
                                <div className="nft__history-table-headings-heading">Price</div>
                                <div className="nft__history-table-headings-heading">From</div>
                                <div className="nft__history-table-headings-heading">To</div>
                                <div className="nft__history-table-headings-heading">Time</div>
                            </div>
                            <div class="nft__history-table-row">
                                <div className="nft__history-table-row-item">
                                    Put up for sale
                                    <img src="./img/sections/nft/ok-light.svg" alt="Ok" />
                                </div>
                                <div className="nft__history-table-row-item">
                                    11 TON
                                    <span>$26.62</span>
                                </div>
                                <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                <div className="nft__history-table-row-item">19 hours ago</div>
                            </div>
                            <div class="nft__history-table-row">
                                <div className="nft__history-table-row-item">
                                    Put up for sale
                                    <img src="./img/sections/nft/ok-light.svg" alt="Ok" />
                                </div>
                                <div className="nft__history-table-row-item">
                                    11 TON
                                    <span>$26.62</span>
                                </div>
                                <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                <div className="nft__history-table-row-item">19 hours ago</div>
                            </div>
                            <div class="nft__history-table-row">
                                <div className="nft__history-table-row-item">
                                    Put up for sale
                                    <img src="./img/sections/nft/ok-light.svg" alt="Ok" />
                                </div>
                                <div className="nft__history-table-row-item">
                                    11 TON
                                    <span>$26.62</span>
                                </div>
                                <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                <div className="nft__history-table-row-item">EQDs7u...2amK</div>
                                <div className="nft__history-table-row-item">19 hours ago</div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section
                className="also"
                style={{
                    background: changeTheme(
                        "conic-gradient(from 138.04deg at 49.21% 52.37%,#2442ad 0deg,#2240e0 105.21deg,#1fbdeb 203.25deg,#f39475 313.87deg,#2442ad 360deg)",
                        "#15191E",
                    ),
                }}>
                <div className="also__bg"></div>
                <h2 className="also__title">See also</h2>
                <div className="also__categories">
                    <button
                        className={`also__categories-nfts ${
                            alsoFilter === "nft" ? "also__categories-nfts--active" : ""
                        } ${alsoFilter !== "nft" ? "also__categories-nfts--hoverMe" : ""}`}
                        onClick={() => setAlsoFilter("nft")}
                        style={{
                            color:
                                theme === "light" && alsoFilter !== "nft"
                                    ? "#fff"
                                    : theme === "dark" && alsoFilter !== "nft"
                                    ? "#fff"
                                    : "#000",
                            background:
                                theme === "light" && alsoFilter !== "nft"
                                    ? "#ff4500"
                                    : theme === "dark" && alsoFilter !== "nft"
                                    ? "#2B3239"
                                    : "#fff",
                        }}>
                        NFTs
                    </button>
                    <button
                        className={`also__categories-collections ${
                            alsoFilter === "collection" ? "also__categories-collections--active" : ""
                        } ${alsoFilter !== "collection" ? "also__categories-collections--hoverMe" : ""}`}
                        onClick={() => setAlsoFilter("collection")}
                        style={{
                            color:
                                theme === "light" && alsoFilter !== "collection"
                                    ? "#fff"
                                    : theme === "dark" && alsoFilter !== "collection"
                                    ? "#fff"
                                    : "#000",
                            background:
                                theme === "light" && alsoFilter !== "collection"
                                    ? "#ff4500"
                                    : theme === "dark" && alsoFilter !== "collection"
                                    ? "#2B3239"
                                    : "#fff",
                        }}>
                        Collections
                    </button>
                </div>
                <Slider class="also__list" {...settingsForSlider}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                        <Card />
                    ))}
                </Slider>
                <div class="also__all">
                    <button className="recent__all-btn">View all</button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default NFT;