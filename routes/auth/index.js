const express = require('express');
const router = express.Router();

// Use routes
router.use('/register', require('./register'));

module.exports = router;