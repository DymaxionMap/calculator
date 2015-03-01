var Calculator = function() {
  this.x = null;
  this.y = null;
  this.buffer = [];
  this.operation = null;
  console.log("Created calculator.");
}

Calculator.prototype.addToBuffer = function (digit) {
  console.log("In addToBuffer()");
  this.buffer.push(digit);
};

Calculator.prototype.parseBuffer = function() {
  if (this.buffer.length === 1 && this.buffer[0] === ".") {
    this.x = 0;
  } else {
    this.x =  Number(this.buffer.join(""));
  }
};

Calculator.prototype.display = function(display) {
  display.text(this.x);
};

$(document).ready(function() {
  var calc = new Calculator();
  console.log(calc.buffer);
  console.log(Object.getOwnPropertyNames(calc));

  $(".keypad").on("click", ".digit", function() {
    var digit = $(this).data("value");
    calc.addToBuffer(digit);
    console.log(calc.buffer);
    calc.parseBuffer();
    calc.display($(".display"));
  });
});
