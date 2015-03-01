var Calculator = function() {
  this.x = 0;
  this.y = 0;
  this.buffer = [];
  this.operation = null;
  console.log("Created calculator.");
}

Calculator.prototype.clear = function() {
  this.x = 0;
  this.y = 0;
  this.buffer = [];
};

Calculator.prototype.addToBuffer = function (digit) {
  this.buffer.push(digit);
};

Calculator.prototype.noDuplicateDots = function (digit) {
  if (digit === ".") {
    return (this.buffer.indexOf(".") === -1);
  } else {
    return true;
  }
};

Calculator.prototype.parseBuffer = function() {
  if (this.buffer.length === 1 && this.buffer[0] === ".") {
    this.x = 0;
  } else {
    this.x =  Number(this.buffer.join(""));
  }
};

Calculator.prototype.display = function($display) {
  $display.text(this.x);
};

$(document).ready(function() {
  var calc = new Calculator();
  var $display = $(".display");
  calc.display($display);
  console.log(calc.buffer);
  console.log(Object.getOwnPropertyNames(calc));

  $(".keypad").on("click", ".digit", function() {
    var digit = $(this).data("value");
    if (calc.noDuplicateDots(digit)) {
      calc.addToBuffer(digit);
      console.log(calc.buffer);
      calc.parseBuffer();
      calc.display($display);
    }
  });

  $(".keypad").on("click", "#clear", function() {
    calc.clear();
    calc.display($display);
  });
});
