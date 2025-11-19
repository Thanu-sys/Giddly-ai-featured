// Format event date for display
export const formatEventDate = (dateString) => {
  if (!dateString) return 'Date TBD';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    }

    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }

    // Format as "Mon, Nov 20"
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date TBD';
  }
};

// Format event time for display
export const formatEventTime = (timeString) => {
  if (!timeString) return '';
  
  try {
    // Handle various time formats
    let time = timeString.trim();
    
    // If it's already in a nice format, return as is
    if (time.match(/^\d{1,2}:\d{2}\s*(AM|PM)$/i)) {
      return time;
    }
    
    // Try to parse and format
    const [hours, minutes] = time.split(':');
    if (hours && minutes) {
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes.padStart(2, '0')} ${period}`;
    }
    
    return time;
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};

// Format price for display
export const formatPrice = (price) => {
  if (!price) return 'Free';
  
  const priceStr = price.toString().trim();
  
  if (priceStr.toLowerCase() === 'free' || priceStr === '0' || priceStr === '$0') {
    return 'Free';
  }
  
  // Ensure price starts with $ if it's a number
  if (!isNaN(parseFloat(priceStr)) && !priceStr.includes('$')) {
    return `$${parseFloat(priceStr).toFixed(2)}`;
  }
  
  return priceStr;
};

// Get appropriate emoji for event category
export const getEventCategoryIcon = (category) => {
  if (!category) return '🎯';
  
  const icons = {
    music: '🎵',
    art: '🎨',
    sports: '⚽',
    food: '🍕',
    technology: '💻',
    tech: '💻',
    business: '💼',
    wellness: '🧘',
    yoga: '🧘',
    education: '📚',
    conference: '🎤',
    networking: '🤝',
    festival: '🎪',
    party: '🎉',
    workshop: '🔧',
    exhibition: '🖼️',
    meetup: '👥',
    charity: '❤️',
    community: '🏘️',
    default: '🎯'
  };
  
  return icons[category.toLowerCase()] || icons.default;
};

// Format location for display
export const formatLocation = (location) => {
  if (!location) return 'Location TBD';
  
  if (typeof location === 'string') {
    return location;
  }
  
  // Handle location object
  if (location.venue) {
    return location.venue;
  }
  
  if (location.address) {
    return location.address;
  }
  
  if (location.coordinates) {
    return 'See map for location';
  }
  
  return 'Location TBD';
};

// Truncate long text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Calculate time until event
export const getTimeUntilEvent = (eventDate) => {
  if (!eventDate) return '';
  
  try {
    const event = new Date(eventDate);
    const now = new Date();
    const diffTime = event - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Past event';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays < 7) {
      return `In ${diffDays} days`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `In ${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `In ${months} month${months > 1 ? 's' : ''}`;
    }
  } catch (error) {
    console.error('Error calculating time until event:', error);
    return '';
  }
};

// Format event for sharing
export const formatEventForSharing = (event) => {
  const lines = [];
  
  if (event.title) {
    lines.push(`🎉 ${event.title}`);
  }
  
  if (event.date) {
    lines.push(`📅 ${formatEventDate(event.date)}`);
  }
  
  if (event.time) {
    lines.push(`⏰ ${formatEventTime(event.time)}`);
  }
  
  if (event.location) {
    lines.push(`📍 ${formatLocation(event.location)}`);
  }
  
  if (event.price) {
    lines.push(`💰 ${formatPrice(event.price)}`);
  }
  
  return lines.join('\n');
};