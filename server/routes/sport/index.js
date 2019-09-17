const express = require('express');
const router = express.Router();
const getFootballData = require('./utils/getFootballData');
const db = require('../../config/db');

router.post('/team', async (req, res, next) => {
  // Check team is provided
  if (!req.body.team) {
    return res.status(400).json({message: "A team is required"});
  }
  // Check team is valid
  let teams = [];
  const footballData = await getFootballData();
  footballData.forEach(match => {
    if (teams.indexOf(match.HomeTeam) === -1) {
      teams.push(match.HomeTeam);
    }
    if (teams.indexOf(match.AwayTeam) === -1) {
      teams.push(match.AwayTeam);
    }
  });
  if (teams.indexOf(req.body.team) === -1) {
    return res.status(400).json({message: "Not a valid team"});
  }
  // Insert team into DB
  try {
    await db.query("UPDATE users SET team=$1 WHERE username=$2", [req.body.team, req.user.username]);
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
});

router.get('/teams', async (req, res) => {
  let teams = [];
  const footballData = await getFootballData();
  footballData.forEach(match => {
    if (teams.indexOf(match.HomeTeam) === -1) {
      teams.push(match.HomeTeam);
    }
    if (teams.indexOf(match.AwayTeam) === -1) {
      teams.push(match.AwayTeam);
    }
  });
  res.json(teams);
});

router.get('/wins', async (req, res, next) => {
  // Get team of the authenticated user
  try {
    let beatenTeams = [];
    const {rows} = await db.query("SELECT team FROM users WHERE username=$1", [req.user.username]);
    const team = rows[0].team;
    const footballData = await getFootballData();
    footballData.forEach(match => {
      if (match.HomeTeam === team && match.FTR === 'H') {
        beatenTeams.push(match.AwayTeam);
      } 
      else if (match.AwayTeam === team && match.FTR === 'A') {
        beatenTeams.push(match.HomeTeam);
      }
    });
    res.json(beatenTeams);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;