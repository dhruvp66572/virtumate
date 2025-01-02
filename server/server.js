const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./utils/errorHandler");

// Import routes
const auth_Routes = require("./routes/authRoutes");

// initialize app 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(
    "Method-:method Path-:url Status-:status :res[content-length] - :response-time ms"
  )
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.sendStatus(200);
});


// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});
app.use("/api/auth", auth_Routes);

// Error handling
// app.use(errorHandler);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});

module.exports = app;
