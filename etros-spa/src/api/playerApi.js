import apiClient from "./axiosConfig/axios";
import { handleApiError } from "./errorHandler";
import { API_ENDPOINTS } from "./axiosConfig/config";

export const getAllPlayers = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.players.getAll);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getPlayerById = async (id) => {
  try {
    const url = API_ENDPOINTS.players.getById.replace(":id", id);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createPlayer = async (playerData) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.players.create,
      playerData
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updatePlayer = async (id, playerData) => {
  try {
    const url = API_ENDPOINTS.players.update.replace(":id", id);
    const response = await apiClient.put(url, playerData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deletePlayer = async (id) => {
  try {
    const url = API_ENDPOINTS.players.delete.replace(":id", id);
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
