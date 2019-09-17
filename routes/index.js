const express = require("express");
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');

// Use routes
router.use('/auth', require('./auth'));
router.use('/news', isAuthenticated, require('./news'));
router.use('/sport', isAuthenticated, require('./sport'));

module.exports = router;