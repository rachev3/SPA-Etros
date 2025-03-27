import apiClient from "./axios";
import { handleApiError } from "./errorHandler";
import { API_ENDPOINTS } from "./config";

export const getAllArticles = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.articles.getAll);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getArticleById = async (id) => {
  try {
    const url = API_ENDPOINTS.articles.getById.replace(":id", id);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.articles.create,
      articleData
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const url = API_ENDPOINTS.articles.update.replace(":id", id);
    const response = await apiClient.put(url, articleData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteArticle = async (id) => {
  try {
    const url = API_ENDPOINTS.articles.delete.replace(":id", id);
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
