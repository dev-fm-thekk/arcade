import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Explore from "./pages/Explore"

function App() {
  return (
     <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="explore" element={<Explore />} />
      </Route>
    </Routes>
  )
}

export default App
