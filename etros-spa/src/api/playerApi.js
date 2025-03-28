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

export const usePlayer = (playerId) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.players.getById.replace(":id", playerId);
        const response = await apiClient.get(url);
        setPlayer(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch player");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  return { player, loading, error };
};

export const useCreatePlayer = () => {
  const create = async (playerData) => {
    try {
      // Basic validation before making API call
      if (!playerData.name || !playerData.number || !playerData.bornYear) {
        throw new Error("Required fields missing");
      }

      // Ensure data types are correct
      const formattedData = {
        ...playerData,
        number: String(playerData.number),
        bornYear: Number(playerData.bornYear),
        weight: playerData.weight ? Number(playerData.weight) : undefined,
      };

      console.log("Sending player data to API:", formattedData);

      const response = await apiClient.post(
        API_ENDPOINTS.players.create,
        formattedData
      );

      // Check for success field in response as per API docs
      if (response.data && response.data.success === false) {
        // Server returned an error in the expected format
        const error = new Error(
          response.data.message || "Failed to create player"
        );
        error.errorCode = response.data.errorCode;
        error.details = response.data.details;
        throw error;
      }

      return response.data;
    } catch (error) {
      console.error("Error in createPlayer:", error);

      // If the error already has our expected format, just rethrow it
      if (error.errorCode) {
        throw error;
      }

      // If it's an Axios error with response data in our format
      if (error.response && error.response.data) {
        const { data } = error.response;

        // Check if API returned our standard error format
        if (data.success === false && data.errorCode) {
          const formattedError = new Error(data.message || "API Error");
          formattedError.errorCode = data.errorCode;
          formattedError.details = data.details;
          formattedError.status = data.status || error.response.status;
          throw formattedError;
        }
      }

      // For any other type of error, just rethrow it
      throw error;
    }
  };

  return { create };
};

export const useUpdatePlayer = () => {
  const update = async (playerId, playerData) => {
    const url = API_ENDPOINTS.players.update.replace(":id", playerId);
    const response = await apiClient.put(url, {
      ...playerData,
      _id: playerId,
    });
    return response.data;
  };

  return { update };
};

export const useDeletePlayer = () => {
  const deletePlayer = async (playerId) => {
    const url = API_ENDPOINTS.players.delete.replace(":id", playerId);
    const response = await apiClient.delete(url);
    return response.data;
  };

  return { deletePlayer };
};
