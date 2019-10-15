var questionsEasy = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "JavaScript starts counting at ____",
    choices: ["0", "1", "2", "3"],
    answer: "0"
  },
  {
    title:
      "To get the number of items in an Object in JavaScript with can use the built-in ____ property",
    choices: ["size", "numberOfItems", "length", "dimension"],
    answer: "length"
  },
  {
    title:
      "To log a message in the browser's Developer Console we can use the built-in method ____",
    choices: ["navigator.alert()", "prompt()", "alert()", "console.log()"],
    answer: "console.log()"
  }
];

const questionsHard = [
  {
    title: "typeof null",
    choices: ["null", "undefined", "object", "number"],
    answer: "object"
  },
  {
    title: "typeof fn()",
    choices: ["object", "function", "string", "Depends on what fn() returns"],
    answer: "function"
  },
  {
    title:
      "Is there a functional difference between the variable keywords var and let?",
    choices: [
      "No, let is simply the modern variant",
      "Yes, they will be available in different scopes",
      "Let should be used for living beings, var is for inanimate objects",
      "Yes, var is for variables that you want to store locally."
    ],
    answer: "Yes, they will be available in different scopes"
  },
  {
    title: "Hoisting refers to ____",
    choices: [
      "putting all of your variable declarations at the top",
      "naming variables in a semantical way",
      "ensuring type safety in boolean comparisons",
      "how the JavaScript engine compiles your code. Variable declarations are automatically 'raised' to the top (but are not intialized)."
    ],
    answer:
      "how the JavaScript engine compiles your code. Variable declarations are automatically 'raised' to the top (but are not intialized)."
  },
  {
    title: "Which of the following is NOT a built-in type in JavaScript ES6",
    choices: ["undefined", "array", "object", "null"],
    answer: "array"
  },
  {
    title:
      "When two values of different types are compared in JavaScript, one of the two will be coerced into a different type before the comparison. What will the JS engine compare after coercing the following: '42'==42?",
    choices: [
      "42==42",
      "'42'=='42'",
      "No coercion will take place because we disallowed it with the == operator",
      "It depends on your JS engine"
    ],
    answer: "42==42"
  },
  {
    title: "What will the following statement return? Boolean('false' && '0' && '')",
    choices: ["true", "false", "null", "undefined"],
    answer: "true"
  }
];
