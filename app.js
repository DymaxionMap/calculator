// Calculator constructor.
var Calculator = function($display) {
  this.x = 0;
  this.y = 0;
  this.buffer = [];
  this.operation = null;
  this.expectSecondOperand = false;
  this.usePreviousAnswer = false;
  this.$display = $display;
  console.log("Created calculator.");
}

// Clear values from memory.
Calculator.prototype.clear = function() {
  this.x = 0;
  this.y = 0;
  this.buffer = [];
};

// Insert a digit character to the buffer.
Calculator.prototype.addToBuffer = function (digit) {
  this.buffer.push(digit);
};

// If digit is a dot, check if there is already a dot in the buffer.
Calculator.prototype.noDuplicateDots = function (digit) {
  if (digit === ".") {
    return (this.buffer.indexOf(".") === -1);
  } else {
    return true;
  }
};

// Convert the buffer of characters into a number.
Calculator.prototype.parseBuffer = function() {
  if (this.buffer.length === 1 && this.buffer[0] === ".") {
    this.buffer.unshift("0");
  }
  this.x =  Number(this.buffer.join(""));
};

// Save current value and prepare for new input.
Calculator.prototype.push = function() {
  this.y = this.x;
  this.x = 0;
}

// Perform the binary operation.
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

// Display current value.
Calculator.prototype.display = function() {
  this.$display.text(this.x);
};

// Clear buffer.
Calculator.prototype.clearBuffer = function() {
  this.buffer = [];
};

// Display error and clear memory.
Calculator.prototype.error = function() {
  this.clear();
  this.$display.text("Error!");
}

// Test for divide by zero error.
Calculator.prototype.divideByZero = function() {
  return Math.abs(this.x) === Infinity;
}

// Change the sign of the current value.
Calculator.prototype.flipSign = function() {
  if (this.buffer[0] === "-") {
    this.buffer.shift();
  } else {
    this.buffer.unshift("-");
  }
};

// Main code.
$(document).ready(function() {

  // Initialize calculator.
  var calc = new Calculator($(".display"));
  calc.display();
  console.log(calc.buffer);
  console.log(Object.getOwnPropertyNames(calc));

  // Read input when user clicks on a digit key.
  $(".keypad").on("click", ".digit", function() {
    var digit = $(this).data("value");
    if (calc.noDuplicateDots(digit)) {
      calc.addToBuffer(digit);
      calc.parseBuffer();
      calc.display();
    }
    logState(calc);
    calc.expectSecondOperand = false;
    calc.usePreviousAnswer = false;
  });

  // Clear values when user clicks the 'C' key.
  $(".keypad").on("click", ".clear", function() {
    calc.clear();
    calc.display();
    calc.expectSecondOperand = false;
    calc.usePreviousAnswer = false;
  });

  // Set up a binary operation.
  $(".keypad").on("click", ".binary-op", function() {
    if (calc.expectSecondOperand) {
      console.log("There was an error.");
      calc.error();
    } else {
      if (!calc.usePreviousAnswer) {
        calc.push();
      }
      logState(calc);
      calc.operation = $(this).data("value");
      logState(calc);
      calc.clearBuffer();
      calc.expectSecondOperand = true;
    }
  });

  // Compute answer when equals key is clicked.
  $(".keypad").on("click", ".equals", function() {
    console.log("In equals");
    if (calc.expectSecondOperand) {
      console.log("There was an error.");
      calc.error();
    } else {
      calc.calculate();
      if (calc.divideByZero()) {
        calc.error();
      } else {
        logState(calc);
        calc.display();
        calc.push();
        logState(calc);
        calc.clearBuffer();
        calc.usePreviousAnswer = true;
      }
    }
    calc.expectSecondOperand = false;
  });

  // Change sign of current value.
  $(".keypad").on("click", ".flip-sign", function() {
    calc.flipSign();
    calc.parseBuffer();
    calc.display();
  });

  // Log properties for debugging.
  function logState(calc) {
    console.log(calc);
    console.log(calc.buffer);
  }
});
