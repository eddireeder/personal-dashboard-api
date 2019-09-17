const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Read .env file
dotenv.config();

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Log all requests
app.use(morgan('[:date[clf]] :method :url :status - :response-time ms'));

// Initialise express session
app.use(session({
  secret: "thisisverysecretandiwouldntdothisinproduction",
  resave: false,
  saveUninitialized: true,
}))

// Initialise passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Set up passport config to define strategies
require('./config/passport');

// Serve the static files from the React app (production)
if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Use defined routes
app.use('/', require('./routes'));

// Handles any requests that don't match the ones above
if (process.env.NODE_ENV !== "development") {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}

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
const port = (process.env.NODE_ENV === "development") ? process.env.SERVER_DEV_PORT : 80;
app.listen(port, () => {
  console.log("Server running on port " + port);
});