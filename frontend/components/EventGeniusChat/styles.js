import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    marginHorizontal: 8,
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#007AFF',
  },
  assistantBubble: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
  },
  assistantText: {
    color: '#1a1a1a',
    fontSize: 14,
    lineHeight: 18,
  },
  quickPromptsSection: {
    marginBottom: 20,
  },
  quickPromptsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  quickPrompt: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quickPromptText: {
    fontSize: 12,
    color: '#007AFF',
  },
  thinkingBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    marginLeft: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  thinkingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Event Cards Styles
  eventCardsContainer: {
    flexDirection: 'row',
  },
  eventCard: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  eventContent: {
    padding: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventCategory: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  eventPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 12,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rsvpButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  rsvpButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
  },
  shareButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  noEventsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noEventsText: {
    color: '#666',
    fontSize: 14,
  },
  // Summary Styles
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 12,
  },
  summaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryActionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryActionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  // Quick Actions Styles
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  quickAction: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
});