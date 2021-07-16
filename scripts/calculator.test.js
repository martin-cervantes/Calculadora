import { action, calculate } from './calculator.js';

test('Clean screen', () => {
  expect(action(1)).toBe(1);
});

test('Print result', () => {
  expect(calculate(1)).toBe(1);
});
