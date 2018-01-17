// const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// // Connect to our Database and handle an bad connections
// mongoose.connect('mongodb://2011mckinsey:crazyv@ds127506.mlab.com:27506/my-app');
// //mongoose.connect('mongodb://2011mckinsey:crazyv@ds127506.mlab.com:27506/my-app', { useMongoClient: true })
// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// mongoose.connection.on('error', (err) => {
//   console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });


// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});