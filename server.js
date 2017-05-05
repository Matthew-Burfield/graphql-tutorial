const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    ip: String
  }
`)

function loggingMiddleware(req, res, next) {
  console.log('ip:', req.id);
  next();
}

// The root provides a resolver function for each API endpoint
const root = {
  ip: (args, request) => {
    return request.ip
  }
}

const app = express()
app.use(loggingMiddleware)
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000, () => console.log('Running a GraphQL server at localhost:4000/graphql'))

