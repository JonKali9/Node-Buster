const express = require('express');
const router = express.Router();
const user = require('../database/users');

router.post('/', async function(req, res) {
  const {username, password} = req.body;
  const session = await user.updateSession(username);
  user.login(username, password)
  .then(resp => res.cookie('session', session).send(resp))
  .catch(err => res.status(401).send(err));
});

module.exports = router;
