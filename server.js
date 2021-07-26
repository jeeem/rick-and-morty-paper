var express = require('express');
const fs = require('fs')
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require( `cors` );

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    user (name: String): String
  }
`);

const getUser = async (userName) => {
  return new Promise((resolve, reject) => {
    // read JSON object from file
    fs.readFile('./db.json', 'utf-8', (err, data) => {
      if (err) {
          reject(err);
      }

      // parse JSON object
      const users = JSON.parse(data.toString());
      // print JSON object
      console.log('got users from json file', users);
      if (users[userName]) {
        console.log('user exists in fake db', users[userName])
        return resolve(JSON.stringify(users[userName]))
      }
      return resolve("{}")
    });
  })
}

 
// The root provides a resolver function for each API endpoint
var root = {
  user: async (args) => {
    if (!args || !args.name || !args.name.length) {
      return null
    }
    return await getUser(args.name)
    // return JSON.stringify({ "Rick Sanchez": true });
  },
};
 
var app = express();
app.use( cors() );
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');