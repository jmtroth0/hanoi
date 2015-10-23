(function () {
  window.Hanoi = window.Hanoi || {};

  var Board = window.Hanoi.Board = function (numDiscs) {
    this.numDiscs = numDiscs || 3;
    this.stacks = [new Stack([3,2,1]), new Stack([]), new Stack([])];
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

  Stack.prototype.validMove = function (otherStack) {
    return this.topDisc() < otherStack.topDisc();
  };
})();
