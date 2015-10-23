(function() {
  window.Hanoi = window.Hanoi || {};

  var Game = window.Hanoi.Game = function (numDiscs) {
    numDiscs = numDiscs || 3;
    this.board = new window.Hanoi.Board(numDiscs);
  };

  Game.prototype.render = function () {
    var board = this.board.render;
    
  };
})();
