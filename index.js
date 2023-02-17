// require('dotenv').config();
const express = require('express');
const config = require('./config');
const decode = require('./lnurl');

const app = express();

app.use(express.json());

// Looks user from config
const findUser = (userName) => {
  let response = null;
  config.users.forEach((user) => {
    if (user.name === userName) {
      response = user;
    }
  });
  return response;
};

// /.well-known/lnurlp/<username>
app.get('/.well-known/lnurlp/:userName', async (req, res) => {
  const userName = req.params.userName;
  const response = findUser(userName);
  if (response) {
    const decodedResponse = await decode(response);
    if (decodedResponse) {
      return res.status(200).json(decodedResponse);
    }
  }
  res.sendStatus(404);
});

app.listen(config.port, () => {
  console.log(`server started at port ${config.port}`);
});
