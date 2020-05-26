import Big from 'big.js/big';
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
  const calculator = buildCalculator('1', '2');
  const given = calculate(calculator, '+');
  const expected = buildExpected('1', '2', '+');
  expect(given).toEqual(expected);
});
