import { useState, useEffect, useCallback } from "react";
import apiClient from "./axiosConfig/axios";
// import { handleApiError } from "./errorHandler";
import { API_ENDPOINTS } from "./axiosConfig/config";

// Hooks
export const useMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.matches.getAll);
      setMatches(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch matches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, refetch: fetchMatches };
};

export const useMatch = (matchId) => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.matches.getById.replace(":id", matchId);
        const response = await apiClient.get(url);
        setMatch(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch match");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  return { match, loading, error };
};

export const useCreateMatch = () => {
  const create = async (matchData) => {
    const response = await apiClient.post(
      API_ENDPOINTS.matches.create,
      matchData
    );
    return response.data.data;
  };

  return { create };
};

export const useUpdateMatch = () => {
  const update = async (matchId, matchData) => {
    const url = API_ENDPOINTS.matches.update.replace(":id", matchId);
    const response = await apiClient.put(url, {
      ...matchData,
      _id: matchId,
    });
    return response.data.data;
  };

  return { update };
};

export const useDeleteMatch = () => {
  const deleteMatch = async (matchId) => {
    const url = API_ENDPOINTS.matches.delete.replace(":id", matchId);
    const response = await apiClient.delete(url);
    return response.data.data;
  };

  return { deleteMatch };
};
