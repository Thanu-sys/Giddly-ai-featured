Giddly AI – Event Discovery Assistant

Giddly AI is an AI-powered event discovery and recommendation system that helps users instantly find relevant activities such as tech events, yoga classes, music concerts, business meetups, and art exhibitions.
The goal is simple: type what you want → get curated event results instantly.

🚀 Features

AI Chat Interface – Users can talk naturally, and the system interprets their intent.

Smart Event Matching – Detects categories like tech, yoga, music, art, business, and more.

Dynamic Event Cards – Clean UI for listing events with title, date, price, and location.

Quick Actions – Instant suggestions like “More yoga events” or “Get recommendations”.

Google Gemini Integration – If API fails, smart mock responses ensure uninterrupted experience.

🧠 Tech Stack

Backend

Node.js

Express

Google Gemini API

Smart Mock Engine (fallback)

Frontend

React

Custom Chat UI Components

Event Cards, Recommendations, Quick Actions

🔌 API Endpoints
POST /api/ai/chat

Send a message and receive AI-generated or mocked event responses.

GET /api/health

Simple health check.

📦 Installation
git clone <repo-url>
cd giddly-ai-features/backend
npm install
npm start


Frontend setup depends on your React structure.

🎯 Vision

Giddly AI aims to make event discovery effortless by combining natural language understanding with dynamic event recommendations — giving users a fast, seamless search experience.
