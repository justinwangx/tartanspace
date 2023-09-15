from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/embed', methods=['POST'])
def embed_text():
    text = request.json.get('text')
    # Embed the text and perform UMAP, etc.
    # embedding = your_embedding_function(text)
    return jsonify(embedding=embedding)

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