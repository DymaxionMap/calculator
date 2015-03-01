var Calculator = function() {
  this.x = null;
  this.y = null;
  this.buffer = [];
  this.operation = null;
}

Calculator.prototype.addToBuffer = function (digit) {
  this.buffer.push(digit);
};

$(document).ready(function() {
  var calc = new Calculator();

});
