import { useCallback } from "react";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/articleApi";

export const useArticle = () => {
  const getAll = useCallback(async () => {
    try {
      const data = await getAllArticles();
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const getById = useCallback(async (id) => {
    try {
      const data = await getArticleById(id);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const create = useCallback(async (articleData) => {
    try {
      const data = await createArticle(articleData);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const update = useCallback(async (id, articleData) => {
    try {
      const data = await updateArticle(id, articleData);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      const data = await deleteArticle(id);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};

// export const useAuth = () => {
//   const { login, logout, user, loading, isAuthenticated } = useUser();

//   const register = useCallback(async (userData) => {
//     try {
//       const data = await registerUser(userData);
//       return data;
//     } catch (err) {
//       throw err;
//     }
//   }, []);

//   const handleLogin = useCallback(
//     async (credentials) => {
//       try {
//         const data = await loginUser(credentials);
//         login(data);
//         return data;
//       } catch (err) {
//         throw err;
//       }
//     },
//     [login]
//   );

//   return {
//     user,
//     loading,
//     register,
//     login: handleLogin,
//     logout,
//     isAuthenticated,
//   };
// };
