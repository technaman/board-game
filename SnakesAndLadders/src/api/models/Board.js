class Board {
    size;
    board;
    rows;
    cols;
    diagonals;
    constructor(size = 3) {
        this.board = new Array(size);
        for(let i=0; i<size; i++) {
            this.board[i] = new Array(size);
        }
        this.size = size;
        this.rows = [];
        this.cols = [];
        this.diagonals = [];
    }
    move(cellNumber, playerValue) {
        let row = Math.floor(cellNumber/this.size);
        let col = cellNumber%this.size;
        if(this.board[row][col] != null) {
            return false;
        } else {
            this.board[row][col] = playerValue; 
            this.rows[row] = (this.rows[row] || 0) + playerValue;
            this.cols[col] = (this.cols[col] || 0) + playerValue;
            if(row == col) {
                this.diagonals[0] = (this.diagonals[0] || 0) + playerValue;
            } else if (row + col + 1 == this.size) {
                this.diagonals[1] = (this.diagonals[1] || 0) + playerValue;
            }                      
        }
        return true;
    }
    checkBoardStatus(playerValue) {
        let val = playerValue * this.size;
        if(this.diagonals[0] == val || this.diagonals[1] == val) return true;
        for(let i = 0; i<this.size; i++) {            
            if(this.rows[i] ==  val || this.cols[i] == val) {
                return true;
            }            
        }
        return false;
    }
}
module.exports = Board;