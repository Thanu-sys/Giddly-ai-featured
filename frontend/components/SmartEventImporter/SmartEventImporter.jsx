import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useEventAI } from '../../hooks/useEventAI';
import EventPreview from './EventPreview';
import styles from './styles';

const SmartEventImporter = ({ onEventImported }) => {
  const [importSource, setImportSource] = useState('');
  const [extractedEvent, setExtractedEvent] = useState(null);
  const { importEvent, isLoading } = useEventAI();

  const handleImport = async () => {
    if (!importSource.trim()) {
      Alert.alert('Error', 'Please enter event URL or description');
      return;
    }

    try {
      const result = await importEvent(importSource);
      
      if (result.success) {
        setExtractedEvent(result.event);
      } else {
        Alert.alert('Import Failed', result.error || 'Could not extract event details');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to import event. Please try again.');
    }
  };

  const handleConfirmImport = () => {
    if (extractedEvent && onEventImported) {
      onEventImported(extractedEvent);
      setExtractedEvent(null);
      setImportSource('');
      Alert.alert('Success', 'Event imported successfully!');
    }
  };

  const handleCancelImport = () => {
    setExtractedEvent(null);
    setImportSource('');
  };

  const examples = [
    "https://example.com/event/tech-conference-2025",
    "Yoga class every Saturday 9 AM at Central Park - Free",
    "Music festival downtown on Nov 25th, tickets $50"
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Event Import</Text>
        <Text style={styles.subtitle}>
          Paste event URL, description, or details. AI will extract the information automatically.
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.textInput}
          value={importSource}
          onChangeText={setImportSource}
          placeholder="Paste event URL or describe the event..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.importButton, isLoading && styles.importButtonDisabled]}
          onPress={handleImport}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.importButtonText}>✨ Extract Event Details</Text>
          )}
        </TouchableOpacity>

        <View style={styles.examplesSection}>
          <Text style={styles.examplesTitle}>Examples:</Text>
          {examples.map((example, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exampleItem}
              onPress={() => setImportSource(example)}
            >
              <Text style={styles.exampleText}>{example}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {extractedEvent && (
          <EventPreview
            event={extractedEvent}
            onConfirm={handleConfirmImport}
            onCancel={handleCancelImport}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default SmartEventImporter;