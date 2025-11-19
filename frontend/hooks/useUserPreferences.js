import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences on mount
  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      // Simulate loading from storage/API
      setIsLoading(true);
      
      // Mock data - in real app, this would come from AsyncStorage or API
      const mockPreferences = {
        interests: ['technology', 'networking', 'workshops', 'yoga'],
        categories: ['business', 'technology', 'arts', 'wellness'],
        priceRange: 'any',
        locationRadius: 10,
        notificationSettings: {
          eventReminders: true,
          newRecommendations: true,
          trendingEvents: false
        }
      };

      const mockLocation = {
        city: 'New York',
        country: 'USA',
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      };

      setPreferences(mockPreferences);
      setLocation(mockLocation);
    } catch (error) {
      console.error('Failed to load user preferences:', error);
      Alert.alert('Error', 'Failed to load user preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      setPreferences(prev => ({
        ...prev,
        ...newPreferences,
        updatedAt: new Date()
      }));

      // In real app, save to storage/API
      console.log('Preferences updated:', newPreferences);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      Alert.alert('Error', 'Failed to update preferences');
      throw error;
    }
  };

  const updateLocation = async (newLocation) => {
    try {
      setLocation(prev => ({
        ...prev,
        ...newLocation
      }));

      // In real app, save to storage/API
      console.log('Location updated:', newLocation);
    } catch (error) {
      console.error('Failed to update location:', error);
      Alert.alert('Error', 'Failed to update location');
      throw error;
    }
  };

  const addInterest = async (interest) => {
    if (!preferences.interests.includes(interest)) {
      await updatePreferences({
        interests: [...preferences.interests, interest]
      });
    }
  };

  const removeInterest = async (interest) => {
    await updatePreferences({
      interests: preferences.interests.filter(i => i !== interest)
    });
  };

  const updateNotificationSettings = async (settings) => {
    await updatePreferences({
      notificationSettings: {
        ...preferences.notificationSettings,
        ...settings
      }
    });
  };

  return {
    preferences,
    location,
    isLoading,
    updatePreferences,
    updateLocation,
    addInterest,
    removeInterest,
    updateNotificationSettings,
    refreshPreferences: loadUserPreferences
  };
};