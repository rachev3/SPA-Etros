import { useState, useEffect, useCallback } from "react";
import apiClient from "./axiosConfig/axios";
import { API_ENDPOINTS } from "./axiosConfig/config";

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.articles.getAll);
      setArticles(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: fetchArticles };
};

export const useArticle = (articleId) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.articles.getById.replace(":id", articleId);
        const response = await apiClient.get(url);
        setArticle(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  return { article, loading, error };
};

export const useCreateArticle = () => {
  const create = async (articleData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.articles.create,
        articleData
      );
      return response.data;
    } catch (err) {
      throw new Error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to create article"
      );
    }
  };

  return { create };
};

export const useUpdateArticle = () => {
  const update = async (articleId, articleData) => {
    const url = API_ENDPOINTS.articles.update.replace(":id", articleId);
    try {
      const response = await apiClient.put(url, {
        ...articleData,
        _id: articleId,
      });
      return response.data;
    } catch (err) {
      throw new Error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update article"
      );
    }
  };

  return { update };
};

export const useDeleteArticle = () => {
  const deleteArticle = async (articleId) => {
    const url = API_ENDPOINTS.articles.delete.replace(":id", articleId);
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (err) {
      throw new Error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to delete article"
      );
    }
  };

  return { deleteArticle };
};
