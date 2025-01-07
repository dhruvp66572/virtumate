const app = require("./server.js");
const { connect } = require("./config/connect.js");
const env = require("dotenv");

env.config();

const port = process.env.PORT || 4000;

connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log(`Server is running on PORT:${port}`);
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
