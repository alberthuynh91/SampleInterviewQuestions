// The following code can be copy and pasted into a replit or node js file

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
async function fetchJson() {
  console.log(`fetching data`)
  const firstFetch = await fetch("https://jsonplaceholder.typicode.com/todos");
  console.log(`after first fetch`)
  const data = await firstFetch.json()
  console.log(`after second fetch with data: `, data)
}

fetchJson()
console.log(`done`)

// Question:
// In which order are the console logs outputted?
