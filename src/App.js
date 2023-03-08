import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Marketplace from "./pages/Marketplace";
import Catalog from "./pages/Catalog";
import FAQ from "./pages/FAQ";
import CreateNFT from "./pages/CreateNFT";
import NFT from "./pages/NFT";
import Collection from "./pages/Collection";
import MyNFT from "./pages/MyNFT";
import AdminPanel from "./pages/AdminPanel";
import ConfirmEmail from "./pages/ConfirmEmail";
import CreateCollection from "./pages/CreateCollection";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/marketplace" element={<Catalog />} />
                <Route exact path="/catalog" element={<Marketplace />} />
                <Route exact path="/faq" element={<FAQ />} />
                <Route exact path="/create-nft" element={<CreateNFT />} />
                <Route exact path="/create-collection" element={<CreateCollection />} />
                <Route exact path="/NFT" element={<NFT />} />
                <Route exact path="/collection" element={<Collection />} />
                <Route exact path="/my-nft" element={<MyNFT />} />
                <Route exact path="/admin-panel" element={<AdminPanel/>} />
                <Route path="/confirm" element={<ConfirmEmail/>}/>
            </Routes>
        </>
    );
}

export default App;
