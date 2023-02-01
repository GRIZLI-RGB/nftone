import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Marketplace from "./pages/Marketplace";
import Catalog from "./pages/Catalog";
import FAQ from "./pages/FAQ";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/marketplace" element={<Marketplace/>} />
                <Route exact path="/catalog" element={<Catalog/>} />
                <Route exact path="/faq" element={<FAQ/>} />
            </Routes>
        </>
    );
}

export default App;
