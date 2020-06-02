const jwt = require("./jwt");
const db = require("../database");
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  authenticate: (ctx) => {
    const decoded = jwt.verify(ctx.req.headers.authorization);
    ctx.user = db.users.find(({ username }) => username === decoded.username);
    if (!decoded.username) throw new AuthenticationError("User must be autheticated first");
  }
}