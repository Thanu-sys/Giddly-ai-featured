import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { formatEventDate, formatPrice, getEventCategoryIcon } from '../../utils/eventFormatters';
import styles from './styles';

const EventCards = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <View style={styles.noEventsContainer}>
        <Text style={styles.noEventsText}>No events found</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.eventCardsContainer}>
        {events.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventCategory}>
                  {getEventCategoryIcon(event.category)} {event.category}
                </Text>
                <Text style={styles.eventPrice}>{formatPrice(event.price)}</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>
                📅 {formatEventDate(event.date)} {event.time ? `• ${event.time}` : ''}
              </Text>
              <Text style={styles.eventLocation}>📍 {event.location}</Text>
              {event.description && (
                <Text style={styles.eventDescription}>{event.description}</Text>
              )}
              <View style={styles.eventActions}>
                <TouchableOpacity style={styles.rsvpButton}>
                  <Text style={styles.rsvpButtonText}>RSVP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default EventCards;