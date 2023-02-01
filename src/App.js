import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Marketplace from "./pages/Marketplace";
import Catalog from "./pages/Catalog";
import FAQ from "./pages/FAQ";
import CreateNFT from "./pages/CreateNFT";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/marketplace" element={<Marketplace />} />
                <Route exact path="/catalog" element={<Catalog />} />
                <Route exact path="/faq" element={<FAQ />} />
                <Route exact path="/create-nft" element={<CreateNFT />} />
            </Routes>
        </>
    );
}

export default App;
