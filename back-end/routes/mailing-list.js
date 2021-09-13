const express = require('express');
const router = express.Router();
const addEmail = require('../database/mailing-list').addEmail;
const sendMail = require('../mail');

/* Add email to mailing list. */
router.post('/:email', function(req, res, next) {
  const email = req.params.email;
  addEmail(email)
  .then(() => {
    sendMail(email, `Welcome to Node Busters Mailing List!`, `
Welcome, and thank you for signing up for our mailing list.
We appreciate each and every one of our users, and hope to keep you informed with our service.
Node Buster is currently in development, so the official service will not be available for the next couple months.
There is currently a demo available which we are inviting all to use, if you are interested you can find it at:
https://nodebuster.com/register/demo2021
Now that you are in our mailing list, we will keep you updated with development, as well as with any special events or news.
If you have any questions, don't hesitate to ask us. Have a good day!

Sincerely, the Node Buster team.
    `);
    res.status(201).send(`Email added!`);
  })
  .catch(err => {
    res.status(400).send(`Could not add email`);
  });
});

module.exports = router;
