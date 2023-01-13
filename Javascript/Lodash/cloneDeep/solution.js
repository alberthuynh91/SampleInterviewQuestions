// Notes : null is an object
// Practice more recursion
// Asking during patreon initial technical assessment
// Some other ways to clone an object involve using JSON.parse(JSON.stringify(obj)) but this has drawbacks
  // See here https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
// Don't forget that objects can also contain functions which must also be cloned

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