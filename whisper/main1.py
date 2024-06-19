from flask import Flask, request
import whisper
import requests

app = Flask(__name__)
model = whisper.load_model("base")

@app.route('/translate', methods=['POST'])
def translate_audio():
    audio_url = request.form['audio_url']
    audio_data = requests.get(audio_url).content
    result = model.transcribe(audio_data)
    return result["text"]

if __name__ == '__main__':
    app.run(port=3111)
