import { useContext } from "react";
import { ContextApp } from "../../Context";
import "./Footer.scss";

function Footer() {
    const globalContext = useContext(ContextApp);
    return (
        <footer className="footer" style={{ backgroundColor: globalContext.theme === "light" ? "#004f87" : "#1C2026" }}>
            <div className="footer__info">
                <div className="footer__info-about">
                    <img src="./img/footer/footer-logo.svg" alt="Logo" className="footer__info-about-logo" />
                    <p className="footer__info-about-text">
                        The world’s first and largest digital marketplace for crypto collectibles and non-fungible
                        tokens (NFTs). Buy, sell, and discover exclusive digital items.
                    </p>
                </div>
                <ul className="footer__info-list">
                    <li className="footer__info-list-title">Market Place</li>
                    <li class="footer__info-list-item">
                        <a href="#">Catalog</a>
                    </li>
                    <li class="footer__info-list-item">
                        <a href="#">Search</a>
                    </li>
                    <li class="footer__info-list-item">
                        <a href="#">FAQ</a>
                    </li>
                </ul>
                <ul className="footer__info-list">
                    <li className="footer__info-list-title">My Account</li>
                    <li class="footer__info-list-item">
                        <a href="#">Profile</a>
                    </li>
                    <li class="footer__info-list-item">
                        <a href="#">My Collections</a>
                    </li>
                    <li class="footer__info-list-item">
                        <a href="#">My NFTs</a>
                    </li>
                </ul>
                <div className="footer__info-social">
                    <h6 className="footer__info-social-title">Follow Us On</h6>
                    <div className="footer__info-social-items">
                        <a href="#">
                            <img src="./img/footer/vk.svg" alt="VK" className="footer__info-social-items-item" />
                        </a>
                        <a href="#">
                            <img
                                src="./img/footer/telegram.svg"
                                alt="Telegram"
                                className="footer__info-social-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="./img/footer/twitter.svg"
                                alt="Twitter"
                                className="footer__info-social-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="./img/footer/reddit.svg"
                                alt="Reddit"
                                className="footer__info-social-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="./img/footer/discord.svg"
                                alt="Discord"
                                className="footer__info-social-items-item"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">Copyright © 2022 NFTONE</div>
        </footer>
    );
}

export default Footer;
