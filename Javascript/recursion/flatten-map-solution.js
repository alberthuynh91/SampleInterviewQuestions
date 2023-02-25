const isNotObjectOrArray = (val) => {
  if (Array.isArray(val)) {
    return false
  }
  if (typeof val === "object") {
    return false
  }
  return true
}

// Flattens an hierarchical map into a single level
function flattenMap(map) {
  // Add your code here
  const result = {}

  for (const key in map) {
    if (!isNotObjectOrArray(map[key]) && map[key] !== null) {
      if (Array.isArray(map[key])) {
        result[key] = map[key]
      } else {
        const temp = flattenMap(map[key]);
        for (const j in temp) {
          result[key + '/' + j] = temp[j];
        }
      }

    } else {
      result[key] = map[key]
    }
  }
  return result
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


console.log(flattenMap(myMap))
