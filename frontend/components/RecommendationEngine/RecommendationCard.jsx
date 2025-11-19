import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { formatEventDate, formatPrice, getEventCategoryIcon } from '../../utils/eventFormatters';
import styles from './styles';

const RecommendationCard = ({ event, onRSVP, onShare, onDismiss }) => {
  const handleRSVP = () => {
    if (onRSVP) onRSVP(event);
  };

  const handleShare = () => {
    if (onShare) onShare(event);
  };

  const handleDismiss = () => {
    if (onDismiss) onDismiss(event.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryIcon}>
            {getEventCategoryIcon(event.category)}
          </Text>
          <Text style={styles.categoryText}>{event.category}</Text>
        </View>
        <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
          <Text style={styles.dismissText}>✕</Text>
        </TouchableOpacity>
      </View>

      {event.image && (
        <Image source={{ uri: event.image }} style={styles.eventImage} />
      )}

      <View style={styles.cardContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        
        <View style={styles.eventDetails}>
          <Text style={styles.eventDetail}>📅 {formatEventDate(event.date)}</Text>
          <Text style={styles.eventDetail}>📍 {event.location}</Text>
          <Text style={styles.eventDetail}>💰 {formatPrice(event.price)}</Text>
        </View>

        {event.description && (
          <Text style={styles.eventDescription} numberOfLines={2}>
            {event.description}
          </Text>
        )}

        {event.matchScore && (
          <View style={styles.matchContainer}>
            <Text style={styles.matchText}>Match: {event.matchScore}%</Text>
            <View style={styles.matchBar}>
              <View 
                style={[
                  styles.matchProgress, 
                  { width: `${event.matchScore}%` }
                ]} 
              />
            </View>
          </View>
        )}

        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.rsvpButton} onPress={handleRSVP}>
            <Text style={styles.rsvpButtonText}>Interested</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecommendationCard;