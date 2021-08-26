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

router.get('/isAdmin', (req, res) => {
  user.getPublicInfo(req.cookies.session)
  .then(resp => {
    if (resp[0].username === 'admin') res.sendStatus(200)
    else res.sendStatus(400);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

module.exports = router;
