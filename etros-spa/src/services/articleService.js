import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/articleApi";

// Additional service-level functions can be added here
export const getArticleBySlug = async (slug) => {
  try {
    const articles = await getAllArticles();
    return articles.find((article) => article.slug === slug);
  } catch (error) {
    throw error;
  }
};

export const getArticlesByCategory = async (category) => {
  try {
    const articles = await getAllArticles();
    return articles.filter((article) => article.category === category);
  } catch (error) {
    throw error;
  }
};

export const getArticlesByAuthor = async (authorId) => {
  try {
    const articles = await getAllArticles();
    return articles.filter((article) => article.authorId === authorId);
  } catch (error) {
    throw error;
  }
};

export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
