from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/roll-dice', methods=['GET'])
def roll_dice():
    import random
    dice = [random.randint(1, 6) for _ in range(5)]
    return jsonify(dice=dice)

#@app.route('/api/board/actions', methods=['GET']):

if __name__ == '__main__':
    app.run(debug=True)

