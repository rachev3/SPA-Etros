export const API_BASE_URL = "https://etrosapi.onrender.com/api";

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
};
