import { action, calculate, clearScreen } from './calculator.js';

document.body.addEventListener('click', ({ target }) => {
  const { innerText } = target;

  if (innerText === '=') {
    calculate();
  } else if (innerText === 'C') {
    clearScreen();
  } else {
    action(innerText);
  }
});
