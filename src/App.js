import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Marketplace from "./pages/Marketplace";
import Catalog from "./pages/Catalog";
import FAQ from "./pages/FAQ";
import CreateNFT from "./pages/CreateNFT";
import NFT from "./pages/NFT";
import Collection from "./pages/Collection";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ConfirmEmail from "./pages/ConfirmEmail";
import CreateCollection from "./pages/CreateCollection";

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/marketplace" element={<Marketplace />} />
                <Route exact path="/catalog" element={<Catalog />} />
                <Route exact path="/faq" element={<FAQ />} />
                <Route exact path="/create-nft" element={<CreateNFT />} />
                <Route exact path="/create-collection" element={<CreateCollection />} />
                <Route exact path="/admin-panel" element={<AdminPanel/>} />
                <Route path="/confirm" element={<ConfirmEmail/>}/>
                <Route path="/nft/:id" element={<NFT />} />
                <Route path="/collection/:id" element={<Collection />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </>
    );
}

export default App;
