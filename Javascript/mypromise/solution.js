// following along https://www.youtube.com/watch?v=1l4wHWQCCIc&t=1529s

const STATE = {
    FULFILLED: 'filfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
  }
  
  class MyPromise {
  
    #thenCbs = []
    #catchCbs = []
    #state = STATE.PENDING
    #value
    #onSuccessBind = this.#onSuccess.bind(this)
    #onFailBind = this.#onFail.bind(this)
  
    constructor(cb) {
      try {
        cb(this.#onSuccessBind, this.#onFailBind)
      } catch (err) {
        this.#onFail(err)
      }
    }
  
    #runCallbacks() {
      if (this.#state === STATE.FULFILLED) {
        this.#thenCbs.forEach((callback) => {
          callback(this.#value) // on success call all the .thens with the success value
        })
        this.#thenCbs = [];
      }
  
      if (this.#state === STATE.REJECTED) {
        this.#catchCbs.forEach((callback) => {
          callback(this.#value)
        })
      }
    }
  
    #onSuccess(value) {
      // promises always happen asynchronously so we want to queue this up. we dont want to run this code immediately we want to wait a ~microsecond
      queueMicrotask(() => {
        if (this.#state !== STATE.PENDING) return // to prevent calling resolve multiple times
  
        if (value instanceof MyPromise) { // handlepossible promise value being passed to onSuccess
          value.then(this.#onSuccessBind, this.#onFailBind) // we need to wait for promise to resolve and then call correct resolver function
        //   return
        }
        this.#value = value
        this.#state = STATE.FULFILLED
        this.#runCallbacks()
      })
    }
  
    #onFail(value) {
      queueMicrotask(() => {
        if (this.#state !== STATE.PENDING) return // to prevent calling reject multiple times
  
        if (value instanceof MyPromise) { // handle promise being passed to onSuccess
          value.then(this.#onSuccessBind, this.#onFailBind) // we need to wait for promise to resolve and then call correct resolver function
        //   return
        }
  
        this.#value = value
        this.#state = STATE.REJECTED
        this.#runCallbacks()
      })
    }
  
    then(thenCb, catchCb) {
      return new MyPromise((resolve, reject) => {
        this.#thenCbs.push((result) => {
          if (thenCb == null) { // skip resolving with thenCb if no thenCb is provided
            resolve(result)
            // return
          }
          const previousPromiseResult = thenCb(result)
          try {
            resolve(previousPromiseResult) // passes on result to the next promise
          } catch (err) {
            reject(err)
          }
        })

        this.#catchCbs.push((result) => {
            if (catchCb == null) {
                reject(result)
                // return
            }
            try {
                const previousPromiseResult = catchCb(result)
                resolve(previousPromiseResult)
            } catch (err) {
                reject(err)
            }
        })
  
  
        this.#runCallbacks()
      })
    }
  
    catch(cb) {
      return this.then(undefined, cb)
    }
  
    finally(cb) {
      return this.then((result) => {
        cb()
        return result
      }, (result) => {
        cb()
        throw result
      })
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    static all(promises) {
        const fulfilled = []
        const completedPromises = 0
        return new Promise((resolve, reject) => {
            promises.forEach((promise) => {
                promise.then((result, idx) => {
                    fulfilled[idx] = result
                    completedPromises++
                    if (completedPromises === promises.length) {
                        resolve(fulfilled)
                    }
                }).catch((err) => {
                    reject(err)
                })
            })
        })
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
    static allSettled(promises) {
        const settled = []
        const completedPromises = 0
        return new Promose((resolve) => {
            promises.forEach((promise) => {
                promise.then((value, idx) => {
                    const settledObj = {
                        status: 'fulfilled',
                        value
                    }
                    settled[idx] = settledObj
                }).catch((err) => {
                    settledObj = {
                        status: 'rejected',
                        reason: `Error: ${err}`
                    }
                    settled[idx] = settledObj
                    
                }).finally(() => {
                    completedPromises++
                    if (completedPromises === promises.length) {
                        resolve(settled)
                    }
                })
            })      
        })
      }

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
      static race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((promise) => {
                promise.then(resolve).catch(reject)
            })
        })
      }

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
      static any(promises) {
        const errors = []
        const rejectedPromises = 0
        return new Promise((resolve, reject) => {
            promises.forEach((promise, idx) => {
                promise.then(resolve).catch((err) => {
                    rejectedPromises++
                    errors[idx] = err
                    if (rejectedPromises === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"))
                    }
                })
            })
        })
      }
  }
  
  
  
  
  const promise1 = new MyPromise((resolve, reject) => {
    console.log(`hello world`)
    resolve(1)
  })
  
  // const promise2 = new MyPromise((resolve, reject) => {
  //   console.log('hi')
  //   setTimeout(() => {
  //     resolve('2')
  //   }, 2000)
  // })
  
  // const promise3 = new MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     const anotherPromise = new Promise((resolve, reject) => resolve(100))
  //     resolve(anotherPromise)
  //   }, 1000)
  // })
  
  // promise1.then((res) => console.log(res))
  promise1.then((res) => {
    console.log(res)
    return res+4
  }).then((res) => console.log(`adding 4 to previous result: `, res))
  // promise2.then((res) => console.log(res))