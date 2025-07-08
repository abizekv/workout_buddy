import { Routes, Route } from "react-router";
//pages and components
import Navbar from "./components/Navbar";
import Home from "./pages/Home"


function App() {

  return (
    <>
      <Navbar />
      <main className="pages">
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
