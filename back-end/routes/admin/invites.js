const express = require('express');
const router = express.Router();
const user = require('../../database/users');
const invites = require('../../database/invites');

router.get('/', (req, res) => {
  user.getPublicInfo(req.cookies.session)
  .then(resp => {
    // Check if user is admin
    if (resp[0].username === 'admin') {
      invites.getInvites()
      .then(resp => res.json(resp))
    } else res.sendStatus(400);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

router.post('/', (req, res) => {
  user.getPublicInfo(req.cookies.session)
  .then(resp => {
    // Check if user is admin
    if (resp[0].username === 'admin') {
      invites.addInvite(req.body.key, req.body.maxUses)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400))
    } else res.sendStatus(400);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

module.exports = router;
