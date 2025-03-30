import { useState, useEffect, useCallback } from "react";
import apiClient from "./axiosConfig/axios";
import { API_ENDPOINTS } from "./axiosConfig/config";

export const useArticles = (page = 1, limit) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 0,
    totalPages: 1,
    totalResults: 0,
  });

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      // Construct URL with pagination parameters
      let url = API_ENDPOINTS.articles.getAll;
      const params = new URLSearchParams();

      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await apiClient.get(url);

      // Set articles from the response data
      setArticles(response.data.data || []);

      // Set pagination metadata
      setPagination({
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages,
        totalResults: response.data.pagination.totalResults,
      });

      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch articles");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    pagination,
    refetch: fetchArticles,
  };
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
        setArticle(response.data.data);
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
      return response.data.data;
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
      return response.data.data;
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
      return response.data.data;
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
