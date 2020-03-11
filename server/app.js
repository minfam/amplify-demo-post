const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema.js');

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}));

app.listen(4000, () => {
    console.log('Listening for requests on my awesome port 4000');
});