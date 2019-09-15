const express = require('express');
const router = express.Router();
const RSSParser = require('rss-parser');
const parser = new RSSParser();

const isAuthenticated = require('../../middlewares/isAuthenticated');

// Define routes
router.get('/latest', isAuthenticated, async (req, res) => {
  const feed = await parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml');
  res.json(feed.items[0]);
});

module.exports = router;