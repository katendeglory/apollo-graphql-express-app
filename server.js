require("dotenv").config();
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

app.get('/', (req, res) => res.send("Welcome to my awesome site 😀"));

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) });

server.applyMiddleware({ app, path: "/graphql" });

const port = process.env.PORT || 5000
app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));