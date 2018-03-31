const Promise = require('bluebird');
const db = require('../db');

getUserId = async (username, callback) => {
  const query = 'SELECT * FROM usernames WHERE username = (?);';
  const values = [username];
  const results = await db.connection.query(query, values).catch(err => console.log(err));
  return results[0].id;
};


module.exports = {
  messages: {
    get: async () => {
        const query = `SELECT u.username, m.contents AS text, m.roomname 
                      FROM messages m 
                      LEFT JOIN usernames u ON m.username_id = u.id;`;
        const messages = await db.connection.query(query).catch(err => console.log('Error:', err));
        console.log(messages);
        return messages;
    },
    post: async message => {
      const {username, text, roomname} = message;
      const id = await getUserId(username);
      const values = [id, text, roomname];
      const query = `INSERT IGNORE INTO messages (username_id, contents, roomname) VALUES (?, ?, ?)`;
      const results = await db.connection.query(query, values).catch(err => console.log('Error:', err));
      return results;
    }
  },

  users: {
    get: async () => {
      const query = 'SELECT username FROM usernames;';
      const results = await db.connection.query(query).catch(err => console.log('Error:', err));
      const usernames = results.map(rowEntry => rowEntry.username);
      return usernames;
    },

    
    post: async (username) => {
      const query = 'INSERT IGNORE INTO usernames (username) VALUE (?);';
      const values = [username];
      let result = await db.connection.query(query, values).catch(err => console.log('Error:', err));
      return result;
    }
  }
};