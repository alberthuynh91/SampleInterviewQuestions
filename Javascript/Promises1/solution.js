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
