import Big from 'big.js/big';

function operate(numberOne, numberTwo, operation) {
  const bigOne = Big(numberOne); const
    bigTwo = Big(numberTwo);
  let result;
  switch (operation) {
    case '+':
      result = bigOne.plus(bigTwo).toString();
      break;
    default:
      result = 'NaN';
      break;
  }
  return result;
}

export default operate;
