class PreferenceService {
  constructor() {
    this.userPreferences = new Map();
  }

  async getUserPreferences(userId) {
    return this.userPreferences.get(userId) || this.getDefaultPreferences();
  }

  async updateUserPreferences(userId, updates) {
    const current = await this.getUserPreferences(userId);
    const updated = { ...current, ...updates, updatedAt: new Date() };
    this.userPreferences.set(userId, updated);
    return updated;
  }

  getDefaultPreferences() {
    return {
      interests: [],
      categories: ['technology', 'business', 'arts'],
      priceRange: 'any',
      locationRadius: 10,
      notificationSettings: {
        eventReminders: true,
        newRecommendations: true
      },
      createdAt: new Date()
    };
  }
}

export const preferenceService = new PreferenceService();