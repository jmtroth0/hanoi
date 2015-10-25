(function() {
  window.Hanoi = window.Hanoi || {};

  var Game = window.Hanoi.Game = function (options) {
    numDiscs = options.numDiscs || 3;
    this.$rootEl = options.$rootEl;
    this.board = new window.Hanoi.Board(numDiscs);
    this.setupGame();
  };

  Game.prototype.setupGame = function () {
    this.render();
    this.enableDragAndDrop();
  };

  Game.prototype.render = function () {
    this.$rootEl.html(this.board.render().$el);
  };

  Game.prototype.playTurn = function (e, ui) {
    this.board.move(this.from, parseInt($(e.target).data('id')));
    this.render();
    if (!this.board.isWon()){
      this.enableDragAndDrop();
    } else {
      this.gameOverProtocol();
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
      drop: this.playTurn.bind(this)
    });
  };

  Game.prototype.storeFromMove = function (e, ui) {
    this.from = parseInt(ui.helper.parent().data('id'));
  };

  Game.prototype.getMove = function (type) {
    return parseInt(prompt("Where would you like to move " + type + "?"));
  };

  Game.prototype.gameOverProtocol = function () {
    this.$rootEl.append('Congrats!');
  };
})();
