import "./App.css";
import HomePage from "./components/Home/HomePage";
import TeamPage from "./components/Team/TeamPage";
import SchedulePage from "./components/Schedule/SchedulePage";
import NewsPage from "./components/News/NewsPage";
import AboutPage from "./components/About/AboutPage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import PlayerDetailsPage from "./components/Team/PlayerDetailsPage";
import ArticlePage from "./components/News/ArticlePage";
import AdminLayout from "./layout/AdminLayout";
import MainLayout from "./layout/MainLayout";
import NewsManagement from "./components/Admin/NewsManagement";
import MatchesManagement from "./components/Admin/MatchesManagement";
import PlayersManagement from "./components/Admin/PlayersManagement";
import PlayerStatisticsManagement from "./components/Admin/PlayerStatisticsManagement";

import { BrowserRouter as Router, Routes, Route } from "react-router";
<<<<<<< HEAD
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Admin Routes with Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<NewsManagement />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="matches" element={<MatchesManagement />} />
            <Route path="players" element={<PlayersManagement />} />
            <Route
              path="player-statistics"
              element={<PlayerStatisticsManagement />}
            />
          </Route>

          {/* Public Routes with Main Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/player/:id" element={<PlayerDetailsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/article/:id" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
=======

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes with Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<NewsManagement />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="matches" element={<MatchesManagement />} />
          <Route path="players" element={<PlayersManagement />} />
          <Route
            path="player-statistics"
            element={<PlayerStatisticsManagement />}
          />
        </Route>

        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/player/:id" element={<PlayerDetailsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/article/:id" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
>>>>>>> origin/main
  );
}

export default App;
