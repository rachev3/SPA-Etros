import { useState, useEffect, useCallback } from "react";
import apiClient from "./axiosConfig/axios";
import { API_ENDPOINTS } from "./axiosConfig/config";

export const useMatches = (
  page = 1,
  limit,
  filters,
  populateSettings = null
) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 0,
    totalPages: 1,
    totalResults: 0,
  });
  // http://localhost:5000/api/matches?populate=playerStats:player
  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      // Construct URL with pagination parameters
      let url = API_ENDPOINTS.matches.getAll;
      const params = new URLSearchParams();

      // Add pagination params
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);

      // Add filter params only if filters exist and are not empty
      if (
        filters &&
        typeof filters === "object" &&
        Object.keys(filters).length > 0
      ) {
        Object.entries(filters).forEach(([key, value]) => {
          if (typeof value === "object") {
            // Handle operators like [gt], [lt], [in], etc.
            Object.entries(value).forEach(([operator, operatorValue]) => {
              params.append(`${key}[${operator}]`, operatorValue);
            });
          } else {
            // Handle direct equality filters
            params.append(key, value);
          }
        });
      }

      // Handle population based on the provided settings
      if (populateSettings) {
        params.append("populate", populateSettings);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await apiClient.get(url);

      setMatches(response.data.data || []);
      setPagination({
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages,
        totalResults: response.data.pagination.totalResults,
      });

      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch matches");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters, populateSettings]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, pagination, refetch: fetchMatches };
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
