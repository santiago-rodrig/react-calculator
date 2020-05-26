import operate from './operate';

function calculate(calculatorObj, buttonName) {
  let { total, next, operation } = calculatorObj;

  switch (buttonName) {
    case '%':
      total = operate(total, next, operation);
      total = operate(total, '100', '÷');
      next = undefined;
      operation = undefined;
      break;
    case '+/-':
      next = operate(next, '-1'. 'X');
      break;
    case '=':
      total = operate(total, next, operation);
      next = undefined;
      operation = undefined;
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
