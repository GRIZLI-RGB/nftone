import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import Checkbox from "../Checkbox";
import Radiobutton from "../Radiobutton";
import "./Filters.scss";

function Filters() {
    const [popups, setPopups] = useState([true, true, true, true, true, true]);
    
    const [buyCheck, setBuyCheck] = useState(false);
    const [auctionCheck, setAuctionCheck] = useState(false);
    const [quantityCheck, setQuantityCheck] = useState("all");
    const [priceAt, setPriceAt] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [rarityCheck, setRarityCheck] = useState([]);
    const [categoryCheck, setCategoryCheck] = useState([]);
    const [emotionalCheck, setEmotionalCheck] = useState([]);

    const { theme, changeTheme, setFilterStatus, setFilterQuantity, setFilterPriceAt, setFilterPriceTo, setFilterRarity, setFilterCategory, setFilterEmotional } = useContext(ContextApp);
    const categories = [
        "Art",
        "Collectibles",
        "Music",
        "Photography",
        "Sports",
        "Trading",
        "Cards",
        "Utility",
        "Virtual",
        "Worlds",
    ];

    function applyFilters() {
        setFilterStatus((buyCheck && auctionCheck) || (!buyCheck && !auctionCheck) ? "all" : buyCheck ? "Buy now" : "In auction")
        setFilterQuantity(quantityCheck);
        setFilterPriceAt(priceAt);
        setFilterPriceTo(priceTo);
        setFilterRarity(rarityCheck);
        setFilterCategory(categoryCheck);
        setFilterEmotional(emotionalCheck);
    }

    function addOrRemoveRarityCheck(rarity) {
        if(rarityCheck.includes(rarity)) {
            setRarityCheck(rarityCheck.filter(rar => rar !== rarity))
        } else {
            setRarityCheck([...rarityCheck, rarity])
        }
    }

    function addOrRemoveCategoryCheck(category) {
        if(categoryCheck.includes(category)) {
            setCategoryCheck(categoryCheck.filter(cat => cat !== category))
        } else {
            setCategoryCheck([...categoryCheck, category])
        }
    }

    function addOrRemoveEmotionalCheck(emotion) {
        if(emotionalCheck.includes(emotion)) {
            setEmotionalCheck(emotionalCheck.filter(emot => emot !== emotion))
        } else {
            setEmotionalCheck([...emotionalCheck, emotion])
        }
    }

    return (
        <div
            class="filters"
            style={{ backgroundColor: changeTheme("#fff", "#1C2026"), color: changeTheme("#000", "#fff") }}>
            <div class="filters__status">
                <div onClick={() => setPopups([!popups[0], popups[1], popups[2], popups[3], popups[4], popups[5]])}>
                    <h6>Status</h6>
                    {popups[0] ? (
                        <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                    ) : (
                        <img
                            src={`./img/sections/catalog/arrow-${theme}.png`}
                            alt="Arrow"
                            style={{ transform: "rotate(-90deg) translateX(30%)" }}
                        />
                    )}
                </div>
                {popups[0] && (
                    <div>
                        <Checkbox text={"Buy Now"} onClick={() => setBuyCheck(!buyCheck)}/>
                        <Checkbox text={"On Auction"} onClick={() => setAuctionCheck(!auctionCheck)}/>
                    </div>
                )}
            </div>
            <div class="filters__quantity">
                <div onClick={() => setPopups([popups[0], !popups[1], popups[2], popups[3], popups[4], popups[5]])}>
                    <h6>Quantity</h6>
                    {popups[1] ? (
                        <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                    ) : (
                        <img
                            src={`./img/sections/catalog/arrow-${theme}.png`}
                            alt="Arrow"
                            style={{ transform: "rotate(-90deg) translateX(30%)" }}
                        />
                    )}
                </div>
                {popups[1] && (
                    <div>
                        <Radiobutton text={"All items"} group={"quantity"} onClick={() => setQuantityCheck("all")} />
                        <Radiobutton text={"Single items"} group={"quantity"} onClick={() => setQuantityCheck("single")} />
                        <Radiobutton text={"Bundles"} group={"quantity"} onClick={() => setQuantityCheck("bundles")} />
                    </div>
                )}
            </div>
            <div class="filters__price">
                <div onClick={() => setPopups([popups[0], popups[1], !popups[2], popups[3], popups[4], popups[5]])}>
                    <h6>Price range</h6>
                    {popups[2] ? (
                        <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                    ) : (
                        <img
                            src={`./img/sections/catalog/arrow-${theme}.png`}
                            alt="Arrow"
                            style={{ transform: "rotate(-90deg) translateX(30%)" }}
                        />
                    )}
                </div>
                {popups[2] && (
                    <div className="filters__price-content">
                        <div>
                            <p>From</p>
                            <input min="0" type="number" value={priceAt} onChange={e => setPriceAt(e.target.value)}/>
                        </div>
                        <div>
                            <p>To</p>
                            <input min="0" type="number" value={priceTo} onChange={e => setPriceTo(e.target.value)} />
                        </div>
                    </div>
                )}
            </div>
            <div class="filters__rarity">
                <div onClick={() => setPopups([popups[0], popups[1], popups[2], !popups[3], popups[4], popups[5]])}>
                    <h6>Rarity rank</h6>
                    {popups[3] ? (
                        <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                    ) : (
                        <img
                            src={`./img/sections/catalog/arrow-${theme}.png`}
                            alt="Arrow"
                            style={{ transform: "rotate(-90deg) translateX(30%)" }}
                        />
                    )}
                </div>
                {popups[3] && (
                    <>
                        <Checkbox text={"Common"} onClick={(e) => addOrRemoveRarityCheck(e.target.innerText.toLowerCase())}/>
                        <Checkbox text={"Epic"} onClick={(e) => addOrRemoveRarityCheck(e.target.innerText.toLowerCase())}/>
                        <Checkbox text={"Legendary"} onClick={(e) => addOrRemoveRarityCheck(e.target.innerText.toLowerCase())}/>
                    </>
                )}
            </div>
            <div class="filters__emotional">
                <div onClick={() => setPopups([popups[0], popups[1], popups[2], popups[3], !popups[4], popups[5]])}>
                    <h6>The most emotional</h6>
                    {popups[4] ? (
                        <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                    ) : (
                        <img
                            src={`./img/sections/catalog/arrow-${theme}.png`}
                            alt="Arrow"
                            style={{ transform: "rotate(-90deg) translateX(30%)" }}
                        />
                    )}
                </div>
                {popups[4] && (
                    <>
                        <Checkbox text={"Red Heart"} onClick={(e) => addOrRemoveEmotionalCheck(e.target.innerText)}/>
                        <Checkbox text={"Rolling on the Floor Laughing"} onClick={(e) => addOrRemoveEmotionalCheck(e.target.innerText)}/>
                        <Checkbox text={"Smiling Face with Heart-Eyes"} onClick={(e) => addOrRemoveEmotionalCheck(e.target.innerText)}/>
                        <Checkbox text={"Enraged Face"} onClick={(e) => addOrRemoveEmotionalCheck(e.target.innerText)}/>
                        <Checkbox text={"Weary Cat"} onClick={(e) => addOrRemoveEmotionalCheck(e.target.innerText)}/>
                        <Checkbox text={"Woozy Face"} onClick={(e) => addOrRemoveEmotionalCheck(e.target.innerText)}/>
                        <Checkbox text={"Money-Mouth Face"} onClick={(e) => addOrRemoveEmotionalCheck(e.target.innerText)}/>
                    </>
                )}
            </div>
            <div class="filters__category">
                <div onClick={() => setPopups([popups[0], popups[1], popups[2], popups[3], popups[4], !popups[5]])}>
                    <h6>Category</h6>
                    {popups[5] ? (
                        <img src={`./img/sections/catalog/arrow-${theme}.png`} alt="Arrow" />
                    ) : (
                        <img
                            src={`./img/sections/catalog/arrow-${theme}.png`}
                            alt="Arrow"
                            style={{ transform: "rotate(-90deg) translateX(30%)" }}
                        />
                    )}
                </div>
                {popups[5] && (
                    <div>
                        {categories.map(category => (
                            <Checkbox text={category} onClick={(e) => addOrRemoveCategoryCheck(e.target.innerText.toLowerCase())}/>
                        ))}
                    </div>
                )}
            </div>
            <button className="filters__apply" onClick={() => applyFilters()}>Apply filters</button>
        </div>
    );
}

export default Filters;