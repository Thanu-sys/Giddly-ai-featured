import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001/api/ai';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async (userId, location, limit = 10) => {
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
      setRecommendations(data.recommendations || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRecommendations = (userId, location) => {
    return fetchRecommendations(userId, location);
  };

  const dismissRecommendation = (eventId) => {
    setRecommendations(prev => prev.filter(event => event.id !== eventId));
  };

  const addToInterested = (eventId) => {
    // In real app, this would call an API
    console.log('Added to interested:', eventId);
  };

  return {
    recommendations,
    isLoading,
    error,
    fetchRecommendations,
    refreshRecommendations,
    dismissRecommendation,
    addToInterested
  };
};