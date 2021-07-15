document.addEventListener('keypress', ({ key }) => {
  if (key === '*') {
    action('x');
  } else if (key === 'Enter') {
    calculate();
  } else {
    action(key);
  }
}, false);

document.addEventListener('keydown', ({ key }) => {
  if (key === 'Backspace') {
    action('CE');
  } else if (key === 'Delete') {
    clearScreen();
  }
}, false);
