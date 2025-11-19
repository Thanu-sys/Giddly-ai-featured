import { formatEventDate, formatPrice } from './eventFormatters';

// Generate quick prompts based on user preferences
export const generateQuickPrompts = (preferences) => {
  const basePrompts = [
    "Find free events this weekend",
    "What's trending near me?",
    "Networking events for professionals",
    "Art and culture exhibitions",
    "Family-friendly activities"
  ];

  if (!preferences) return basePrompts;

  const interestPrompts = preferences.interests?.map(
    interest => `Find ${interest} events`
  ) || [];

  const categoryPrompts = preferences.categories?.map(
    category => `${category.charAt(0).toUpperCase() + category.slice(1)} events near me`
  ) || [];

  // Remove duplicates and limit to 6 prompts
  const allPrompts = [...new Set([...interestPrompts, ...categoryPrompts, ...basePrompts])];
  return allPrompts.slice(0, 6);
};

// Calculate match score between event and user preferences
export const calculateMatchScore = (event, userPreferences) => {
  if (!userPreferences) return 50;

  let score = 50; // Base score

  // Category matching
  if (userPreferences.categories?.includes(event.category)) {
    score += 20;
  }

  // Interest matching
  const interestMatch = userPreferences.interests?.some(interest => 
    event.title.toLowerCase().includes(interest.toLowerCase()) ||
    event.description?.toLowerCase().includes(interest.toLowerCase()) ||
    event.category?.toLowerCase().includes(interest.toLowerCase())
  );
  
  if (interestMatch) {
    score += 15;
  }

  // Price preference matching
  if (userPreferences.priceRange === 'free' && event.price === 'Free') {
    score += 10;
  } else if (userPreferences.priceRange === 'under_20' && 
             event.price !== 'Free' && 
             parseFloat(event.price.replace('$', '')) < 20) {
    score += 10;
  } else if (userPreferences.priceRange === 'under_50' && 
             event.price !== 'Free' && 
             parseFloat(event.price.replace('$', '')) < 50) {
    score += 5;
  }

  return Math.min(Math.max(score, 0), 100);
};

// Format AI response for display
export const formatAIResponse = (response) => {
  if (!response) return null;

  const { text, type, events, summary, quickActions } = response;

  // Format events if present
  const formattedEvents = events?.map(event => ({
    ...event,
    formattedDate: formatEventDate(event.date),
    formattedPrice: formatPrice(event.price),
    matchScore: calculateMatchScore(event, {}) // You'd pass actual user prefs here
  }));

  return {
    text: text || "I'm not sure how to respond to that.",
    type: type || 'text',
    events: formattedEvents,
    summary,
    quickActions: quickActions || []
  };
};

// Extract search parameters from natural language
export const extractSearchParams = (query) => {
  const params = {
    query: '',
    category: null,
    priceRange: null,
    dateRange: null,
    location: null
  };

  // Simple keyword matching - in real app, use AI for this
  const lowerQuery = query.toLowerCase();

  // Categories
  const categories = ['music', 'art', 'sports', 'food', 'tech', 'business', 'wellness', 'education'];
  const foundCategory = categories.find(cat => lowerQuery.includes(cat));
  if (foundCategory) {
    params.category = foundCategory;
  }

  // Price ranges
  if (lowerQuery.includes('free') || lowerQuery.includes('no cost')) {
    params.priceRange = 'free';
  } else if (lowerQuery.includes('cheap') || lowerQuery.includes('under $20')) {
    params.priceRange = 'under_20';
  } else if (lowerQuery.includes('under $50')) {
    params.priceRange = 'under_50';
  }

  // Date ranges
  if (lowerQuery.includes('today')) {
    params.dateRange = 'today';
  } else if (lowerQuery.includes('tomorrow')) {
    params.dateRange = 'tomorrow';
  } else if (lowerQuery.includes('weekend') || lowerQuery.includes('saturday') || lowerQuery.includes('sunday')) {
    params.dateRange = 'weekend';
  } else if (lowerQuery.includes('next week')) {
    params.dateRange = 'next_week';
  }

  params.query = query;

  return params;
};

// Validate event data
export const validateEventData = (eventData) => {
  const errors = [];

  if (!eventData.title?.trim()) {
    errors.push('Event title is required');
  }

  if (!eventData.date) {
    errors.push('Event date is required');
  }

  if (!eventData.location?.trim()) {
    errors.push('Event location is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};