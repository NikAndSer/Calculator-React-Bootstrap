import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { create, all } from 'mathjs';
import './App.css';


function App() {
  // Create a math object from mathjs
  const math = create(all, {});


  // Set initial state to 0
  const [expression, setExpression] = useState(0);
  const [display, setDisplay] = useState(0);


  // Regexs
  const digits = /^\d+$/;
  const operators = /[+\-*/]/;
  const operatorAndSpaceAtTheEnd = /[+\-*/]\s$/;
  const negativeSign = /-/;
  const twoOperatorsWithSpace = /[+\-*/]\s+[+\-*/]\s+/;




  const handleInput = (event) => {
    // Extract the clicked number or operator
    const input = event.target.textContent;


    // Handle number input
    if (digits.test(input)) {
      // Append or replace the expression with the number
      setExpression(expression !== '0' ? expression + input : input);
      setDisplay(expression !== '0' ? expression + input : input);
    }
    // Handle negative sign
    else if (negativeSign.test(input)) {
      setExpression(expression + " " + input + " ");
      setDisplay(expression + " " + input + " ");
    }
    // Handle operator input
    else if (operators.test(input)) {
      // Handle operator right after "="
      if (display !== expression) {
        setDisplay(display + " " + input + " ");
        setExpression(display + " " + input + " ");
      }
      else if (twoOperatorsWithSpace.test(expression)) {
        setExpression(expression.replace(twoOperatorsWithSpace,
          input + " "));
        setDisplay(expression.replace(twoOperatorsWithSpace,
          input + " "));
      } else
        // Append or replace the operator in the expression
        setExpression(operatorAndSpaceAtTheEnd.test(expression)
          ? expression.replace(operatorAndSpaceAtTheEnd,
            input + " ") : expression + " " + input + " ");


      setDisplay(operatorAndSpaceAtTheEnd.test(expression)
        ? expression.replace(operatorAndSpaceAtTheEnd,
          input + " ") : expression + " " + input + " ");


    }
    // Handle other input
    else {
      // Append or replace the content in the expression
      setExpression(expression !== '0' ? expression + " " + input + " " : input);
      setDisplay(expression !== '0' ? expression + " " + input + " " : input);
    }
  };


  const handleEquals = () => {
    const result = parseFloat(math.format(math.evaluate(expression), { precision: 12 }));
    setDisplay(result);
    setExpression("0");
  };


  const handleDecimal = () => {
    const lastNumber = expression.split(operators).pop();
    if (!lastNumber.includes(".")) {
      setExpression(expression + ".");
    }
  };


  const handleClear = () => {
    console.log(expression + " " + display + " <= expression + display before clear");
    setExpression("0");
    setDisplay("0");
    console.log(expression + " " + display + " <= expression + display after clear");
  };


  return (



    <div className="container mt-5">
      <div className="calculator">




        {/* Display */}
        <div className="row">
          <div className="col">
            <div id="display">{display}</div>
          </div>
        </div>

        {/* Button Group */}
        <div className="btn-group me-2" role="group" aria-label="First group">
          <button onClick={handleClear} className="btn btn-danger" id="clear">AC</button>
          <button onClick={handleInput} className="btn btn-secondary" id="divide">/</button>
          <button onClick={handleInput} className="btn btn-secondary" id="multiply">*</button>
          <button onClick={handleInput} className="btn btn-secondary" id="subtract">-</button>
        </div>


        <div className="btn-group me-2" role="group" aria-label="First group">
          <button onClick={handleInput} className="btn btn-secondary" id="seven">7</button>
          <button onClick={handleInput} className="btn btn-secondary" id="eight">8</button>
          <button onClick={handleInput} className="btn btn-secondary" id="nine">9</button>
          <button onClick={handleInput} className="btn btn-secondary" id="add">+</button>
        </div>


        <div className="btn-group me-2" role="group" aria-label="First group">
          <button onClick={handleInput} className="btn btn-secondary" id="four">4</button>
          <button onClick={handleInput} className="btn btn-secondary" id="five">5</button>
          <button onClick={handleInput} className="btn btn-secondary" id="six">6</button>
          <button onClick={handleInput} className="btn btn-secondary" id="subtract">-</button>
        </div>


        <div className="btn-group me-2" role="group" aria-label="First group">
          <button onClick={handleInput} className="btn btn-secondary" id="one">1</button>
          <button onClick={handleInput} className="btn btn-secondary" id="two">2</button>
          <button onClick={handleInput} className="btn btn-secondary" id="three">3</button>
          <button onClick={handleDecimal} className="btn btn-secondary" id="decimal">.</button>
        </div>




        <div className="btn-group me-2" role="group" aria-label="Second group">
          <button onClick={handleInput} className="btn btn-secondary" id="zero">0</button>
          <button onClick={handleEquals} className="btn btn-primary" id="equals">=</button>
        </div>
      </div>

      {/* Developer's name */}
      <div className="row">
        <div className="col">
          <div className="text-center">
            <p className="text-muted">Designed and Coded by <a href="https://github.com/NikAndSer">d'andy</a></p>
          </div>
        </div>
      </div>
    </div>


  );
}


export default App;



