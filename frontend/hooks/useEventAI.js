import { useState, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:3001/api/ai';

export const useEventAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message, context = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          ...context
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMsg = err.message || 'Failed to connect to AI service';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const importEvent = useCallback(async (source) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source })
      });

      if (!response.ok) {
        throw new Error('Failed to import event');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMsg = err.message || 'Import failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRecommendations = useCallback(async (userId, location, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        userId: userId || 'demo-user',
        limit: limit.toString(),
        ...(location && {
          city: location.city,
          country: location.country
        })
      });

      const response = await fetch(`${API_BASE_URL}/recommendations?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMsg = err.message || 'Failed to get recommendations';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    importEvent,
    getRecommendations,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};