import { useContext } from "react";
import { ContextApp } from "../../Context";
import "./Footer.scss";

function Footer() {
    const { changeTheme } = useContext(ContextApp);
    return (
        <footer className="footer" style={{ backgroundColor: changeTheme("#004f87", "#1C2026") }}>
            <div className="footer__info">
                <div className="footer__info-about">
                    <img src="/img/footer/footer-logo.svg" alt="Logo" className="footer__info-about-logo" />
                    <p className="footer__info-about-text">
                        The world's first and largest digital marketplace for crypto collectibles and non-fungible
                        tokens (NFTs). Buy, sell, and discover exclusive digital items.
                    </p>
                </div>
                <div className="footer__info-box">
                    <ul className="footer__info-box-list">
                        <li className="footer__info-box-list-title">Market Place</li>
                        <li className="footer__info-box-list-item">
                            <a href="#">Catalog</a>
                        </li>
                        <li className="footer__info-box-list-item">
                            <a href="#">Search</a>
                        </li>
                        <li className="footer__info-box-list-item">
                            <a href="#">FAQ</a>
                        </li>
                    </ul>
                    <ul className="footer__info-box-list">
                        <li className="footer__info-box-list-title">My Account</li>
                        <li className="footer__info-box-list-item">
                            <a href="/my-nft">Profile</a>
                        </li>
                        <li className="footer__info-box-list-item">
                            <a href="/my-nft">My Collections</a>
                        </li>
                        <li className="footer__info-box-list-item">
                            <a href="/my-nft">My NFTs</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__info-social">
                    <h6 className="footer__info-social-title">Follow Us On</h6>
                    <div className="footer__info-social-items">
                        <a href="#">
                            <img src="/img/footer/vk.svg" alt="VK" className="footer__info-social-items-item" />
                        </a>
                        <a href="#">
                            <img
                                src="/img/footer/telegram.svg"
                                alt="Telegram"
                                className="footer__info-social-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="/img/footer/twitter.svg"
                                alt="Twitter"
                                className="footer__info-social-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="/img/footer/reddit.svg"
                                alt="Reddit"
                                className="footer__info-social-items-item"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="/img/footer/discord.svg"
                                alt="Discord"
                                className="footer__info-social-items-item"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">Copyright ?? 2022 NFTONE</div>
        </footer>
    );
}

export default Footer;
