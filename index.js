const express = require('express');
const cors = require('cors');
const config = require('./config');
const decode = require('./lnurl');

const app = express();

app.use(express.json());
app.use(cors());

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

app.listen(config.port, '127.0.0.1', () => {
  console.log(`server started at port ${config.port}`);
});
