import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Home/HomePage";

import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
