import "./App.css";
import HomePage from "./components/Home/HomePage";
import TeamPage from "./components/Team/TeamPage";
import SchedulePage from "./components/Schedule/SchedulePage";
import NewsPage from "./components/News/NewsPage";
import AboutPage from "./components/About/AboutPage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import PlayerDetailsPage from "./components/Team/PlayerDetailsPage";
import ArticlePage from "./components/News/Article/ArticlePage";
import AdminLayout from "./layout/AdminLayout";
import MainLayout from "./layout/MainLayout";
import NewsManagement from "./components/Admin/News/NewsManagement";
import MatchesManagement from "./components/Admin/Matches/MatchesManagement";
import PlayersManagement from "./components/Admin/Players/PlayersManagement";
import PlayerStatisticsManagement from "./components/Admin/Statistics/PlayerStatisticsManagement";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AdminRoute from "./components/Auth/AdminRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import MatchDetails from "./components/Match/MatchDetails";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Admin Routes with Admin Layout */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
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
            <Route path="/match/:id" element={<MatchDetails />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/article/:id" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
