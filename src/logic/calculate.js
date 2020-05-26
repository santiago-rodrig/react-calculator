import operate from './operate';

function calculate(calculatorObj, buttonName) {
  calculatorObj.operation = buttonName;
  calculatorObj.total = operate(
    calculatorObj.total,
    calculatorObj.next,
    calculatorObj.operation,
  );
  calculatorObj.next = undefined;
  calculatorObj.operation = undefined;
}

export default calculate;
