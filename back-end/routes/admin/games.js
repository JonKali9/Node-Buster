const express = require('express');
const router = express.Router();
const user = require('../../database/users');
const games = require('../../database/games');

router.get('/', (req, res) => {
  user.getPublicInfo(req.cookies.session)
  .then(resp => {
    // Check if user is admin
    if (resp[0].username === 'admin') {
      games.getGames()
      .then(gamesResp => {
        res.send(gamesResp);
      })
    } else res.sendStatus(400);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

module.exports = router;
