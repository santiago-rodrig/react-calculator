import operate from './operate';

function calculate(calculatorObj, buttonName) {
  const result = { operation: null, next: null };
  const { total, next } = calculatorObj;
  result.total = operate(
    total,
    next,
    buttonName,
  );
  return result;
}

export default calculate;
