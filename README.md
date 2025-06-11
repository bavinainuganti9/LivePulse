# LivePulse

## Overview / Description  
LivePulse is a real-time sentiment dashboard that streams data from Twitter and Reddit, analyzes sentiment using a transformer model, and visualizes trends through dynamic charts and word clouds. It’s ideal for monitoring public reaction during events like elections, product launches, or breaking news.

## Features  
- Live streaming from Twitter (X) and Reddit using Tweepy and PRAW  
- Real-time sentiment classification with DistilBERT  
- React dashboard with live-updating sentiment line chart  
- Word cloud of frequently used terms from social feeds  
- Scalable backend using FastAPI, Redis pub/sub, and threading  

## Architecture  
Backend: FastAPI service with streaming endpoints and sentiment processing  
Streaming: Twitter & Reddit listeners push data into Redis pub/sub  
NLP Model: DistilBERT-based sentiment analysis via HuggingFace Transformers  
Frontend: React app with Recharts and D3.js word cloud  

## Tech Stack  
Backend: Python, FastAPI, Tweepy, PRAW, Redis  
ML: HuggingFace Transformers (DistilBERT), Torch  
Frontend: React, Recharts, D3.js, Tailwind CSS  
