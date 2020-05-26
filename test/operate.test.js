import Big from 'big.js/big';
import operate from '../src/logic/operate';

// The Big library is already tested, right?
function buildExpected(numberOne, numberTwo, operation) {
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
    default:
      result = 'NaN';
      break;
  }

  return result.toString();
}

test('it adds two numbers', () => {
  const numberOne = '1946';
  const numberTwo = '9878';
  const given = operate(numberOne, numberTwo, '+');
  const expected = buildExpected(numberOne, numberTwo, '+');
  expect(given).toEqual(expected);
});

test('it subtracts two numbers', () => {
  const numberOne = '1946';
  const numberTwo = '9878';
  const given = operate(numberOne, numberTwo, '-');
  const expected = buildExpected(numberOne, numberTwo, '-');
  expect(given).toEqual(expected);
});

test('it multiplies two numbers', () => {
  const numberOne = '1946';
  const numberTwo = '9878';
  const given = operate(numberOne, numberTwo, 'X');
  const expected = buildExpected(numberOne, numberTwo, 'X');
  expect(given).toEqual(expected);
});

test('it divides two numbers', () => {
  const numberOne = '1946';
  const numberTwo = '9878';
  const given = operate(numberOne, numberTwo, '÷');
  const expected = buildExpected(numberOne, numberTwo, '÷');
  expect(given).toEqual(expected);
});

test('it returns NaN on unknown operations', () => {
  const numberOne = '1946';
  const numberTwo = '9878';
  const given = operate(numberOne, numberTwo, 'whoops');
  const expected = buildExpected(numberOne, numberTwo, 'whoops');
  expect(given).toEqual(expected);
});
