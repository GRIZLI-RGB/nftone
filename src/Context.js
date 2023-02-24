import { useState, createContext } from "react";

export const ContextApp = createContext();

function Context(props) {
    const [theme, setTheme] = useState("light");
    const [popup, setPopup] = useState(false);
    const [auth, setAuth] = useState(false);

    /*
        Стейты для фильтров
    */
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterQuantity, setFilterQuantity] = useState("all");
    const [filterPriceAt, setFilterPriceAt] = useState("");
    const [filterPriceTo, setFilterPriceTo] = useState("");
    const [filterRarity, setFilterRarity] = useState([]);
    const [filterEmotional, setFilterEmotional] = useState();
    const [filterCategory, setFilterCategory] = useState([]);

    const [NFTs, setNFTs] = useState([]);
    const [collections, setCollections] = useState([]);

    const [currentCollection, setCurrentCollection] = useState(null);

    const changeTheme = (forLight, forDark) => {
        return theme === "light" ? forLight : forDark;
    };

    return (
        <ContextApp.Provider
            value={{
                currentCollection,
                setCurrentCollection,
                theme,
                setTheme,
                popup,
                setPopup,
                changeTheme,
                auth,
                setAuth,
                NFTs,
                setNFTs,
                collections,
                setCollections,
                filterStatus,
                setFilterStatus,
                filterQuantity,
                setFilterQuantity,
                filterPriceAt,
                setFilterPriceAt,
                filterPriceTo,
                setFilterPriceTo,
                filterRarity,
                setFilterRarity,
                filterEmotional,
                setFilterEmotional,
                filterCategory,
                setFilterCategory
            }}>
            {props.children}
        </ContextApp.Provider>
    );
}

export default Context;
