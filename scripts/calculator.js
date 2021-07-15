let screenText = '';
let last = '';

let ops = [];
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const ops1 = ['+', '-'];
const ops2 = ['/', 'x'];

const reset = () => {
  screenText = '';
  last = '';
  ops = [];
};

const action = (symbol) => {
  if (nums.includes(symbol) && last !== ')') {
    screenText += symbol;
  } else if (ops1.includes(symbol) && last !== '.' && last !== '+' && last !== '-') {
    screenText += symbol;
  } else if (ops2.includes(symbol) && (nums.includes(last) || last === ')')) {
    screenText += symbol;
  } else if (symbol === '.' && last !== ')' && last !== '.') {
    screenText += symbol;
  } else if (symbol === 'CE') {
    screenText = screenText.slice(0, -1);
  } else if (symbol === '(' && last !== '.') {
    screenText += symbol;
  } else if (symbol === ')' && (nums.includes(last) || last === ')')) {
    screenText += symbol;
  }

  last = screenText.slice(-1);
  document.getElementById('screen').innerText = screenText;
};

const doCalculation = (value1, value2, operator) => {
  let result = 0;

  switch (operator) {
    case '/':
      result = Number(value1) / Number(value2);
      break;
    case 'x':
      result = Number(value1) * Number(value2);
      break;
    case '+':
      result = Number(value1) + Number(value2);
      break;
    case '-':
      result = Number(value1) - Number(value2);
      break;
    default:
      break;
  }

  return result;
};

const doPrecedence = (arr) => {
  let i = 1;

  do {
    if (arr[i] === 'x' || arr[i] === '/') {
      const result = doCalculation(arr[i - 1], arr[i + 1], arr[i]);
      arr[i - 1] = result;
      arr = [...arr.slice(0, i), ...arr.slice(i + 2)];
      i -= 1;
    }

    i += 1;
  } while (i < arr.length);

  i = 1;

  do {
    if (arr[i] === '+' || arr[i] === '-') {
      const result = doCalculation(arr[i - 1], arr[i + 1], arr[i]);
      arr[i - 1] = result;
      arr = [...arr.slice(0, i), ...arr.slice(i + 2)];
      i -= 1;
    }

    i += 1;
  } while (i < arr.length);

  return arr[0];
};

const calculate = () => {
  const text = screenText.split('');
  last = 'CE';

  text.forEach((readingChar) => {
    if (readingChar === '/'
      || readingChar === 'x'
      || readingChar === '+'
      || readingChar === '-'
      || readingChar === '('
      || readingChar === ')'
    ) {
      ops.push(readingChar);
    } else if (nums.includes(last) || last === '.') {
      ops[ops.length - 1] += readingChar;
    } else {
      ops.push(readingChar);
    }

    last = readingChar;
  });

  const result = doPrecedence(ops);
  reset();
  screenText = result;
  document.getElementById('screen').innerText = screenText;
};

const clearScreen = () => {
  reset();
  document.getElementById('screen').innerText = screenText;
};
