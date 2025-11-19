import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { useEventAI } from '../hooks/useEventAI';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { generateQuickPrompts } from '../utils/aiHelpers';
import styles from './EventGeniusChat/styles';

// Sub-components
const EventCards = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.eventCardsContainer}>
        {events.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventCategory}>{event.category}</Text>
                <Text style={styles.eventPrice}>{event.price}</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>📅 {event.date}</Text>
              <Text style={styles.eventLocation}>📍 {event.location}</Text>
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

const EventSummary = ({ summary }) => {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>📋 Event Summary</Text>
      <Text style={styles.summaryText}>{summary}</Text>
      <View style={styles.summaryActions}>
        <TouchableOpacity style={styles.summaryActionButton}>
          <Text style={styles.summaryActionText}>Add to Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryActionButton}>
          <Text style={styles.summaryActionText}>Share with Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const QuickActions = ({ actions, onActionPress }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <View style={styles.quickActionsContainer}>
      {actions.map((action, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.quickAction}
          onPress={() => onActionPress?.(action)}
        >
          <Text style={styles.quickActionText}>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Main Component
const EventGeniusChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm EventGenius 🎯 I can help you find events, get recommendations, or summarize event details. What would you like to explore?",
      type: 'text',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const { sendMessage, isLoading, error } = useEventAI();
  const { preferences, location } = useUserPreferences();
  const flatListRef = useRef(null);

  const quickPrompts = generateQuickPrompts(preferences);

  useEffect(() => {
    if (error) {
      Alert.alert('Connection Error', error);
    }
  }, [error]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputText,
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      const aiResponse = await sendMessage(inputText, {
        userLocation: location,
        userPreferences: preferences,
        chatHistory: messages
      });

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        ...aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please check your connection and try again.",
        type: 'text',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInputText(prompt);
  };

  const handleQuickAction = (action) => {
    // Handle quick actions like "Show more events", "Refine search", etc.
    console.log('Quick action:', action);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userContainer : styles.assistantContainer
      ]}>
        {!isUser && (
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=50&h=50&fit=crop' }}
            style={styles.avatar}
          />
        )}
        
        <View style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.assistantBubble
        ]}>
          {item.type === 'event_cards' ? (
            <EventCards events={item.events} />
          ) : item.type === 'summary' ? (
            <EventSummary summary={item.summary} />
          ) : (
            <Text style={isUser ? styles.userText : styles.assistantText}>
              {item.content}
            </Text>
          )}
          
          {item.quickActions && (
            <QuickActions 
              actions={item.quickActions} 
              onActionPress={handleQuickAction}
            />
          )}
        </View>

        {isUser && (
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop' }}
            style={styles.avatar}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=50&h=50&fit=crop' }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerTitle}>EventGenius</Text>
            <Text style={styles.headerSubtitle}>AI Event Assistant</Text>
          </View>
        </View>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: isLoading ? '#FFA500' : '#4CAF50' }]} />
          <Text style={styles.statusText}>
            {isLoading ? 'Thinking...' : 'Online'}
          </Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListHeaderComponent={
          <View style={styles.quickPromptsSection}>
            <Text style={styles.quickPromptsTitle}>Try asking:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {quickPrompts.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickPrompt}
                  onPress={() => handleQuickPrompt(prompt)}
                >
                  <Text style={styles.quickPromptText}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about events, get recommendations..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            (!inputText.trim() || isLoading) && styles.sendButtonDisabled
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EventGeniusChat;