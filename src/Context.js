import { useState, createContext } from "react";

export const ContextApp = createContext();

function Context(props) {
    const [theme, setTheme] = useState("light");
    const [popup, setPopup] = useState(false);
    return <ContextApp.Provider value={{ theme, setTheme, popup, setPopup }}>{props.children}</ContextApp.Provider>;
}

export default Context;
