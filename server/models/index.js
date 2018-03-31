const Promise = require('bluebird');
const db = require('../db');

getUserId = async (username, callback) => {
  const query = 'SELECT * FROM usernames WHERE username = (?);';
  const values = [username];
  try {
    const results = await db.connection.query(query, values);
    return results[0].id;
  } catch (error) {
    console.log('Error:', error);
  }
};


module.exports = {
  messages: {
    get: async () => {
      const query = `SELECT u.username, m.contents AS text, m.roomname 
      FROM messages m 
      LEFT JOIN usernames u ON m.username_id = u.id;`;
      try {
        const messages = await db.connection.query(query);
        return messages;
      } catch (error) {
        console.log('Error:', error);
      }
    },
    post: async message => {
      const { username, text, roomname } = message;
      const id = await getUserId(username);
      const values = [id, text, roomname];
      const query = `INSERT IGNORE INTO messages (username_id, contents, roomname) VALUES (?, ?, ?)`;
      try {
        const results = await db.connection.query(query, values);
        return results;
      } catch (error) {
        console.log('Error:', error);
      }
    }
  },
  
  users: {
    get: async () => {
      const query = 'SELECT username FROM usernames;';
      try {
        const results = await db.connection.query(query);
        const usernames = results.map(rowEntry => rowEntry.username);
        return usernames;
      } catch (error) {
        console.log('Error:', error);
      }
    },
    
    
    post: async (username) => {
      const query = 'INSERT IGNORE INTO usernames (username) VALUE (?);';
      const values = [username];
      try {
        let result = await db.connection.query(query, values);
        return result;
      } catch (error) {
        console.log('Error:', error);
      }
    }
  }
};