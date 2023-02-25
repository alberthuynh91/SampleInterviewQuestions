# problem can be found https://www.codewars.com/kata/52859abdf8fc1b12e0000141/train/javascript

// Write a function that takes a hierarchical map of properties and converts it to a single, flattened map, with the different levels separated by a forward slash ('/').

// For example, given an input such as this:
// {
//   'a': {
//     'b': {
//       'c': 12,
//       'd': 'Hello World'
//     },
//     'e': [1,2,3]
//   }
// }

// return a new map:
// {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }

// Flattens an hierarchical map into a single level
function flattenMap(map) {
  // Add your code here
  
}

const myMap = {
  'a': {
    'b': {
      'c': null,
      'd': 'Hello World'
    },
    'e': [1, 2, 3]
  }
}
