import { useState, useEffect, useCallback } from "react";
import apiClient from "./axiosConfig/axios";
import { API_ENDPOINTS } from "./axiosConfig/config";

export const usePlayerStats = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayerStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.playerStats.getAll);
      setPlayerStats(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch playerStats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayerStats();
  }, [fetchPlayerStats]);

  return { playerStats, loading, error, refetch: fetchPlayerStats };
};

export const usePlayerStatsByPlayerId = (playerId) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.playerStats.getByPlayerId.replace(
          ":id",
          playerId
        );
        const response = await apiClient.get(url);
        setPlayerStats(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch playerStats");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  return { playerStats, loading, error };
};

export const usePlayerStatsByMatchId = (matchId) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.playerStats.getByMatchId.replace(
          ":id",
          matchId
        );
        const response = await apiClient.get(url);
        setPlayerStats(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch playerStats");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [matchId]);

  return { playerStats, loading, error };
};

export const useCreatePlayerStats = () => {
  const create = async (playerStatsData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.playerStats.create,
        playerStatsData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error in createPlayerStats:", error);
    }
  };

  return { create };
};

export const useUpdatePlayerStats = () => {
  const update = async (playerStatsId, playerStatsData) => {
    const url = API_ENDPOINTS.playerStats.update.replace(":id", playerStatsId);
    const response = await apiClient.put(url, {
      ...playerStatsData,
      _id: playerStatsId,
    });
    return response.data.data;
  };

  return { update };
};

export const useDeletePlayerStats = () => {
  const deletePlayerStats = async (playerStatsId) => {
    const url = API_ENDPOINTS.playerStats.delete.replace(":id", playerStatsId);
    const response = await apiClient.delete(url);
    return response.data.data;
  };

  return { deletePlayerStats };
};
