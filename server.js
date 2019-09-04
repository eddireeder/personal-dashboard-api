const morgan = require("morgan");
const express = require('express');
const app = express();
const port = 3000;

// Log all requests
app.use(morgan('[:date[clf]] :method :url :status - :response-time ms'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));