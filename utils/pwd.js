const bcrypt = require("bcryptjs");

module.exports = {
  hash: (password) => bcrypt.hash(password, 12),
  verify: (password, hash) => bcrypt.compare(password, hash)
}