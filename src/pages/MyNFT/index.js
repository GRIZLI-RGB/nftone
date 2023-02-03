import "./MyNFT.scss";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Filters from "./../../components/Filters";
import SimpleCard from "./../../components/SimpleCard";
import CollectionCard from "./../../components/CollectionCard";
import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import { useDropzone } from "react-dropzone";

function MyNFT() {
    const { theme, changeTheme } = useContext(ContextApp);
    const [windowView, setWindowView] = useState("nft");
    const [sortView, setSortView] = useState("not-sale");
    /*
        Drag-and-drop files (acceptedFiles - массив со всеми файлами,
            обнуляется при перезагрузке страницы)
    */
    const { acceptedFiles, getRootProps } = useDropzone();
    return (
        <>
            <Header />
            <section className={`myBanner ${changeTheme("", "myBanner--dark")}`}>
                <div class="myBanner__download" {...getRootProps({ className: "dropzone myBanner__download" })}>
                    <img src={`./img/sections/myNFT/download-${theme}.svg`} alt="" class="myBanner__download-img" />
                    <p class="myBanner__download-title">Add banner</p>
                    <p class="myBanner__download-text">Optimal dimensions: 2500×650</p>
                </div>
            </section>
            <section className={`myContent ${changeTheme("", "myContent--dark")}`}>
                <div class="myContent__left">
                    <div className="myContent__left-user">
                        <img className="myContent__left-user-avatar" src="./img/sections/myNFT/avatar.svg" alt="" />
                        <h6 className="myContent__left-user-name">John Doe</h6>
                        <div className="myContent__left-user-social">
                            <a href="#">
                                <img src="./img/sections/myNFT/vk.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/telegram.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/twitter.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/reddit.svg" alt="" />
                            </a>
                            <a href="#">
                                <img src="./img/sections/myNFT/discord.svg" alt="" />
                            </a>
                        </div>
                        <p className="myContent__left-user-text">
                            Let people find out more about you.
                            <br />
                            <br />
                            Fill out your personal information: nickname, description and social media. Add a new
                            banner.
                        </p>
                        <button className="myContent__left-user-edit">Edit profile</button>
                    </div>
                    {windowView === "collection" && (
                        <>
                            <div class="myContent__left-owner">
                                <h6 class="myContent__left-owner-title">Owner</h6>
                                <div class="myContent__left-owner-left">
                                    <img
                                        class="myContent__left-owner-left-avatar"
                                        src="./img/sections/NFT/user.svg"
                                        alt=""
                                    />
                                    <p class="myContent__left-owner-left-name">John Doe</p>
                                </div>
                                <img
                                    class="myContent__left-owner-arrow"
                                    src={`./img/sections/collection/arrow-right-${theme}.svg`}
                                    alt=""
                                />
                            </div>
                            <div class="myContent__left-other">
                                <h6 className="myContent__left-other-title">Other</h6>
                                <div class="myContent__left-other-box">
                                    <p class="myContent__left-other-box-title">Contract Address</p>
                                    <p class="myContent__left-other-box-text">EQB0PAgMahaikkK...</p>
                                    <img
                                        class="myContent__left-other-box-img"
                                        src={`./img/sections/nft/arrow-extra-${theme}.svg`}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <Filters />
                </div>
                <div class="myContent__right">
                    <div className="myContent__right-window">
                        <button
                            className={`myContent__right-window-btn ${
                                windowView === "nft" ? "myContent__right-window-btn--active" : ""
                            }`}
                            onClick={() => setWindowView("nft")}>
                            My NFTs
                        </button>
                        <button
                            className={`myContent__right-window-btn ${
                                windowView === "collection" ? "myContent__right-window-btn--active" : ""
                            }`}
                            onClick={() => setWindowView("collection")}>
                            My collections
                        </button>
                        <button
                            className={`myContent__right-window-btn ${
                                windowView === "favorite" ? "myContent__right-window-btn--active" : ""
                            }`}
                            onClick={() => setWindowView("favorite")}>
                            Favorites
                        </button>
                    </div>
                    <div className="myContent__right-settings">
                        <div className="myContent__right-settings-search">
                            <input
                                placeholder="Search"
                                className="myContent__right-settings-search-input"
                                type="text"
                            />
                            <img
                                className="myContent__right-settings-search-img"
                                alt=""
                                src={`./img/sections/collection/search-${theme}.svg`}
                            />
                        </div>
                        <div className="myContent__right-settings-box">
                            <button className="myContent__right-settings-box-price">
                                Price: Low to High
                                <img src={`./img/sections/collection/arrow-up-${theme}.svg`} alt="" />
                            </button>
                            {windowView !== "favorite" && (
                                <button className="myContent__right-settings-box-add">
                                    {windowView === "nft" ? "Add nft" : "Add collection"}
                                </button>
                            )}
                        </div>
                        <div class="myContent__right-settings-boxMobile">
                            <button className="myContent__right-settings-boxMobile-filters">
                                Filters
                                <img src={`./img/sections/collection/filters-${theme}.svg`} alt="" />
                            </button>
                            <button className="myContent__right-settings-boxMobile-sort">
                                Sort
                                <img src={`./img/sections/collection/arrow-up-${theme}.svg`} alt="" />
                            </button>
                        </div>
                    </div>
                    {windowView === "nft" && (
                        <div className="myContent__right-sort">
                            <button
                                className={`myContent__right-sort-btn ${
                                    sortView === "not-sale" ? "myContent__right-sort-btn--active" : ""
                                }`}
                                onClick={() => setSortView("not-sale")}>
                                Not for sale
                            </button>
                            <button
                                className={`myContent__right-sort-btn ${
                                    sortView === "now" ? "myContent__right-sort-btn--active" : ""
                                }`}
                                onClick={() => setSortView("now")}>
                                Buy now
                            </button>
                            <button
                                className={`myContent__right-sort-btn ${
                                    sortView === "auction" ? "myContent__right-sort-btn--active" : ""
                                }`}
                                onClick={() => setSortView("auction")}>
                                On auction
                            </button>
                        </div>
                    )}
                    <div className="myContent__right-items">
                        {windowView === "nft" ? (
                            <>
                                <SimpleCard />
                                <SimpleCard />
                                <SimpleCard />
                            </>
                        ) : windowView === "collection" ? (
                            <>
                                <CollectionCard />
                                <CollectionCard />
                                <CollectionCard />
                            </>
                        ) : (
                            <>
                                <SimpleCard />
                                <SimpleCard />
                                <SimpleCard />
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default MyNFT;
