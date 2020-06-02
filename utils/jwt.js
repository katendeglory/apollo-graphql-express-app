const jwt = require("jsonwebtoken");
const { ApolloError } = require('apollo-server-express');

//TODO: HANDLE ERRORS
module.exports = {
  sign: username => jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' }),
  verify: token => jwt.verify(token, process.env.JWT_SECRET)
}