import Big from 'big.js/big';

function operate(numberOne, numberTwo, operation) {
  numberOne = Big(numberOne);
  numberTwo = Big(numberTwo);
  switch (operation) {
    case '+':
      return numberOne.plus(numberTwo).toString();
  }
}

export default operate;
