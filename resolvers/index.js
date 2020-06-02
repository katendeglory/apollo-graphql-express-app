const jwt = require("../utils/jwt");
const pwd = require("../utils/pwd");
const auth = require("../utils/auth");
const db = require("../database");
const { AuthenticationError, ApolloError } = require('apollo-server-express');

module.exports = {
  Query: {
    hello: (_, args, ctx) => {
      return `Hello world! ${args.to}`;
    },
    users: (_, __, ctx) => {
      return db.users;
    },
    allPosts: (_, __, ctx) => {
      auth.authenticate(ctx);
      return db.posts;
    },
    me: (_, __, ctx) => {
      auth.authenticate(ctx);
      return ctx.user;
    },
  },

  Mutation: {
    register: async (_, args, ctx) => {
      const { username } = args.user;

      const foundUser = db.users.find(user => user.username === username);
      if (foundUser) throw new AuthenticationError("user already exists");

      const newUser = { ...args.user, password: await pwd.hash(args.user.password) };
      db.users.push(newUser);

      return jwt.sign(args.user.username);
    },
    login: async (_, args, ctx) => {
      const { username, password } = args.user;
      const foundUser = db.users.find(user => user.username === username);

      if (!foundUser) throw new AuthenticationError("user doesn't exist");
      const passwordCorrect = await pwd.verify(password, foundUser.password);

      if (!passwordCorrect) throw new AuthenticationError("password incorrect");

      return jwt.sign(username);
    }
  },

  User: {
    posts: (parent, args, ctx) => db.posts.filter(post => post.author === parent.username),
    postsCount: (parent, args, ctx) => db.posts.filter(post => post.author === parent.username).length
  }
};