const express = require('express');
const router = express.Router();
const user = require('../database/users');
const invites = require('../database/invites');

router.post('/', function(req, res) {
  const { username, email, password, invite } = req.body;
  invites.validateInvite(invite)
  .then(resp => {
    if (resp) {
      user.register(username, email, password)
      .then(resp => {
        invites.useInvite(invite)
        .catch(err => console.log(err));
        res.status(201).send(resp);
      })
      .catch(err => res.status(401).send(err));
    } else {
      res.status(401).send('Invalid Invite Key!')
    }
  })
  .catch(err => {
    res.status(401).send(err)
  })
});

module.exports = router;
