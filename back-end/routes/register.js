const express = require('express');
const router = express.Router();
const user = require('../database/users');

router.post('/', function(req, res) {
  const { username, email, password, invite } = req.body;
  if (invite === 'penis') {
    user.register(username, email, password)
    .then(resp => res.status(201).send(resp))
    .catch(err => res.status(401).send(err));
  } else {
    res.status(401).send('Invalid Invite Key!')
  }
});

module.exports = router;
