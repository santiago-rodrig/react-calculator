import Big from 'big.js/big';

function calculate(numberOne, numberTwo, operation) {
  numberOne = Big(numberOne);
  numberTwo = Big(numberTwo);

  switch (operation) {
    case '+':
    return numberOne.plus(numberTwo).toString()
  }
}

export default calculate;
