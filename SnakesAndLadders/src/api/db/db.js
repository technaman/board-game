const Game = require('../models/Game');
const {v4: uuidv4} = require('uuid');
const store = require('./storage');

const db = {
    getGame : (gameId) => {
        const game = store.games[gameId];
        return game;
    },
    createGame : (userId) => {
        const playerId = uuidv4();
        const game = new Game(playerId);   
        db.saveGame(game);     
        return { game, playerId};
    },
    saveGame: (game) => {
        store.games[game.id] = game;
    },
    addPlayer: (gameId, userId) => {
        const playerId = uuidv4();
        const game = db.getGame(gameId);
        if(!game) {
            return false;
        } else {
            game.addPlayer(playerId);
        }
        return {game, playerId};
    }
}

module.exports = db;
