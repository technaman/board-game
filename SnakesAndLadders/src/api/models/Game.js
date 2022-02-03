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
        this.players = [];
        this.status = 'initialized';
        this.players.push(player);
    }

    addPlayer(player) {
        this.players.push(player);
    }

    start() {
        this.status = 'started';
    }

    end() {
        this.status = 'over';
    }
}
module.exports = Game;