function isEqual(value1, value2) {
    if (typeof value1 === typeof value2) {
  
      if (Array.isArray(value1) && Array.isArray(value2)) {
        if (value1.length !== value2.length) {
          return false
        }
        for (var i = 0; i < value1.length; i++) {
          if (value1[i] !== value2[i]) {
            return false
          }
        }
        return true
      } else if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null) {
        if (Object.keys(value1).length !== Object.keys(value2).length) {
          return false
        }
        for (key in value1) {
          if (typeof value1[key] === 'object' && typeof value2[key] === 'object') {
            return isEqual(value1[key], value2[key])
          } else if (value1[key] !== value2[key]) {
            return false
          }
        }
        return true
      } else {
        return value1 === value2
      }
    }
    return false
  }
  
  
  // console.log(isEqual('a','a'))
  // console.log(isEqual([1,2,3], {key: true}))
  // console.log(isEqual([1,2,3], [1,2,3]))
  // console.log(isEqual({a:1, b:2}, {b:2, a: 1}))
  // console.log(isEqual({a:{ c: 'd'}, b:2}, {b:2, a: {c: 'd'}}))
  // console.log(isEqual({a:{ c: 'd'}, b:2, c: [5,6], x: {}}, {x:{}, b:2, c: [5,6], a: {c: 'd'}}))
  // console.log(isEqual(null, null))
  // console.log(isEqual(null, undefined))
  // console.log(isEqual({a:{ c: null}, b:2}, {b:2, a: {c: 'd'}}))
  console.log(isEqual({a:{ c: null}, b:2}, {b:2, a: {c: null }}))
  