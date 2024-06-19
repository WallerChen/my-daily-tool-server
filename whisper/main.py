from flask import Flask, request
import whisper
import requests

app = Flask(__name__)
model = whisper.load_model("base")

@app.route('/translate', methods=['POST'])
def translate_audio():
    audio_url = request.form['audio_url']
    audio_data = requests.get(audio_url).content

    # Save audio file locally
    audio_file_path = './file.mp3'
    with open(audio_file_path, 'wb') as f:
        f.write(audio_data)

    # Perform audio transcription
    result = model.transcribe(audio_file_path)

    # Remove the saved audio file
    # os.remove(audio_file_path)

    return result["text"]

if __name__ == '__main__':
    app.run(port=3111)
