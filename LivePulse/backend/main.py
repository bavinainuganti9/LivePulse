from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import streamers
import redis
import threading
import os

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

r = redis.from_url(os.getenv("REDIS_URL"))

@app.on_event("startup")
def startup_event():
    threading.Thread(target=streamers.start_twitter, daemon=True).start()
    threading.Thread(target=streamers.start_reddit, daemon=True).start()

@app.get("/stream")
def get_stream():
    pubsub = r.pubsub()
    pubsub.subscribe('sentiment_channel')
    def events():
        for msg in pubsub.listen():
            if msg and isinstance(msg['data'], bytes):
                yield "data:" + msg['data'].decode() + "\n\n"
    return app.responses.StreamingResponse(events(), media_type="text/event-stream")
