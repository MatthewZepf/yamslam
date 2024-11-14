import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from board import Board

app = Flask(__name__)
CORS(app)

Bd = Board()

@app.route('/api/roll-dice', methods=['GET'])
def roll_dice():
    import random
    dice = [random.randint(1, 6) for _ in range(5)]
    return jsonify(dice=dice)

@app.route('/api/board/players', methods=['POST'])
def set_players():
    players = request.json['players']
    Bd.set_players(players)
    return jsonify(success=True)

@app.route('/api/board/chip-options', methods=['GET'])
def get_chip_options():
    dice = request.args.getlist('dice[]')
    jsonified = jsonify(Bd.get_chip_options(dice))
    return jsonified

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))