import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery"
import ReadMe from "./pages/ReadMe"
import LeagueHistory from "./pages/LeagueHistory";
import Blog from "./pages/Blog";
import GunEffect from "./pages/GunEffect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/readme" element={<ReadMe />} />
      <Route path="/league-history" element={<LeagueHistory/>} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/gun-effect" element={<GunEffect/>} />
    </Routes>
  );
}

export default App;