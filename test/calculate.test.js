import calculate from '../src/logic/calculate';
import Big from 'big.js/big';

test('calculates the sum of two numbers', () => {
  const calculator = { total: '1', next: '2', operation: undefined };
  calculate(calculator, '+')
  const expected = (() => {
    const n1 = Big('1');
    const n2 = Big('2');
    return n1.plus(n2).toString()
  })();
  const { total } = calculator;
  expect(total).toBe(expected);
});
