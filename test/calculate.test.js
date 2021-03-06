import calculate from '../src/logic/calculate';

function buildCalculator(total, next = undefined, operation = undefined) {
  return { total, next, operation };
}

describe('addition, subtraction, multiplication, or division', () => {
  describe('division by zero', () => {
    describe('pending operation', () => {
      test('it undefines everything', () => {
        // 567 ÷ 0 X -> ? ? ?
        const calculator = buildCalculator('567', '0', '÷');
        const given = calculate(calculator, 'X');
        const expected = buildCalculator(undefined);
        expect(given).toEqual(expected);
      });
    });
  });

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

  describe('there is no next number', () => {
    test('it changes the operation', () => {
      // 90 + ? X -> 90 X ?
      const calculator = buildCalculator('90', undefined, '+');
      const given = calculate(calculator, 'X');
      const expected = buildCalculator('90', undefined, 'X');
      expect(given).toEqual(expected);
    });
  });

  describe('there is a previous result and a next number', () => {
    test('it uses next value as total and waits for input', () => {
      // 72 =9,X ? - -> 72 - ?
      const calculator = buildCalculator('72', '5', '=9,X');
      const given = calculate(calculator, '-');
      const expected = buildCalculator('5', undefined, '-');
      expect(given).toEqual(expected);
    });
  });
});

describe('percents (%)', () => {
  describe('only total available', () => {
    test('it divides the total by 100', () => {
      // 5 % ? -> 0.05 ? ?
      const calculator = buildCalculator('5', undefined, undefined);
      const given = calculate(calculator, '%');
      const expected = buildCalculator('0.05', undefined, undefined);
      expect(given).toEqual(expected);
    });
  });

  describe('total and operation available', () => {
    test('it multiplies total by itself and divides by 100, the result is assigned to next', () => {
      // 5 - ? % -> 5 - 0.25
      const calculator = buildCalculator('5', undefined, '-');
      const given = calculate(calculator, '%');
      const expected = buildCalculator('5', '0.25', '-');
      expect(given).toEqual(expected);
    });
  });

  describe('pending operation', () => {
    test('it performs the pending operation and divides by 100', () => {
      // 5 + 19 % -> 0.24 ? ?
      const calculator = buildCalculator('5', '19', '+');
      const given = calculate(calculator, '%');
      const expected = buildCalculator('5', '0.95', '+');
      expect(given).toEqual(expected);
    });
  });
});

describe('swap sign (+/-)', () => {
  describe('only total is available', () => {
    test('it swaps the sign of total', () => {
      // 23 ? ? +/- -> -23 ? ?
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

  describe('there is just no next number', () => {
    test('it assignes next to total multiplied by -1', () => {
      // 67 + ? +/- -> 67 + -67
      const calculator = buildCalculator('67', undefined, '+');
      const given = calculate(calculator, '+/-');
      const expected = buildCalculator('67', '-67', '+');
      expect(given).toEqual(expected);
    });
  });
});

describe('equal sign (=)', () => {
  describe('there is a pending operation', () => {
    test('it updates the total and sets the operation to <previousNext>,<operation>', () => {
      // 87 + (-34) = -> 53 ? ?
      const calculator = buildCalculator('87', '-34', '+');
      const given = calculate(calculator, '=');
      const expected = buildCalculator('53', undefined, '=-34,+');
      expect(given).toEqual(expected);
    });

    describe('division by zero', () => {
      test('it undefines everything', () => {
        // 987 ÷ 0 = -> ? ? ?
        const calculator = buildCalculator('987', '0', '÷');
        const given = calculate(calculator, '=');
        const expected = buildCalculator(undefined);
        expect(given).toEqual(expected);
      });
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

  describe('there is no next number', () => {
    // 5 X ? = -> 25 ? ?
    const calculator = buildCalculator('5', undefined, 'X');
    const given = calculate(calculator, '=');
    const expected = buildCalculator('25', undefined, '=5,X');
    expect(given).toEqual(expected);
  });

  describe('there is a previous result', () => {
    // 5 =9,X ? = -> 45 =9,X ?
    const calculator = buildCalculator('5', undefined, '=9,X');
    const given = calculate(calculator, '=');
    const expected = buildCalculator('45', undefined, '=9,X');
    expect(given).toEqual(expected);
  });
});

describe('digits', () => {
  describe('operation is present', () => {
    describe('operation is a result', () => {
      test('it replaces next with the digit', () => {
        // 54 =9,X ? 9 -> 54 =9,X 9
        const calculator = buildCalculator('54', undefined, '=9,X');
        const given = calculate(calculator, '9');
        const expected = buildCalculator('54', '9', '=9,X');
        expect(given).toEqual(expected);
      });
    });

    describe('operation is not a result', () => {
      test('it modifies next to be the sequence of digits passed', () => {
        let calculator;
        let given;
        let expected;

        // 0 + ? 5 -> 0 + 5
        calculator = buildCalculator('0', undefined, '+');
        given = calculate(calculator, '5');
        expected = buildCalculator('0', '5', '+');
        expect(given).toEqual(expected);

        // 17 X ? 9 -> 17 X 9 8 -> 17 X 98
        calculator = buildCalculator('17', undefined, 'X');
        given = calculate(calculator, '9');
        given = calculate(given, '8');
        expected = buildCalculator('17', '98', 'X');
        expect(given).toEqual(expected);
      });
    });
  });

  describe('only total is present', () => {
    describe('total is undefined', () => {
      // ? ? ? 7 -> 7 ? ?
      const calculator = buildCalculator(undefined, undefined, undefined);
      const given = calculate(calculator, '7');
      const expected = buildCalculator('7', undefined, undefined);
      expect(given).toEqual(expected);
    });

    describe('total is not undefined', () => {
      // 7 ? ? 4 -> 74 ? ?
      const calculator = buildCalculator('7', undefined, undefined);
      const given = calculate(calculator, '4');
      const expected = buildCalculator('74', undefined, undefined);
      expect(given).toEqual(expected);
    });
  });
});

describe('decimal point', () => {
  describe('operation is present', () => {
    describe('there is a next number', () => {
      test('it places a decimal point at the end of the next number', () => {
        // 5 - 3 . -> 5 - 3.
        const calculator = buildCalculator('5', '3', '-');
        const given = calculate(calculator, '.');
        const expected = buildCalculator('5', '3.', '-');
        expect(given).toEqual(expected);
      });

      test('it does nothing if there is a decimal point already', () => {
        // 5 - 3. . -> 5 - 3.
        const calculator = buildCalculator('5', '3.', '-');
        const given = calculate(calculator, '.');
        expect(given).toEqual(calculator);
      });
    });

    describe('there is no next number', () => {
      test('it creates 0. as the next number', () => {
        // 5 - ? . -> 5 - 0.
        const calculator = buildCalculator('5', undefined, '-');
        const given = calculate(calculator, '.');
        const expected = buildCalculator('5', '0.', '-');
        expect(given).toEqual(expected);
      });
    });
  });

  describe('only total is present', () => {
    test('it places a decimal point at the end of the total', () => {
      // 99 ? ? . -> 99. ? ?
      const calculator = buildCalculator('99');
      const given = calculate(calculator, '.');
      const expected = buildCalculator('99.');
      expect(given).toEqual(expected);
    });

    test('it does nothing if there is a decimal point already', () => {
      // 99. ? ? . -> 99. ? ?
      const calculator = buildCalculator('99.');
      const given = calculate(calculator, '.');
      expect(given).toEqual(calculator);
    });
  });
});

describe('AC', () => {
  describe('the operation is a result', () => {
    test('it undefines all', () => {
      // 5 =9,X 4 AC -> ? ? ?
      const calculator = buildCalculator('5', '4', '=9,X');
      const given = calculate(calculator, 'AC');
      const expected = buildCalculator(undefined);
      expect(given).toEqual(expected);
    });
  });

  describe('there is a next number', () => {
    test('it undefines the next number', () => {
      // 65 + 23 AC -> 65 + 0
      const calculator = buildCalculator('65', '23', '+');
      const given = calculate(calculator, 'AC');
      const expected = buildCalculator('65', undefined, '+');
      expect(given).toEqual(expected);
    });
  });

  describe('there is no next number, but there is an operation', () => {
    test('it undefines the operation', () => {
      // 87 X ? AC -> 87 ? ?
      const calculator = buildCalculator('87', undefined, 'X');
      const given = calculate(calculator, 'AC');
      const expected = buildCalculator('87', undefined, undefined);
      expect(given).toEqual(expected);
    });
  });

  describe('there is only total', () => {
    test('it undefines the total', () => {
      // 76 ? ? AC -> ? ? ?
      const calculator = buildCalculator('76');
      const given = calculate(calculator, 'AC');
      const expected = buildCalculator(undefined);
      expect(given).toEqual(expected);
    });
  });
});
