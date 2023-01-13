const someFakeData = [
  { name: 'Bert', age: 12 },
  { name: 'Jean', age: 21 }
]

const myApiCall = (password) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === 'password') {
          resolve(someFakeData)
        } else {
          reject(`Password is incorrect`)
        }
      }, 2000)
    })
}

myApiCall('password').then((data) => {
  console.log(`what is data? : `, data)
})


// Here are some good resources if you need to brush up on Promises
// https://danlevy.net/visualizing-promises/
// https://danlevy.net/promise-gotchas/
// https://danlevy.net/javascript-promises-quiz/
// https://exploringjs.com/es6/ch_promises.html