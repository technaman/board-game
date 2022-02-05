const route = require('color-convert/route');
const express = require('express');
const router = express.Router();
const {v4 : uuidv4} = require('uuid');
const db = require('../../db/db');

/**
 *    Creates a new game
 *    params:
 *      - userId
 *    Returns:
 *      - 201
 *      - game
 */

router.post('/host', (req, res) => {
    const {userId} = req.body;    
    const game = db.createGame(userId);    
    const message = 'Game initialized';
    res.status(201).json({'data': game, message});
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
        return res.status(400).json({message, data:{}});
    }    
    if(game.start(playerId) == false) {
        const message = 'Invalid Player. Not part of this game.';
        return res.status(400).json({message, data: {}});
    }
    const message = 'Game started';    
    res.json({message, data: {}});
});


router.post('/end', (req, res) => {
    const {userId, playerId, gameId} = req.body;
    // check if user is part of the game - only then he can start    
    const game = db.getGame(gameId);
    if(game == null) {
        const message = 'Invalid game Id';
        return res.status(400).json({message, data:{}});
    }    
    if(game.end(playerId) == false) {
        const message = 'Invalid Player. Not part of this game.';
        return res.status(400).json({message, data: {}});
    }
    const message = 'Game Ended';    
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
    const game = db.getGame(gameId);
    if(game.move(cellNumber, playerId)) {
        const message = 'Move successful'
        res.json({'data': {gameId, game, playerId}, message});
    } else {
        const message = 'Invalid move.';
        res.json({'data': {gameId, playerId}, message});
    }
    // Save new move in the board    
});

module.exports = router;