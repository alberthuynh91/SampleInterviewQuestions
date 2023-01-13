// Notes : null is an object
// Practice more recursion
// Asking during patreon initial technical assessment

const cloneDeep = (obj) => {
    const copiedObj = Array.isArray(obj) ? [] : {}
    for (prop in obj) {    
      if (typeof obj[prop] === 'Object' && typeof obj[prop] !== 'null') {
        copiedObj[prop] = cloneDeep(obj[prop])
      } else {
        copiedObj[prop] = obj[prop]
      }
    }
    return copiedObj
  }

const obj = {a: [1,2,3], o1: {o2: {}}, b: 'string', c: false, n: null}
const copy = cloneDeep(obj)