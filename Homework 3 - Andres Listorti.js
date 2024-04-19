// Homework 3
// Deadline: 22 April

// Task 1: Immutability and Pure Functions
// Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage as arguments. The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.
// Create a pure function called calculateTotalPrice that takes an array of products as an argument. The function should return the total price of all products, without modifying the original array or its items.

// Task 2: Function Composition and Point-Free Style
// Implement a function called getFullName that takes a person object with firstName and lastName properties. The function should return the person's full name in the format "FirstName LastName".
// Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.
// Implement a function called getAverageGrade that takes an array of student objects, each containing a name and grades property. The function should return the average grade of all students, without modifying the original array or its items. Use function composition and point-free style.

// Task 3: Closures and Higher-Order Functions
// Create a function called createCounter that returns a closure. The closure should be a counter function that increments the count on each call and returns the updated count. Each closure should have its own independent count.
// Implement a higher-order function called repeatFunction that takes a function and a number as arguments. The function should return a new function that invokes the original function multiple times based on the provided number. If the number is negative, the new function should invoke the original function indefinitely until stopped.

// Task 4: Recursion and Tail Call Optimization
// Implement a recursive function called calculateFactorial that calculates the factorial of a given number. Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
// Create a recursive function called power that takes a base and an exponent as arguments. The function should calculate the power of the base to the exponent using recursion.

// Task 5: Lazy Evaluation and Generators (*do not use yield)
// Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. The function should return a lazy generator that applies the mapping function to each element of the array one at a time.
// Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time using lazy evaluation.

//Task 1: Immutability and Pure Functions
// calculateDiscountedPrice
function calculateDiscountedPrice(products, discountPercentage) {
  const discountedProducts = [];
  for (const product of products) {
    const discountedPrice = product.price * (1 - discountPercentage / 100);
    const discountedProduct = {
      ...product,
      price: discountedPrice,
    };
    discountedProducts.push(discountedProduct);
  }
  return discountedProducts;
}

// calculateTotalPrice
function calculateTotalPrice(products) {
  let totalPrice = 0;
  for (const product of products) {
    totalPrice += product.price;
  }
  return totalPrice;
}

// Task 2: Function Composition and Point-Free Style
// getFullName
function getFullName(person) {
  return `${person.firstName} ${person.lastName}`;
}

//  filterUniqueWords
function filterUniqueWords(text) {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter((word, index, array) => array.indexOf(word) === index)
    .sort();
}

// getAverageGrade
function getAverageGrade(students) {
    const averages = students.map((student) => {
      const sum = student.grades.reduce((total, grade) => total + grade, 0);
      const average = sum / student.grades.length;
      return { name: student.name, average };
    });
    return averages;
  }
  
// Task 3: Closures and Higher-Order Functions
// createCounter
function createCounter() {
  let count = 0;
  return function counter() {
    count++;
    return count;
  };
}

// repeatFunction
function repeatFunction(fn, num) {
  return function () {
    if (num < 0) {
      while (true) {
        fn();
      }
    } else {
      for (let i = 0; i < num; i++) {
        fn();
      }
    }
  };
}

// Task 4: Recursion and Tail Call Optimization
// calculateFactorial
function calculateFactorial(n, result = 1) {
  if (n === 0) {
    return result;
  }
  return calculateFactorial(n - 1, n * result);
}

// power
function power(base, exponent) {
  if (exponent === 0) {
    return 1;
  }
  return base * power(base, exponent - 1);
}

// Task 5: Lazy Evaluation and Generators (*do not use yield)
// lazyMap
function lazyMap(array, mappingFunction) {
  let index = 0;
  return {
    next: function () {
      if (index >= array.length) {
        return { done: true };
      }
      const result = mappingFunction(array[index]);
      index++;
      return { value: result, done: false };
    },
  };
}

// fibonacciGenerator
function fibonacciGenerator() {
  let prev = 0;
  let curr = 1;
  return {
    next: function () {
      const temp = prev;
      prev = curr;
      curr = temp + curr;
      return { value: prev, done: false };
    },
  };
}

// Examples
console.log("--------------- Discounted Price:");
const products = [
  { name: "Product 1", price: 11 },
  { name: "Product 2", price: 29 },
  { name: "Product 3", price: 32 },
  { name: "Product 4", price: 100 },
];
const discountPercentage = 20;
const discountedProducts = calculateDiscountedPrice(
  products,
  discountPercentage
);
console.log(discountedProducts); // Output: [{ name: 'Product 1', price: 8.8 }, { name: 'Product 2', price: 23.200000000000003 }, { name: 'Product 3', price: 25.6 }, { name: 'Product 4', price: 80 }]
//
console.log("--------------- Total Price:");
const totalPrice = calculateTotalPrice(products);
console.log(`The total of all products is: ${totalPrice}`); // Output: The total of all products is: 172
//
console.log("--------------- Full name:");
const person = {
  firstName: "Andres",
  lastName: "Listorti",
};
console.log(getFullName(person)); // Output: Andres Listorti
//
console.log("--------------- Unique Words:");
const text = "Text used for testing";
const text2 = "Beta Alpha Omega Epsilon beta";
const text3 = "Beta alpha epsilon Alpha Omega Epsilon beta";
console.log(filterUniqueWords(text)); // Output: [ 'for', 'testing', 'text', 'used' ]
console.log(filterUniqueWords(text2)); // Output: [ 'alpha', 'beta', 'epsilon', 'omega' ]
console.log(filterUniqueWords(text3)); // Output: [ 'alpha', 'beta', 'epsilon', 'omega' ]

//
console.log("--------------- Average for every student:");
const students = [
  { name: "Andres", grades: [80, 90, 75] },
  { name: "Alexa", grades: [95, 85, 92] },
  { name: "Juan", grades: [70, 80, 65] },
];
console.log(getAverageGrade(students)); /* [
    { name: 'Andres', average: 81.66666666666667 },
    { name: 'Alexa', average: 90.66666666666667 },
    { name: 'Juan', average: 71.66666666666667 }
  ] */
//
console.log("--------------- Counter:");
const counter1 = createCounter();
console.log(counter1()); // Output: 1
console.log(counter1()); // Output: 2
const counter2 = createCounter();
console.log(counter2()); // Output: 1
console.log(counter2()); // Output: 2
//
console.log("--------------- Repeat:");
function solvd() {
  console.log("Solvd");
}
const repeatSolvd = repeatFunction(solvd, 3);
repeatSolvd(); // Output: Solvd
//                        Solvd
//                        Solvd
// This will keep invoking greet indefinitely until stopped manually.
// const repeatSolvdForever = repeatFunction(solvd, -1);
// repeatSolvdForever(); // Output: Solvd
//                                  Solvd
//                                  Solvd
//                                  ...
//
console.log("--------------- Factorial:");
console.log(calculateFactorial(5)); // Output: 120
console.log(calculateFactorial(11)); // Output: 39916800
console.log(calculateFactorial(10)); // Output: 3628800
console.log(calculateFactorial(0)); // Output: 1
//
console.log("--------------- Power:");
console.log(power(2, 3)); // Output: 8
console.log(power(3, 3)); // Output: 27
console.log(power(5, 0)); // Output: 1
console.log(power(10, 2)); // Output: 100
//
console.log("--------------- Lazy Map:");
const array = [1, 2, 3, 4, 5];
const mappingFunction = (x) => x * 2;
const lazyGenerator = lazyMap(array, mappingFunction);
console.log(lazyGenerator.next()); // Output: { value: 2, done: false }
console.log(lazyGenerator.next()); // Output: { value: 4, done: false }
console.log(lazyGenerator.next()); // Output: { value: 6, done: false }
console.log(lazyGenerator.next()); // Output: { value: 8, done: false }
console.log(lazyGenerator.next()); // Output: { value: 10, done: false }
console.log(lazyGenerator.next()); // Output: { done: true }
//
console.log("--------------- Fibonacci Generator:");
const lazyFibonacci = fibonacciGenerator();
console.log(lazyFibonacci.next().value); // 1
console.log(lazyFibonacci.next().value); // 1
console.log(lazyFibonacci.next().value); // 2
console.log(lazyFibonacci.next().value); // 3
console.log(lazyFibonacci.next().value); // 5
console.log(lazyFibonacci.next().value); // 8
// And so on, each call to lazyFibonacci() will produce the next Fibonacci number
