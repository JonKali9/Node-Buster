const express = require('express');
const router = express.Router();
const addEmail = require('../database/mailing-list').addEmail;

/* Add email to mailing list. */
router.post('/:email', function(req, res, next) {
  addEmail(req.params.email)
  .then(() => {
    res.status(201).send(`Email added!`);
  })
  .catch(err => {
    res.status(400).send(`Could not add email`);
  });
});

module.exports = router;
