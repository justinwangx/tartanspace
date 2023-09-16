from flask import Flask, request, jsonify
from flask_cors import CORS

from embed_and_reduce import get_embedding, reduce_dimensions

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return "tartanspace"

@app.route('/form-submission', methods=['POST'])
def process_submission():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    answer1 = request.json.get("question1")
    answer2 = request.json.get("question2")
    answer3 = request.json.get("question3")
    answer4 = request.json.get("question4")
    answer5 = request.json.get("question5")
    answers = [answer1, answer2, answer3, answer4, answer5]

    # embed text
    embedding = get_embedding(answers)

    return jsonify(name="success")

@app.route('/get-points', methods=['GET'])
def get_points():
    return None

@app.route('/test-endpoint', methods=['GET'])
def your_endpoint():
    try:
        # Send a JSON response back
        return jsonify({"message": "Data fetched successfully. LETSGOOOO"}), 200
    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"message": "An error occurred"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

# for now:
# FLASK_APP=app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=8080