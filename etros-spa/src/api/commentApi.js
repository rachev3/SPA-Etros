import { useState, useEffect, useCallback } from "react";
import apiClient from "./axiosConfig/axios";
import { API_ENDPOINTS } from "./axiosConfig/config";

// Helper to ensure comments are always returned as an array

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.comments.getAll);
      setComments(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, loading, error, refetch: fetchComments };
};

export const useArticleComments = (articleId, populateSettings = "author") => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticleComments = useCallback(async () => {
    if (!articleId) {
      setComments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let url = API_ENDPOINTS.comments.getByArticleId.replace(":id", articleId);

      // Add population parameters if provided
      if (populateSettings) {
        url += `?populate=${populateSettings}`;
      }

      const response = await apiClient.get(url);
      setComments(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch article comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [articleId, populateSettings]);

  useEffect(() => {
    fetchArticleComments();
  }, [fetchArticleComments]);

  return { comments, loading, error, refetch: fetchArticleComments };
};

export const useUserComments = (userId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserComments = useCallback(async () => {
    if (!userId) {
      setComments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const url = API_ENDPOINTS.comments.getByUserId.replace(":id", userId);
      const response = await apiClient.get(url);
      setComments(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch user comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserComments();
  }, [fetchUserComments]);

  return { comments, loading, error, refetch: fetchUserComments };
};

export const useCreateComment = () => {
  const create = async (commentData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.comments.create,
        commentData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error in createComment:", error);
      throw error;
    }
  };

  return { create };
};

export const useUpdateComment = () => {
  const update = async (commentId, commentData) => {
    try {
      const url = API_ENDPOINTS.comments.update.replace(":id", commentId);
      const response = await apiClient.put(url, {
        ...commentData,
        _id: commentId,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in updateComment:", error);
      throw error;
    }
  };

  return { update };
};

export const useDeleteComment = () => {
  const deleteComment = async (commentId) => {
    try {
      const url = API_ENDPOINTS.comments.delete.replace(":id", commentId);
      const response = await apiClient.delete(url);
      return response.data.data;
    } catch (error) {
      console.error("Error in deleteComment:", error);
      throw error;
    }
  };

  return { deleteComment };
};
