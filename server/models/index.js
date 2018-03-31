const Promise = require('bluebird');
const connection = require('../db');
console.log('connection:', connection);

getUserId = (username, callback) => {
  const query = 'SELECT * FROM usernames WHERE username = (?);';
  const values = [username];
  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log('ERROR GETTING ID:', err);
    }
    callback(err, results[0].id);
  });
};
var getUserIdAsync = Promise.promisify(getUserId);


module.exports = {
  messages: {
    get: function () {
      // retrieve usernames from messages
      const query = 'SELECT * FROM messages;';
      connection.query(query, (err, results, fields) => {
        if (err) {
          console.log('ERROR GETTING MESSAGES:', err);
        }
      });
      // what do you get back?
      // TODO: parse and return query results
    },
    post: function (message) {
      let {username, text, roomname} = message;
      // retrieve user_id from users
      getUserIdAsync(username)
        .then(id => {
          const values = [id, text, roomname];
          const query = `INSERT INTO messages 
            (username_id, contents, roomname) 
            VALUES (?, ?, ?)`;
          // insert into messages
          connection.query(query, values, (err, results, fields) => {
            if (err) {
              console.log('ERROR INSERTING A MESSAGE:', err);
            }
          });    
        }).catch(err => console.log(err));
    }
  },

  users: {
    get: async () => {
      let usernames;
      // retrieve usernames from users
      const query = 'SELECT username FROM usernames;';
      let rows = await connection.query(query).catch(err => console.log(err));
      usernames = rows.map(rowEntry => {
        return rowEntry.username;
      });
      return usernames;
    },

    
    post: function (username) {
      const query = 'INSERT IGNORE INTO usernames (username) VALUE (?);';
      const values = [username];
      // insert in to table users
      connection.query(query, values, (err, results, fields) => {
        if (err) {
          console.log('ERROR POSTING USERNAME:', err);
        }
      });
    }
  }
};


module.exports.users.get().then(results => console.log(results));