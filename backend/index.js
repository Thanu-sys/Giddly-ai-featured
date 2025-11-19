import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Giddly AI Server running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Chat: POST http://localhost:${PORT}/api/ai/chat`);
  console.log(`💡 Using SMART MOCK RESPONSES - Different for each category!`);
});
