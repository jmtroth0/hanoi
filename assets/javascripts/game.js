(function() {
  window.Hanoi = window.Hanoi || {};

  var Game = window.Hanoi.Game = function (options) {
    this.numDiscs = options.numDiscs || 3;
    this.$rootEl = options.$rootEl;
    this.board = new window.Hanoi.Board(this.numDiscs);
    this.setupGame();
  };

  Game.prototype.setupGame = function () {
    this.render();
    this.enableDragAndDrop();
    this.prevMoves = [];
  };

  Game.prototype.render = function () {
    this.$rootEl.html(this.board.render().$el);
  };

  Game.prototype.playTurn = function () {
    this.board.move(this.from, this.to);
    this.prevMoves.push([this.to, this.from]);
    this.from = null;
    this.to = null;
    this.render();
    if (!this.board.isWon()){
      this.enableDragAndDrop();
    } else {
      this.gameOverProtocol();
    }
  };

  Game.prototype.solve = function () {
    this.solveFromBeginning(this.numDiscs, 0, 2, 1, this.prevMoves.reverse());
  };

  Game.prototype.solveFromBeginning = function (disc, source, dest, spare, storedMoves) {
    storedMoves = storedMoves || [];
    if (disc === 1) {
      storedMoves.push([source, dest]);
    } else {
      this.solveFromBeginning(disc - 1, source, spare, dest, storedMoves);
      storedMoves.push([source, dest]);
      this.solveFromBeginning(disc - 1, spare, dest, source, storedMoves);
    }
    if (disc === this.numDiscs) {
      storedMoves.reverse();
      this.runSolution(storedMoves);
    }
  };

  Game.prototype.runSolution = function (storedMoves) {
    if (storedMoves.length === 0){
      this.render();
      this.gameOverProtocol();
    } else {
      var move = storedMoves.pop();
      setTimeout(function (){
        this.board.move(move[0], move[1]);
        this.render();
        this.runSolution(storedMoves);
      }.bind(this), 500);
    }
  };

  Game.prototype.enableDragAndDrop = function () {
    var $moveableDiscs = this.$rootEl.find('.stack > .disc:last-child');
    $moveableDiscs.hover(function (){
      $(this).css('cursor', 'pointer');
    });
    $moveableDiscs.mousedown(function () {
      $(this).css('background', '#731d1d');
    });
    $moveableDiscs.mouseup(function () {
      $(this).css('background', '');
    });
    $moveableDiscs.draggable({
      cursor: 'pointer',
      containment: '.stacks',
      start: this.storeFromMove.bind(this)
    });
    this.$rootEl.find('.stack').droppable({
      accept: '.stack > .disc:last-child',
      drop: this.getToMove.bind(this)
    });
  };

  Game.prototype.storeFromMove = function (e, ui) {
    this.from = parseInt(ui.helper.parent().data('id'));
  };

  Game.prototype.getToMove = function (e, ui) {
    this.to = parseInt($(e.target).data('id'));
    this.playTurn();
  };

  Game.prototype.getMove = function (type) {
    return parseInt(prompt("Where would you like to move " + type + "?"));
  };

  Game.prototype.gameOverProtocol = function () {
    this.$rootEl.append('Congrats!');
  };
})();
