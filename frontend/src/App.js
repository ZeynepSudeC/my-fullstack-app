import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import Footer from "./components/Footer";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="App">
      {/* Üst menü */}
      <Navbar onFilterClick={() => setDrawerOpen(true)} />

      {/* Harita + Drawer */}
      <MapView drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Footer />
    </div>
  );
}

export default App;