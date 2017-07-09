const MongoClient = require('mongodb').MongoClient;


var state = {
  db: null
};

function connect() {

  return new Promise((resolve, reject) => {
    if (state.db) {
      return resolve();
    }

    return MongoClient.connect('mongodb://npmgit:111222333@ds153352.mlab.com:53352/npmgit', (err, db) => {
      if (err) {
        return reject(err);
      }
      state.db = db;
      return resolve();
    });
  });
}


function getState() {
  return state.db;
}


module.exports = {
    connect: connect,
    getState: getState
}