
const env = require('dotenv');
const app = require('./server.js');
const { connect } = require('./config/DB_Connect');

env.config();

const port = process.env.PORT || 4000;

connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
    console.log(`http://localhost:${port}`);
  });
});   