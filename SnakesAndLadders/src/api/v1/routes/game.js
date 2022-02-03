const route = require('color-convert/route');
const express = require('express');
const router = express.Router();
const {v4 : uuidv4} = require('uuid');
const db = require('../../db/db');

/**
 *    Creates a new game id
 *    params:
 *      - userId
 *    Returns:
 *      - 200
 *      - gameId
 *      - playerId
 */

router.post('/host', (req, res) => {
    const {userId} = req.body;    
    const game = db.createGame(userId);    
    const message = 'Game initialized';
    res.json({'data': game, message});
});

/**
 * Adds a userId to a gameId
 * params:
 *  - userId
 *  - gameId
 * returns:
 *  - 200
 *  - playerId (Identifies User and the game)
 */

router.post('/join', (req, res) => {
    const {userId, gameId} = req.body;  
    const data = db.addPlayer(gameId, userId);
    if(data == false) {
        const message = 'Invalid GameId';
        return res.json({'data': {gameId}, message});
    }
    // Save the gameId & playerId for the userId in the table
    // Save the playerId in the game table
    const message = 'Player added to the game';
    res.json({data, message});
});

router.post('/start', (req, res) => {
    const {userId, playerId, gameId} = req.body;
    // check if user is part of the game - only then he can start
    
    const game = db.getGame(gameId);
    if(game == null) {
        const message = 'Invalid game Id';
        return res.json({message, data:{}});
    }
    game.start();
    const message = 'Game started';    
    res.json({message, data: {}});
});

const isValidTurn = (playerId, gameId) => {
    return true;
}

const isValidMove = (playerId, gameId, cellNumber) => {
    return true;
}

router.post('/move',(req, res) => {
    const {playerId, gameId, cellNumber} = req.body;
    if(!isValidTurn(playerId, gameId)) {
        const message = 'Invalid player move. Not your turn';    
        return res.json({'data': {gameId, playerId}, message});
    }
    if(!isValidMove(playerId, gameId, cellNumber)){
        const message = 'Invalid move.';    
        return res.json({'data': {gameId, playerId}, message});
    };
    // Save new move in the board
    const message = 'Move successful'
    res.json({'data': {gameId, playerId}, message});
});

module.exports = router;