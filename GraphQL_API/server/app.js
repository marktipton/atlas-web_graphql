const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
const uri = "mongodb+srv://marktipton:pleasework@cluster0.r1vmbht.mongodb.net/";
const PORT = 4000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// mongoose.connection.on('error', (err) => {
//   console.error('Error connecting to the database:', err);
// });

app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(PORT,()=>{
  console.log(`now listening for request on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
