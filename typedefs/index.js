const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    hello(to: String): String
    allPosts: [Post]
    me: User
    users: [User]
  }

  type Mutation{
    register(user: UserRegisterInput!): String
    login(user: UserLoginInput!): String
  }

  # TYPES
  type User{
    smileyProfile: String
    username: String
    password: String
    posts: [Post] # Computed Field
    postsCount: Int # Computed Field
  }


  type Post{
    id: ID
    content: String
    author: ID
  }

  # INPUT
  input UserRegisterInput{
    smileyProfile: String!
    username: String!
    password: String!
  }
  input UserLoginInput{
    username: String!
    password: String!
  }
`;