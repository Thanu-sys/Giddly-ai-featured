import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { formatEventDate, formatPrice } from '../../utils/eventFormatters';
import styles from './styles';

const EventPreview = ({ event, onConfirm, onCancel }) => {
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewTitle}>📋 Extracted Event</Text>
      
      <ScrollView style={styles.previewContent}>
        <View style={styles.previewField}>
          <Text style={styles.fieldLabel}>Title:</Text>
          <Text style={styles.fieldValue}>{event.title || 'Not specified'}</Text>
        </View>
        
        <View style={styles.previewField}>
          <Text style={styles.fieldLabel}>Date:</Text>
          <Text style={styles.fieldValue}>
            {event.date ? formatEventDate(event.date) : 'Not specified'}
          </Text>
        </View>
        
        <View style={styles.previewField}>
          <Text style={styles.fieldLabel}>Time:</Text>
          <Text style={styles.fieldValue}>{event.time || 'Not specified'}</Text>
        </View>
        
        <View style={styles.previewField}>
          <Text style={styles.fieldLabel}>Location:</Text>
          <Text style={styles.fieldValue}>{event.location || 'Not specified'}</Text>
        </View>
        
        <View style={styles.previewField}>
          <Text style={styles.fieldLabel}>Price:</Text>
          <Text style={styles.fieldValue}>{formatPrice(event.price) || 'Not specified'}</Text>
        </View>
        
        {event.description && (
          <View style={styles.previewField}>
            <Text style={styles.fieldLabel}>Description:</Text>
            <Text style={styles.fieldValue}>{event.description}</Text>
          </View>
        )}
        
        {event.organizer && (
          <View style={styles.previewField}>
            <Text style={styles.fieldLabel}>Organizer:</Text>
            <Text style={styles.fieldValue}>{event.organizer}</Text>
          </View>
        )}
        
        {event.category && (
          <View style={styles.previewField}>
            <Text style={styles.fieldLabel}>Category:</Text>
            <Text style={styles.fieldValue}>{event.category}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.previewActions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmButtonText}>Add to Giddly</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventPreview;