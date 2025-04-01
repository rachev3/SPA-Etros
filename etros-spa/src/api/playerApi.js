import { useState, useEffect, useCallback } from "react";
import apiClient from "./axiosConfig/axios";
import { API_ENDPOINTS } from "./axiosConfig/config";

export const usePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.players.getAll);
      setPlayers(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch players");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return { players, loading, error, refetch: fetchPlayers };
};

export const usePlayer = (playerId, populateSettings) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!playerId) {
        setPlayer(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let url = API_ENDPOINTS.players.getById.replace(":id", playerId);

        if (populateSettings) {
          url += `?populate=${populateSettings}`;
        }

        const response = await apiClient.get(url);
        setPlayer(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch player");
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId, populateSettings]);

  return { player, loading, error };
};

export const useCreatePlayer = () => {
  const create = async (playerData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.players.create,
        playerData
      );
      return response.data;
    } catch (error) {
      console.error("Error in createPlayer:", error);
      throw error;
    }
  };

  return { create };
};

export const useUpdatePlayer = () => {
  const update = async (playerId, playerData) => {
    try {
      const url = API_ENDPOINTS.players.update.replace(":id", playerId);
      const response = await apiClient.put(url, {
        ...playerData,
        _id: playerId,
      });
      return response.data;
    } catch (error) {
      console.error("Error in updatePlayer:", error);
      throw error;
    }
  };

  return { update };
};

export const useDeletePlayer = () => {
  const deletePlayer = async (playerId) => {
    try {
      const url = API_ENDPOINTS.players.delete.replace(":id", playerId);
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      console.error("Error in deletePlayer:", error);
      throw error;
    }
  };

  return { deletePlayer };
};
