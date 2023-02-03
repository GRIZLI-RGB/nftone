import { useContext, useState } from "react";
import { ContextApp } from "../../Context";
import Checkbox from "../Checkbox";
import Radiobutton from "../Radiobutton";
import "./Filters.scss";

function Filters() {
    const [popups, setPopups] = useState([true, true, true, true, true, true]);
    const { theme, changeTheme } = useContext(ContextApp);
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
                        <Checkbox text={"Buy Now"} />
                        <Checkbox text={"On Auction"} />
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
                        <Radiobutton text={"All items"} group={"quantity"} />
                        <Radiobutton text={"Single items"} group={"quantity"} />
                        <Radiobutton text={"Bundles"} group={"quantity"} />
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
                            <input type="number" />
                        </div>
                        <div>
                            <p>To</p>
                            <input type="number" />
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
                        <Checkbox text={"Mutant Hound Collar"} />
                        <Checkbox text={"Mega Collar"} />
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
                        <Checkbox text={"Mutant Hound Collar"} />
                        <Checkbox text={"Mega Collar"} />
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
                            <Checkbox text={category} />
                        ))}
                    </div>
                )}
            </div>
            <button className="filters__apply">Apply filters</button>
        </div>
    );
}

export default Filters;
