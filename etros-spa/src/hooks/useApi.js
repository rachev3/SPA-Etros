import { useState, useCallback } from "react";
import apiClient, { handleApiError } from "../utils/apiUtils";

export const useApi = (initialUrl = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  const fetchData = useCallback(
    async (newUrl = url, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get(newUrl, options);
        setData(response.data);
        setLoading(false);
        return response.data;
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError);
        setLoading(false);
        throw apiError;
      }
    },
    [url]
  );

  const postData = useCallback(
    async (newUrl = url, postData = {}, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.post(newUrl, postData, options);
        setData(response.data);
        setLoading(false);
        return response.data;
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError);
        setLoading(false);
        throw apiError;
      }
    },
    [url]
  );

  const putData = useCallback(
    async (newUrl = url, putData = {}, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.put(newUrl, putData, options);
        setData(response.data);
        setLoading(false);
        return response.data;
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError);
        setLoading(false);
        throw apiError;
      }
    },
    [url]
  );

  const deleteData = useCallback(
    async (newUrl = url, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.delete(newUrl, options);
        setData(response.data);
        setLoading(false);
        return response.data;
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError);
        setLoading(false);
        throw apiError;
      }
    },
    [url]
  );

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
    setUrl,
    setData,
  };
};
