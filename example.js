const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello(to: String!): String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (_, args, ctx) => {
      console.log(ctx.req.headers.authorization);
      return `Hello world! ${args.to}`;
    },
  },
};

app.get('/', (req, res) => res.send("Welcome to my awesome site 😀"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ({ req: ctx.req, res: ctx.res })
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);