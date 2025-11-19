class SearchService {
  async searchEvents({ query, location, category, date }) {
    // Mock search implementation
    const allEvents = await this.getMockEvents();
    
    return allEvents.filter(event => {
      if (query && !event.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (category && event.category !== category) return false;
      return true;
    });
  }

  async getMockEvents() {
    return [
      {
        id: 1,
        title: "Weekend Yoga Class",
        date: "2025-11-20",
        location: "Yoga Studio Downtown",
        price: "$20",
        category: "wellness"
      },
      {
        id: 2,
        title: "Tech Conference 2025",
        date: "2025-11-25",
        location: "Convention Center",
        price: "$100",
        category: "technology"
      }
    ];
  }
}

export const searchService = new SearchService();