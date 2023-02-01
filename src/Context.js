import { useState, createContext } from "react";

export const ContextApp = createContext();

function Context(props) {
    const [theme, setTheme] = useState("light");
    const [popup, setPopup] = useState(false);
    const changeTheme = (forLight, forDark) => {
        return theme === "light" ? forLight : forDark;
    };
    return <ContextApp.Provider value={{ theme, setTheme, popup, setPopup, changeTheme }}>{props.children}</ContextApp.Provider>;
}

export default Context;
