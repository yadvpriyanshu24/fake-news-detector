# Fake News Detector Dashboard

A MERN-based fake news detection dashboard that analyzes article credibility using rule-based logic.

## Features

- Fake / Genuine / Suspicious detection
- Confidence scoring
- News category detection
- Search history tracking
- Analytics dashboard
- Responsive UI

## Tech Stack

- React.js
- Node.js
- Express.js
- CSS

## Installation

### Clone Repository

```bash
git clone https://github.com/yadvpriyanshu24/fake-news-detector.git
```

### Install Frontend

```bash
cd client
npm install
npm start
```

### Install Backend

```bash
cd server
npm install
npm run dev
```

## Future Improvements

- AI/ML based fake news prediction
- Real news API integration
- Database support

## How It Works

The system checks:
- Suspicious keywords
- Clickbait headlines
- Excessive punctuation
- Trusted source patterns
- Category matching

## Based on these checks, it predicts
- Likely Fake
- Suspicious
- Likely Genuine
