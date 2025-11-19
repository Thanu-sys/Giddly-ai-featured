import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const EventSummary = ({ summary }) => {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>📋 Event Summary</Text>
      <Text style={styles.summaryText}>{summary}</Text>
      <View style={styles.summaryActions}>
        <TouchableOpacity style={styles.summaryActionButton}>
          <Text style={styles.summaryActionText}>📅 Add to Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryActionButton}>
          <Text style={styles.summaryActionText}>👥 Share with Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventSummary;