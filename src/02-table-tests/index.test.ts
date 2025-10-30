import { simpleCalculator, Action } from './index';

const calculationTestCases = [
  { a: 2, b: 1, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: -2, action: Action.Add, expected: 1 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
];

describe('simpleCalculator', () => {
  test.each(calculationTestCases)(
    'should calculate $a $action $b correctly',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test.each`
    description                               | action           | a       | b
    ${'invalid operation'}                    | ${'%'}           | ${10}   | ${2}
    ${'invalid first argument'}               | ${Action.Divide} | ${'10'} | ${2}
    ${'invalid second argument'}              | ${Action.Add}    | ${10}   | ${'2'}
    ${'both invalid arguments'}               | ${Action.Add}    | ${'10'} | ${'2'}
    ${'both invalid arguments and operation'} | ${'%'}           | ${'10'} | ${'2'}
  `(`should return null for $description`, ({ a, b, action }) => {
    expect(simpleCalculator({ a, b, action })).toBeNull();
  });
});
