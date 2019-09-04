const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Log all requests
app.use(morgan('[:date[clf]] :method :url :status - :response-time ms'));

app.get('/', (req, res) => res.send('Hello World!'));

// Handle route not found
app.use((req, res, next) => {
  return res.sendStatus(404);
});

// Handle server errors
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({error: "Something broke"})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));