import Big from 'big.js/big';
import calculate from '../src/logic/calculate';

test('calculates the sum of two numbers', () => {
  const calculator = { total: '1', next: '2', operation: null };
  const given = calculate(calculator, '+');
  const expected = (() => {
    const n1 = Big('1');
    const n2 = Big('2');
    return n1.plus(n2).toString();
  })();
  const { total } = given;
  expect(total).toBe(expected);
});
