import calculate from '../src/logic/calculate';
import operate from '../src/logic/operate';

function buildCalculator(total, next) {
  return { total, next, operation: null };
}

function buildExpected(total, next, operation) {
  const result = operate(total, next, operation);
  return { total: result, next: null, operation: null };
}

test('calculates the sum of two common numbers', () => {
  const numberOne = '1';
  const numberTwo = '2';
  const calculator = buildCalculator(numberOne, numberTwo);
  const given = calculate(calculator, '+');
  const expected = buildExpected(numberOne, numberTwo, '+');
  expect(given).toEqual(expected);
});

test('calculates the sum of two big numbers', () => {
  const numberOne = '10909887918723';
  const numberTwo = '223187263712';
  const calculator = buildCalculator(numberOne, numberTwo);
  const given = calculate(calculator, '+');
  const expected = buildExpected(numberOne, numberTwo, '+');
  expect(given).toEqual(expected);
});
