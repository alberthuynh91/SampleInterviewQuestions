// following along https://www.youtube.com/watch?v=1l4wHWQCCIc&t=1529s

  class MyPromise {
  
    then() {

    }
  
    catch(cb) {

    }
  
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
    finally(cb) {

    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    static all(promises) {
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
    static allSettled(promises) {

      }

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
      static race(promises) {

      }

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
      static any(promises) {

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