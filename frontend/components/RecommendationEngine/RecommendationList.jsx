import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import RecommendationCard from './RecommendationCard';
import styles from './styles';

const RecommendationList = ({ 
  recommendations, 
  onRSVP, 
  onShare, 
  onDismiss,
  onRefresh,
  isLoading 
}) => {
  const renderRecommendation = ({ item }) => (
    <RecommendationCard
      event={item}
      onRSVP={onRSVP}
      onShare={onShare}
      onDismiss={onDismiss}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Finding great events for you...</Text>
      </View>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No recommendations yet</Text>
        <Text style={styles.emptyText}>
          Complete your profile or explore more events to get personalized recommendations!
        </Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Text style={styles.refreshButtonText}>Refresh Recommendations</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommended for You</Text>
        <Text style={styles.subtitle}>
          Personalized events based on your interests and activity
        </Text>
      </View>

      <FlatList
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default RecommendationList;