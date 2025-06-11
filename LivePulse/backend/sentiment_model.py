from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

def analyze_text(text: str) -> float:
    result = classifier(text[:512])[0]
    return result['score'] if result['label'] == "POSITIVE" else -result['score']
