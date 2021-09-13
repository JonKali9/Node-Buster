const express = require('express');
const router = express.Router();
const user = require('../database/users');
const invites = require('../database/invites');
const sendMail = require('../mail');

router.post('/', function(req, res) {
  const { username, email, password, invite } = req.body;
  invites.validateInvite(invite)
  .then(resp => {
    if (resp) {
      user.register(username, email, password)
      .then(resp => {
        invites.useInvite(invite)
        .catch(err => console.log(err));
        sendMail(email, `Welcome to Node Buster ${username}!`, `
Hi ${username},
we saw that you joined Node Buster and couldn't be happier!
We're happy to personally welcome you to the site, we are currently in production but the demo is available for you to play! 
$25 has been deposited into your account, and we hope you enjoy our site! 
If you have any questions, don't hesitate to contact us.
We hope you enjoy!

Sincerely, the Node Buster team. :)
        `)
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
