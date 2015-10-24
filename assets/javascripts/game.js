(function() {
  window.Hanoi = window.Hanoi || {};

  var Game = window.Hanoi.Game = function (options) {
    numDiscs = options.numDiscs || 3;
    this.$rootEl = options.$rootEl;
    this.board = new window.Hanoi.Board(numDiscs);
  };

  Game.prototype.play = function () {
    while (!this.board.isWon()){
      this.render();
      this.playTurn();
    }
    this.render();
    this.gameOverProtocol();
  };

  Game.prototype.render = function () {
    this.$rootEl.html(this.board.render().$el);
  };

  Game.prototype.playTurn = function () {
    var hasMoved = false;
    while (!hasMoved) {
      var first = this.getMove("from");
      var second = this.getMove("to");
      hasMoved = this.board.move(first, second);
    }
  };

  Game.prototype.getMove = function (type) {
    return parseInt(prompt("Where would you like to move " + type + "?"));
  };

  Game.prototype.gameOverProtocol = function () {
    console.log("You win!");
  };
})();
