const STATE = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}

const isThenable = (value) => {
  return value && typeof value.then === "function"
}
class MyPromise {
  constructor(handler) {
    this._state = STATE.PENDING
    this._value = undefined
    this._reason = undefined
    this._taskQueue = []
    this._finallyQueue = [] 

    if (typeof handler === 'function') {
      try {
        // necessary to run async after event loop (macrotask)
        // we add them to the task queue of the event loop
        setTimeout(() => {
          handler(this._onFulfilled.bind(this), this._onRejected.bind(this))
        }, 0)
      } catch (err) {
          this._onRejected(err)
      }
    }
  }

  _onFulfilled(value) {
    console.log(`<<<<<< onFulfilled called: `)
    if (this._state === STATE.PENDING) {
      this._state = STATE.FULFILLED
      this._value = value
      this._propagateFulfilled()
    }
  }

  _onRejected(reason) {
    console.log(`<<<<<< onRejected called: `)

    if (this._state === STATE.PENDING) {
      this._state = STATE.REJECTED
      this._reason = reason
      this._propagateRejected()
    }
  }

  _propagateFulfilled() {
    this._taskQueue.forEach(([controlledPromise, fulfilledFn]) => {
      if (typeof fulfilledFn === 'function') {
        const valueOrPromise = fulfilledFn(this._value)
        if (isThenable(valueOrPromise)) {
          valueOrPromise.then(
            (value) => controlledPromise._onFulfilled(value),
            (reason) => controlledPromise._onRejected(reason)
          )
        } else {
          controlledPromise._onFulfilled(valueOrPromise)
        }
      }
      return controlledPromise._onFulfilled(this._value)
    })

    this._finallyQueue.forEach(([controlledPromise, finallyFn]) => {
      finallyFn()
      controlledPromise._onFulfilled(this._value)
    })

    this._taskQueue = []
    this._finallyQueue = []
  }

  _propagateRejected() {
    this._taskQueue.forEach(([controlledPromise, _, catchFn]) => {
      if (typeof catchFn === 'function') {
        const valueOrPromise = catchFn(this._value)
        if (isThenable(valueOrPromise)) {
          valueOrPromise.then(
            (value) => controlledPromise._onFulfilled(value),
            (reason) => controlledPromise._onRejected(reason) 
          )
        } else {
          controlledPromise._onFulfilled(valueOrPromise)
        }
      }
      return controlledPromise._onRejected(this._reason)
    })

    this._finallyQueue.forEach(([controlledPromise, finallyFn]) => {
      finallyFn()
      controlledPromise._onRejected(this._value)
    })


    this._taskQueue = []
    this._finallyQueue = []
  }

  finally(fn) {
    const controlledPromise = new MyPromise()
    if (this._state !== STATE.PENDING) {
      fn()
      return this._state === STATE.FULFILLED
      ? controlledPromise.resolve(this._value)
      : controlledPromise.reject(this._reason)
    }

    this._finallyQueue.push([controlledPromise, fn])
    return controlledPromise
  }

  then(fulfilledFn, catchFn) {
    // creates a new pending promise
    const controlledPromise = new MyPromise()
    this._taskQueue.push([controlledPromise, fulfilledFn, catchFn])

    if (this._state === STATE.FULFILLED) {
      this._propagateFulfilled()
    } else if (this._state === STATE.REJECTED) {
      this._propagateRejected()
    }

    return controlledPromise
  }

  catch(catchFn) {
    return this.then(undefined, catchFn)
  }


}

MyPromise.resolve = (value) => {
  return new MyPromise((resolve) => {
    resolve(value)
  })
}

MyPromise.reject = (value) => {
  return new MyPromise((_, reject) => {
    reject(value)
  })
}




const fs = require('fs');
const path = require('path');

const readFile = (filename, encoding) => new MyPromise((resolve, reject) => {
  fs.readFile(filename, encoding, (err, value) => {
    if (err) {
      return reject(err);
    }
    resolve(value);
  })
});

const delay = (timeInMs, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value)
    }, timeInMs)
  })
}

readFile(path.join(__dirname, 'solution.js'), 'utf8')
  .then((text) => {
    console.log(`${text.length} characters read`)
    return delay(2000, text.replace(/[aeiou]/g, ''))
  })
  .then((newText) => {
    console.log(newText.slice(0, 200))
  })
  .catch((err) => {
    console.error('An error occurred!')
    console.error(err)
  })
  .finally(() => {
    console.log(`--- All done! ---`)
  })
