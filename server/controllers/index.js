var models = require('../models');

const addHeaders = res => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
}

module.exports = {
  messages: {
    get: async (req, res) => {
      let messages = await models.messages.get();
      messages = JSON.stringify(messages);
      addHeaders(res);
      res.status(200).send(messages); 
    },
    post: async (req, res) => {
      const message = req.body;
      const result = await models.messages.post(message);
      addHeaders(res);
      res.status(201).send();
    }
  },
  
  users: {
    get: async (req, res) => {
      let users = await models.users.get();
      users = JSON.stringify(users);
      addHeaders(res);
      res.status(200).send(users); 
    },
    post: async (req, res) => {
      const username = req.body.username;
      const result = await models.users.post(username);
      addHeaders(res);
      res.status(201).send();
    }
  },

  options: function (req, res, next) {
    addHeaders(res);
    res.send(200);
  }
};