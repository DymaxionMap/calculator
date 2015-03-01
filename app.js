var Calculator = function() {
  this.x = 0;
  this.y = 0;
  this.buffer = [];
  this.operation = null;
  this.expectSecondOperand = false;
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

Calculator.prototype.push = function() {
  this.y = this.x;
  this.x = 0;
}

Calculator.prototype.storeOperation = function(operation) {
  this.operation = operation;
}

Calculator.prototype.calculate = function() {
  switch (this.operation) {
    case "add":
      this.x = this.y + this.x;
      break;
    case "subtract":
      this.x = this.y - this.x;
      break;
    case "multiply":
      this.x = this.y * this.x;
      break;
    case "divide":
      this.x = this.y / this.x;
      break;
  }
}

Calculator.prototype.display = function($display) {
  $display.text(this.x);
};

Calculator.prototype.clearBuffer = function() {
  this.buffer = [];
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
      calc.parseBuffer();
      calc.display($display);
    }
    logState(calc);
    calc.expectSecondOperand = false;
  });

  $(".keypad").on("click", "#clear", function() {
    calc.clear();
    calc.display($display);
    calc.expectSecondOperand = false;
  });

  $(".keypad").on("click", ".binary-op", function() {
    if (calc.expectSecondOperand) {
      // Placeholder error.
      console.log("There was an error.");
    } else {
      calc.push();
      logState(calc);
      calc.storeOperation($(this).data("value"));
      logState(calc);
      calc.clearBuffer();
      calc.display($display);
      calc.expectSecondOperand = true;
    }
  });

  $(".keypad").on("click", ".equals", function() {
    console.log("In equals");
    if (calc.expectSecondOperand) {
      // Placeholder error.
      console.log("There was an error.");
      calc.expectSecondOperand = false;
    } else {
      calc.calculate();
      logState(calc);
      calc.display($display);
      calc.push();
      logState(calc);
      calc.clearBuffer();
    }
  });

  function logState(calc) {
      console.log("x: " + calc.x + ", y: " + calc.y +
          ", operation: " + calc.operation + ", buffer: " +
          calc.buffer + ", expectSecondOperand: " +
          calc.expectSecondOperand);
  }
});
