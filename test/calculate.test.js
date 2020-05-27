import calculate from '../src/logic/calculate';

function buildCalculator(total, next = undefined, operation = undefined) {
  return { total, next, operation };
}

describe('addition, subtraction, multiplication, or division', () => {
  describe('pending operation before continuing', () => {
    test('calculates and builds new calculator with pending operation', () => {
      const numberOne = '1';
      const numberTwo = '2';
      let calculator;
      let given;
      let expected;

      // 1 + 2 + -> 3 + ?
      calculator = buildCalculator(numberOne, numberTwo, '+');
      given = calculate(calculator, '+');
      expected = buildCalculator('3', undefined, '+');
      expect(given).toEqual(expected);

      // 1 - 2 X -> -1 X ?
      calculator = buildCalculator(numberOne, numberTwo, '-');
      given = calculate(calculator, 'X');
      expected = buildCalculator('-1', undefined, 'X');
      expect(given).toEqual(expected);

      // 1 X 2 ÷ -> 2 ÷ ?
      calculator = buildCalculator(numberOne, numberTwo, 'X');
      given = calculate(calculator, '÷');
      expected = buildCalculator('2', undefined, '÷');
      expect(given).toEqual(expected);

      // 1 + 2 - -> 3 - ?
      calculator = buildCalculator(numberOne, numberTwo, '+');
      given = calculate(calculator, '-');
      expected = buildCalculator('3', undefined, '-');
      expect(given).toEqual(expected);
    });
  });
});

describe('percents (%)', () => {
  describe('no next number provided', () => {
    test('it divides the total by 100', () => {
      // 5 % ? -> 0.05 ? ?
      const calculator = buildCalculator('5', undefined, undefined);
      const given = calculate(calculator, '%');
      const expected = buildCalculator('0.05', undefined, undefined);
      expect(given).toEqual(expected);
    });
  });

  describe('pending operation', () => {
    test('it performs the pending operation and divides by 100', () => {
      // 5 + 19 % -> 0.24 ? ?
      const calculator = buildCalculator('5', '19', '+');
      const given = calculate(calculator, '%');
      const expected = buildCalculator('0.24', undefined, undefined);
      expect(given).toEqual(expected);
    });
  });
});

describe('swap sign (+/-)', () => {
  describe('only total is available', () => {
    test('it swaps the sign of total', () => {
      // 23 ? +/- -> -23 ? ?
      const calculator = buildCalculator('23', undefined, undefined);
      const given = calculate(calculator, '+/-');
      const expected = buildCalculator('-23', undefined, undefined);
      expect(given).toEqual(expected);
    });
  });

  describe('there is a pending operation', () => {
    test('it swaps the sign of the second operand', () => {
      // 5 X 99 +/- -> 5 X (-99)
      const calculator = buildCalculator('5', '99', 'X');
      const given = calculate(calculator, '+/-');
      const expected = buildCalculator('5', '-99', 'X');
      expect(given).toEqual(expected);
    });
  });
});

describe('equal sign (=)', () => {
  describe('there is a pending operation', () => {
    test('it updates the total and resets the other properties', () => {
      // 87 + (-34) = -> 53 ? ?
      const calculator = buildCalculator('87', '-34', '+');
      const given = calculate(calculator, '=');
      const expected = buildCalculator('53', undefined, undefined);
      expect(given).toEqual(expected);
    });
  });

  describe('only total is available', () => {
    test('it sets the total to itself', () => {
      // 66 ? ? = -> 66 ? ?
      const calculator = buildCalculator('66', undefined, undefined);
      const given = calculate(calculator, '=');
      expect(given).toEqual(calculator);
    });
  });
});
