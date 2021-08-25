let central = require('./central'),
    db1 = require('./db1'),
    db2 = require('./db2'),
    db3 = require('./db3'),
    vault = require('./vault'),
    mark = require('./mark');

module.exports = function(id) {

  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  const dbPromise = (dbString) => {
    return new Promise((resolve, reject) => {
      dbs[dbString](id)
        .then(resolve)
        .catch(() => {
          reject('Error ' + dbString);
        })
    })
  }

  const centralPromise = new Promise((resolve, reject) => {
    central(id)
      .then((dbString) => {
        resolve(dbPromise(dbString))
      })
      .catch(() => {
        reject('Error central');
      })
  })

  const vaultPromise = new Promise((resolve, reject) => {
    vault(id)
      .then(resolve)
      .catch(() => {
        reject('Error vault');
      })
  })

  return new Promise((resolve, reject) => {
    Promise
      .all([centralPromise, vaultPromise])
      .then((data) => {
        mark(id)
        const payload = {
          id,
          username: data[0].username,
          country: data[0].country,
          firstname: data[1].firstname,
          lastname: data[1].lastname,
          email: data[1].email
        }
        resolve(payload)
      })
      .catch(reject)
    })
};