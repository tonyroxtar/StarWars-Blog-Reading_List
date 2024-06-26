import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import NavView from "./views/NavView.jsx";
import Characters from "./views/Characters.jsx";
import Planets from "./views/Planets.jsx";
import Ships from "./views/Ships.jsx";
import DetailView from "./views/DetailView.jsx";

function App() {
  return (
    <Router>
      <NavView />
      <div className="pt-5">
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/ships" element={<Ships />} />
          <Route path="/details/:type/:id" element={<DetailView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
