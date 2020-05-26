import Big from 'big.js/big';

function operate(numberOne, numberTwo, operation) {
  const bigOne = Big(numberOne);
  const bigTwo = Big(numberTwo);

  let result;

  switch (operation) {
    case '+':
      result = bigOne.plus(bigTwo);
      break;
    case '-':
      result = bigOne.minus(bigTwo);
      break;
    case 'X':
      result = bigOne.times(bigTwo);
      break;
    case '÷':
      result = bigOne.div(bigTwo);
      break;
    default:
      result = 'NaN';
      break;
  }

  return result.toString();
}

export default operate;
