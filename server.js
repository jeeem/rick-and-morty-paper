var express = require('express');
const fs = require('fs')
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require( `cors` );
const fetch = require('node-fetch')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input UpdateUserInput {
    userobject: String
    currentuser: String
  }
  type Query {
    user (name: String): String
    characters: String
  }
  type Mutation {
    updateuser (input: UpdateUserInput): String
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
      if (users[userName]) {
        return resolve(JSON.stringify(users[userName]))
      }
      return resolve("{}")
    });
  })
}

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    // read JSON object from file
    fs.readFile('./db.json', 'utf-8', (err, data) => {
      if (err) {
          return reject(err);
      }

      // parse JSON object
      const users = JSON.parse(data.toString());
      // print JSON object
      return resolve(users);
    });
  })
}

const writeAllUsers = async (newData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./db.json', JSON.stringify(newData), (err) => {
      if (err) {
          return reject(err);
      }
      return resolve("JSON data is saved.");
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
  characters: async () => {
    const foo = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
    
      headers: {
        "Content-Type": "application/json"
      },
    
      body: JSON.stringify({
        query: `
          query getCharacters {
            characters(page: 1) {
              results {
                id
                name
                image
                species
                gender
                status
                origin {
                  name
                  dimension
                }
                episode {
                  name
                  air_date
                }
              }
            }
          }
        `
      })
    })
    .then(res => res.json())
    .then(data => { 
      return JSON.stringify(data.data); 
    })
    return foo
  },
  updateuser: async (args) => {
    const allUsers = await getAllUsers();
    allUsers[args.input.currentuser] = JSON.parse(args.input.userobject)
    await writeAllUsers(allUsers);
    const updatedUsers = await getAllUsers()
    return true
  }
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