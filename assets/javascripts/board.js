(function () {
  window.Hanoi = window.Hanoi || {};

  var Board = window.Hanoi.Board = function (numDiscs) {
    this.numDiscs = numDiscs;
    this.stacks = [new Stack([]), new Stack([]), new Stack([])];
    for (var i = this.numDiscs; i >= 1; i--) {
      this.stacks[0].moveTo(i);
    }
  };

  Board.prototype.isValidMove = function (fromStack, toStack) {
    return (!fromStack.isEmpty() && fromStack !== toStack && (
      toStack.isEmpty() || fromStack.topDisc() < toStack.topDisc()
    ));
  };

  Board.prototype.move = function (fromStack, toStack) {
    toStack = this.stacks[toStack];
    fromStack = this.stacks[fromStack];
    if (this.isValidMove(fromStack, toStack)){
      toStack.moveTo(fromStack.moveFrom());
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.isWon = function () {
    return this.stacks[1].length === this.numDiscs ||
           this.stacks[2].length === this.numDiscs;
  };

  Board.prototype.render = function () {
    this.$el = $('<div>').addClass('stacks');
    var self = this;
    var discHeight = 150 / this.numDiscs;
    var discWidth = window.innerWidth / 3 / this.numDiscs - 40;
    this.stacks.forEach(function(stack, idx){
      var $stack = $('<div>').addClass('stack group').data('id', '' + idx);
      stack.each(function(disc, idx){
        $disc = ($('<div>').addClass('disc').addClass('' + disc).css(
          "width", disc * discWidth + 'px'
        ).css(
          "bottom", (idx) * discHeight + 'px'
        ).css(
          "height", discHeight + 'px'
        ).css(
          "left", (window.innerWidth * 0.15 - (disc / 2 * discWidth + 17)) + 'px'
        ));
        $stack.append($disc);
      });
      self.$el.append($stack);
    });
    return this;
  };

  var Stack = window.Hanoi.Stack = function (discs) {
    this.discs = discs;
    this.length = discs.length;
  };

  Stack.prototype.topDisc = function () {
    return this.discs[this.discs.length - 1];
  };

  Stack.prototype.moveFrom = function () {
    this.length -= 1;
    return this.discs.pop();
  };

  Stack.prototype.moveTo = function (disc) {
    this.length += 1;
    this.discs.push(disc);
  };

  Stack.prototype.isEmpty = function () {
    return this.length === 0;
  };

  Stack.prototype.each = function (callback) {
    this.discs.forEach(function(disc, idx){
      callback(disc, idx);
    });
  };
})();
