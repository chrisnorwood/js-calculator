// **********************
// ***Untranspiled ES6***
// **********************

// Calcualator
//

class Calculator {
  constructor() {
    this.value = 0;
    this.numbers = [];
    this.operation = '';
  }

  addDigit(input) {
    var numbersLength = this.numbers.length;
    var operationLength = this.operation.length;
    
    if (numbersLength === 0)
    {
      this.numbers.push(input);
    }
    else if (numbersLength === 1 && operationLength !== 0) 
    {
      this.numbers.push(input);
    } 
    else
    {
      if (this.numbers[numbersLength-1].length < 12) {
        this.numbers[numbersLength-1] += input;
      }
    }
  }

  addOperation(input) {
    // if no current operation, and operation was pressed
    if (this.operation.length === 0 && /^[+\-*/]/.test(input)) {
      // if one number exists,
      // Then we are adding our operation between our two numbers
      if (this.numbers.length === 1) {
        // fixes fact that +/- matches regex above
        if (input !== "+/-") {
          this.operation = input;
        }
      }
    } else {
      // We are adding our operation after the two numbers,
      // and need to evaluate the expression, then add the 'next' operation 
      if (this.numbers.length === 2) {
        if (/^[=]$/.test(input))
        {
          var expression = this.numbers[0]+this.operation+this.numbers[1];
          var result     = eval(expression);
          
          this.operation = '';
          this.numbers   = [result.toString()];
        }
        else if (/^[+\-*/]/.test(input))
        {
          var expression = this.numbers[0]+this.operation+this.numbers[1];
          var result     = eval(expression);

          this.operation = input;
          this.numbers   = [result.toString()]; 
        }
      }
      // if operation is "C"
      if (/^[c]$/.test(input)) {
        this.operation = '';
        this.numbers   = [];  
      }
    }

    if (this.numbers.length > 0 && input === '+/-') {
      // Someone pressed the +/- button
      if (this.numbers[this.numbers.length-1].substring(0,1) == '-') {
        // subtracts minus sign
        this.numbers[this.numbers.length-1] = this.numbers[this.numbers.length-1].substring(1)
      } else {
        // Adds a minus sign
        this.numbers[this.numbers.length-1] = '-'+this.numbers[this.numbers.length-1];
      }
    }
  }

  receiveInput(input) {
    if (/^[\d]?[.]?$/.test(input)) {
      this.addDigit(input);
    } 
    else if (/^[+\-*/=]?(\+\/\-)?(c)?$/.test(input)) {
      this.addOperation(input);
    }

    console.log(this.numbers);
    console.log(this.operation);
  }

  display() {
    var length = this.numbers.length;
    var value = this.numbers[length-1];
    if (value) {
      var trimmedValue = value.substring(0,12);
    } else {
      var trimmedValue = '0';
    }

    return trimmedValue;
  }
}

// Implementation
//

var calculator = new Calculator();

var theParent = document.querySelector(".calc")

if (document.addEventListener) {
  theParent.addEventListener("click", handleClick, false);
} 
else if (document.attachEvent) {
  theParent.attachEvent("onclick", handleClick); // for I.E.
}

function handleClick(event) {
  event = event || window.event;
  event.target = event.target || event.srcElement;
  var element = event.target;

  if (event.target !== event.currentTarget) {
    var clickedItem = event.target;
    if (element.nodeName === "BUTTON") {
      acceptInput(element);
    }
  }

  event.stopPropagation();
}

function acceptInput(button) {
  var display = document.getElementsByClassName("calc-display-input")[0];
  var input = button.innerHTML;

  calculator.receiveInput(input);
  display.value = calculator.display();
}