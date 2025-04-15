import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Therapists from "./pages/Therapists";
import Clients from "./pages/Clients";
import Sessions from "./pages/Sessions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/therapists" element={<Therapists />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/sessions" element={<Sessions />} />
    </Routes>
  );
}

export default App;
