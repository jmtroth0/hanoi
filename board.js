(function () {
  window.Hanoi = window.Hanoi || {};

  var Board = window.Hanoi.Board = function (numDiscs) {
    this.numDiscs = numDiscs;
    var startingStack = [];
    for (var i = 1; i <= this.numDiscs; i++) {
      startingStack.push(i);
    }
    this.stacks = [new Stack(startingStack), new Stack([]), new Stack([])];
  };

  Board.prototype.isValidMove = function (fromStack, toStack) {
    return fromStack.topDisc() < toStack.topDisc();
  };

  Board.prototype.move = function (fromStack, toStack) {
    if (isValidMove(fromStack, toStack)){
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
    var stacks = [];
    this.stacks.forEach(function (stack){
      stacks.push(stack.discs);
    });
    return stacks;
  };

  var Stack = window.Hanoi.Stack = function (discs) {
    this.discs = discs;
  };

  Stack.prototype.topDisc = function () {
    return this.discs[-1];
  };

  Stack.prototype.moveFrom = function () {
    return this.discs.pop();
  };

  Stack.prototype.moveTo = function (disc) {
    this.discs.push(disc);
  };

  Stack.prototype.length = function () {
    return this.discs.length;
  };
})();
