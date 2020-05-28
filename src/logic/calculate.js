import operate from './operate';

function calculate(calculatorObj, buttonName) {
  let { total, next, operation } = calculatorObj;

  switch (buttonName) {
    case '%':
      if (next) {
        next = operate(total, next, 'X');
        next = operate(next, '100', '÷');
      } else if (total && operation) {
        next = operate(total, total, 'X');
        next = operate(next, '100', '÷');
      } else if (total) {
        total = operate(total, '100', '÷');
      }

      break;
    case '+/-':
      if (next) {
        next = operate(next, '-1', 'X');
      } else if (total && operation) {
        next = operate(total, '-1', 'X');
      } else if (total) {
        total = operate(total, '-1', 'X');
      }

      break;
    case '=':
      if (next) {
        if (operation[0] === '=') {
          const data = operation.slice(1).split(',');
          const firstOperand = data[0];
          const previousOperation = data[1];
          total = operate(firstOperand, next, previousOperation);
        } else {
          total = operate(total, next, operation);
          operation = `=${next},${operation}`;
        }
        next = undefined;
      } else if (total && operation) {
        if (operation[0] !== '=') {
          const previousOperation = operation;
          operation = `=${total},${operation}`;
          total = operate(total, total, previousOperation);
        } else {
          const data = operation.slice(1).split(',');
          const firstOperand = data[0];
          const previousOperation = data[1];
          total = operate(firstOperand, total, previousOperation);
        }
      }

      break;
    case 'AC':
      if (next) {
        if (operation[0] === '=') {
          total = undefined;
          operation = undefined;
        }
        next = undefined;
      } else if (operation) {
        if (operation[0] === '=') {
          total = undefined;
        }
        operation = undefined;
      } else {
        total = undefined;
      }

      break;
    case '.':
      if (next) {
        if (!next.includes('.')) {
          next += '.';
        }
      } else if (operation) {
        next = '0.';
      } else if (!total.includes('.')) {
        total += '.';
      }

      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (next) {
        next += buttonName;
      } else if (operation) {
        next = buttonName;
      } else if (!total) {
        total = buttonName;
      } else {
        total += buttonName;
      }

      break;
    default:
      if (total && next) {
        total = operate(total, next, operation);
        next = undefined;
        operation = buttonName;
      } else if (total) {
        operation = buttonName;
      }

      break;
  }

  return { total, next, operation };
}

export default calculate;
