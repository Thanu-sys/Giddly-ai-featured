import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const QuickActions = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <View style={styles.quickActionsContainer}>
      {actions.map((action, index) => (
        <TouchableOpacity key={index} style={styles.quickAction}>
          <Text style={styles.quickActionText}>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickActions;