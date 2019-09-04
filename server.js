const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();

// Read .env file
dotenv.config();

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Log all requests
app.use(morgan('[:date[clf]] :method :url :status - :response-time ms'));

// Initialise passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Set up passport config to define strategies
require('./config/passport');

// Use defined routes
app.use('/', require('./routes'));

// Handle route not found
app.use((req, res, next) => {
  return res.sendStatus(404);
});

// Handle server errors
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({error: "Something broke"})
});

// Start listening
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});