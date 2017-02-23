const Board = require('./board');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


class Game{
  constructor(board, playerOne, playerTwo){
    this.board = board;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = playerOne;
  }

  play(){
    while (this.board.gameOver === false){
      this.play_turn();
    }
  }

  play_turn(){
    console.log(`${this.currentPlayer.name}, it's your turn`);
    let move;

    rl.on('line', function(line){
      move = line;
      rl.close();
    });

    if (this.currentPlayer.validMove(move)) {
      this.currentPlayer.move(move);
      this.switchPlayers();
    } else {
      console.log("invalid move, move again");
    }
  }

  switchPlayers(){
    if(this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
    } else {
      this.currentPlayer = this.playerOne;
    }
  }

  


}
















let game = new Game(board, playerOne, playerTwo);

game.play();
