class Board {
    size;
    board;
    constructor(size = 3) {
        this.board = new Array(size);
        for(let i=0; i<size; i++) {
            this.board[i] = new Array(size);
        }
    }
}
module.exports = Board;