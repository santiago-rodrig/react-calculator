import calculate from '../src/logic/calculate';
import Big from 'big.js/big';

test('calculates the sum of two numbers', () => {
  const given = calculate(1, 2, '+')
  const expected = (() => {
    const n1 = Big(1);
    const n2 = Big(2);
    return n1.plus(n2).toString()
  })();
  expect(given).toBe(expected);
});
