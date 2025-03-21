import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Home/HomePage";
import TeamPage from "./components/Team/TeamPage";
import SchedulePage from "./components/Schedule/SchedulePage";
import NewsPage from "./components/News/NewsPage";
import AboutPage from "./components/About/AboutPage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import PlayerDetailsPage from "./components/Team/PlayerDetailsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      {/* <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50"> */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/player/:id" element={<PlayerDetailsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
