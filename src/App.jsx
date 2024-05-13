import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Penghuni from "./pages/Penghuni"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/penghuni" element={<Penghuni />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
