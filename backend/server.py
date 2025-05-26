from flask import Flask, request, jsonify
from flask_cors import CORS
import os, requests, hashlib
from models import SessionLocal, Preference

app = Flask(__name__)
CORS(app)
REPLICATE_TOKEN = os.getenv("REPLICATE_API_TOKEN")
HEADERS = {"Authorization": f"Token {REPLICATE_TOKEN}", "Content-Type": "application/json"}
# Simple in-memory cache for repeat prompts
ttl_cache = {}

# Helper to build prompt
def make_prompt(data):
    base = f"Product: {data['name']}. Description: {data['description']}. Audience: {data['audience']}."
    if data.get('tone'):
        base += f" Tone: {data['tone']}."
    if data.get('style'):
        base += f" Style: {data['style']}."
    return base

@app.route('/generate-images', methods=['POST'])
def generate_images():
    data = request.json
    prompt = make_prompt(data)
    # Aspect ratio mapping
    ratio_map = {'1:1': (512,512), '16:9': (768,432), '9:16': (432,768)}
    width, height = ratio_map.get(data.get('ratio','1:1'), (512,512))
    cache_key = hashlib.md5((prompt + str(width) + str(height)).encode()).hexdigest()
    if cache_key in ttl_cache:
        return jsonify({"images": ttl_cache[cache_key]})
    payload = {
        "version": "stability-ai/stable-diffusion:db21e45f5b51129e7380ef9a7c50141d650b8fae",
        "input": {"prompt": prompt, "width": width, "height": height, "samples": 3}
    }
    resp = requests.post("https://api.replicate.com/v1/predictions", headers=HEADERS, json=payload).json()
    images = resp['output']
    ttl_cache[cache_key] = images
    return jsonify({"images": images})

@app.route('/generate-video', methods=['POST'])
def generate_video():
    data = request.json
    prompt = make_prompt(data)
    payload = {
        "version": "runwayml/gen-2:latest",
        "input": {"prompt": prompt, "length_seconds": data.get('length',10)}
    }
    resp = requests.post("https://api.replicate.com/v1/predictions", headers=HEADERS, json=payload).json()
    return jsonify({"video": resp['output'][0]})

@app.route('/submit-preference', methods=['POST'])
def submit_preference():
    data = request.json
    db = SessionLocal()
    prompt = make_prompt(data)
    key = hashlib.md5((prompt + str(data['index'])).encode()).hexdigest()
    pref = Preference(product=data['name'], prompt_hash=key, selected_index=data['index'])
    db.add(pref)
    db.commit()
    return jsonify({"status": "ok"})

@app.route('/get-preferences', methods=['GET'])
def get_preferences():
    db = SessionLocal()
    prefs = db.query(Preference).all()
    agg = {}
    for p in prefs:
        agg.setdefault(p.prompt_hash, [0,0,0])[p.selected_index] += 1
    return jsonify(agg)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)