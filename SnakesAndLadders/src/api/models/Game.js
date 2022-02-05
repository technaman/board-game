const Board = require('./Board');
const {v4: uuidv4} = require('uuid');
class Game {
    id;
    board;
    players;
    status;
    constructor(player) {
        this.id = uuidv4();
        this.board = new Board();
        this.players = new Array();
        this.status = 'initialized';
        this.players.push(player);
    }

    addPlayer(player) {
        if(this.players.size == 2) return false; // max 2 player game: TicTacToe
        this.players.push(player);
    }

    hasPlayer(player) {
        return this.players.includes(player);
    }

    move(cellNumber, playerId) {
        if(this.status != 'started') throw new Error('Game not yet started');
        let index = this.players.indexOf(playerId);
        if(index < 0) return false; // throw exception
        let playerValue = index == 1 ? 1 : -1;
        if(!this.board.move(cellNumber, playerValue)) {
            return false;
        } else {
            this.won = this.checkGameStatus(playerValue);                      
            return true;
        }
    }

    checkGameStatus(playerValue) {
        return this.board.checkBoardStatus(playerValue);
    }

    start(playerId) {
        if(!this.hasPlayer(playerId)) return false;
        this.status = 'started';
        return true;
    }

    end(playerId) {
        if(!this.hasPlayer(playerId)) return false;
        this.status = 'over';
        return true;        
    }
}
module.exports = Game;