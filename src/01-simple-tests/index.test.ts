// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: '+' })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '-' })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '*' })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: '/' })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: '^' })).toBe(100);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '10', b: 2, action: '/' })).toBeNull();
    expect(simpleCalculator({ a: 10, b: '2', action: '/' })).toBeNull();
  });
});
