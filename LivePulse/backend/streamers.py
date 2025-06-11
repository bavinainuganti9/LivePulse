import tweepy, praw, redis, json
from sentiment_model import analyze_text
import os
from dotenv import load_dotenv

load_dotenv()
r = redis.from_url(os.getenv("REDIS_URL"))

# Twitter stream
class TweetListener(tweepy.StreamingClient):
    def on_tweet(self, tweet):
        score = analyze_text(tweet.text)
        r.publish('sentiment_channel', json.dumps({'text': tweet.text, 'score': score}))

def start_twitter():
    client = TweetListener(os.getenv("TWITTER_BEARER_TOKEN"))
    client.sample()


def start_reddit():
    reddit = praw.Reddit(client_id=os.getenv("REDDIT_CLIENT"),
                         client_secret=os.getenv("REDDIT_SECRET"),
                         user_agent="livepulse")
    for comment in reddit.subreddit('all').stream.comments(skip_existing=True):
        score = analyze_text(comment.body)
        r.publish('sentiment_channel', json.dumps({'text': comment.body, 'score': score}))
