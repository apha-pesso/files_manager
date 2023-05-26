function add(a, b) {
  return a + b;
}

function operation(a, b, func) {
  return (func(a, b));
}

function combined(a, b) {
  return a + b;
}

const arr = (a, b) => a + b;

console.log(arr(4, 5));

console.log(operation(2, 4, add));
console.log(combined(2, 4));

