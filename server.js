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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));