import { Routes, Route } from "react-router-dom";
import React, { useRef, useState } from 'react';
import ArcadeLayout from "./layouts/ArcadeLayout";
import GameLayout from "./layouts/GameLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Explore from "./pages/Explore";
import BlankPage from "./pages/Blank";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ArcadeLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="explore" element={<Explore />} />
          <Route path="game/:id" element={<GameLayout />} />
        </Route>
        <Route path="/blank" element={<BlankPage />} />
      </Routes>
    </>
  );
}

export default App;
