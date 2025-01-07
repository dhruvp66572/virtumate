const express = require('express');
const cors = require('cors');
const user_api = require('./routes/user_api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});

app.use("/api/auth/", user_api);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});

module.exports = app;