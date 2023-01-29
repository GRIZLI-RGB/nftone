import { useState, createContext } from "react";

export const ContextApp = createContext();

function Context(props) {
    const [theme, setTheme] = useState("light");
    return <ContextApp.Provider value={{theme, setTheme}}>{props.children}</ContextApp.Provider>;
}

export default Context;
