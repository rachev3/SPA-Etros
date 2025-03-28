// export const API_BASE_URL = "https://etrosapi.onrender.com/api";
export const API_BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    user: "/auth/user",
  },
  articles: {
    getAll: "/articles",
    getById: "/articles/:id",
    create: "/articles",
    update: "/articles/:id",
    delete: "/articles/:id",
  },
  players: {
    getAll: "/players",
    getById: "/players/:id",
    create: "/players",
    update: "/players/:id",
    delete: "/players/:id",
  },
  matches: {
    getAll: "/matches",
    getById: "/matches/:id",
    create: "/matches",
    update: "/matches/:id",
    delete: "/matches/:id",
  },
  playerStats: {
    getAll: "/player-stats",
    getByPlayerId: "/player-stats/player/:id",
    getByMatchId: "/player-stats/match/:id",
    create: "/player-stats",
    update: "/player-stats/:id",
    delete: "/player-stats/:id",
  },
};
