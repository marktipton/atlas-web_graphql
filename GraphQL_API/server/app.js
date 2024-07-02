const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
// const mongoose = require('mongoose');

// const uri = "mongodb+srv://marktipton:gr1VKmT7hhRjCb3c@cluster0.r1vmbht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connection.once('open', () => {
//   console.log('connected to database');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Error connecting to the database:', err);
// });

app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});
