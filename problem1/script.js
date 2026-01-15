// Problem 1: Three ways to sum to n

/*
Assumptions:
- Input must be a positive integer
- No decimals
- No strings
- No negative numbers
*/

// *** Validates that input is a positive integer; returns error message if invalid, otherwise null. ***
function validateInteger(n) {
  if (!Number.isInteger(n))
    return "Input must be an integer (no decimal, no string).";
  if (n < 1) return "Input must be a positive number greater than 0.";
  return null;
}

// *** Iterative implementation ***
var sum_to_n_a = function (n) {
  const error = validateInteger(n);
  if (error) return error;

  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
};

// *** Recursive implementation ***
var sum_to_n_b = function (n) {
  const error = validateInteger(n);
  if (error) return error;

  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
};

// *** Calculates the sum using a mathematical formula ***
var sum_to_n_c = function (n) {
  const error = validateInteger(n);
  if (error) return error;

  return (n * (n + 1)) / 2;
};

// *** Tests ***
console.log("sum_to_n_a(5)   -> ", sum_to_n_a(5)); // 15
console.log("sum_to_n_a(-5)  -> ", sum_to_n_a(-5)); // Input must be a positive number greater than 0.
console.log("sum_to_n_a(5.5) -> ", sum_to_n_a(5.5)); // Input must be an integer (no decimal, no string).
console.log("sum_to_n_a('a') -> ", sum_to_n_a("a")); // Input must be an integer (no decimal, no string).
console.log("____________________");

console.log("sum_to_n_b(5)   -> ", sum_to_n_b(5)); // 15
console.log("sum_to_n_a(-5)  -> ", sum_to_n_b(-5)); // Input must be a positive number greater than 0.
console.log("sum_to_n_b(5.5) -> ", sum_to_n_b(5.5)); // Input must be an integer (no decimal, no string).
console.log("sum_to_n_b('b') -> ", sum_to_n_b("b")); // Input must be an integer (no decimal, no string).
console.log("____________________");

console.log("sum_to_n_c(5)   -> ", sum_to_n_c(5)); // 15
console.log("sum_to_n_a(-5)  -> ", sum_to_n_c(-5)); // Input must be a positive number greater than 0.
console.log("sum_to_n_c(5.5) -> ", sum_to_n_c(5.5)); // Input must be an integer (no decimal, no string).
console.log("sum_to_n_c('c') -> ", sum_to_n_c("c")); // Input must be an integer (no decimal, no string).
