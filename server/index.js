const env = require('dotenv');
const app = require('./server.js');
const functions = require('firebase-functions');

env.config();

const port = process.env.PORT || 4000;

  exports.api = functions.https.onRequest(app);  

  app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
    console.log(`http://localhost:${port}`);
  });
