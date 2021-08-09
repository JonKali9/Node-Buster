const express = require('express');
const router = express.Router();
const user = require('../database/users');

router.get('/', function(req, res) {
  const session = req.cookies.session;
  user.getPublicInfo(session)
  .then(data => {
    if (data[0]) res.json(data[0])
    else res.status(400).send('Could not find Account')
  })
  .catch(err => res.status(400).send('Could not find Account'))
});

module.exports = router;
