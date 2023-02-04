import { useState, createContext } from "react";

export const ContextApp = createContext();

function Context(props) {
    const [theme, setTheme] = useState("light");
    const [popup, setPopup] = useState(false);
    const [auth, setAuth] = useState(false);
    const changeTheme = (forLight, forDark) => {
        return theme === "light" ? forLight : forDark;
    };
    return <ContextApp.Provider value={{ theme, setTheme, popup, setPopup, changeTheme, auth, setAuth }}>{props.children}</ContextApp.Provider>;
}

export default Context;
