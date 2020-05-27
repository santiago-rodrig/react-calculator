import operate from './operate';

function calculate(calculatorObj, buttonName) {
  let { total, next, operation } = calculatorObj;

  switch (buttonName) {
    case '%':
      if (next) {
        total = operate(total, next, operation);
        total = operate(total, '100', '÷');
        next = undefined;
        operation = undefined;
      } else {
        total = operate(total, '100', '÷');
      }
      break;
    case '+/-':
      if (next) {
        next = operate(next, '-1', 'X');
      } else {
        total = operate(total, '-1', 'X');
      }

      break;
    case '=':
      // don't do anything if the only value is the total
      if (next) {
        total = operate(total, next, operation);
        next = undefined;
        operation = undefined;
      }

      break;
    default:
      total = operate(total, next, operation);
      next = undefined;
      operation = buttonName;
      break;
  }

  return { total, next, operation };
}

export default calculate;
