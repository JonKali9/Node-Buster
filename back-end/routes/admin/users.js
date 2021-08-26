const express = require('express');
const router = express.Router();
const user = require('../../database/users');

router.get('/', (req, res) => {
  user.getPublicInfo(req.cookies.session)
  .then(resp => {
    // Check if user is admin
    if (resp[0].username === 'admin') {
      user.getUsers()
      .then(users => res.json(users))
      .catch(err => res.sendStatus(400));
    } else res.sendStatus(400);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

module.exports = router;
