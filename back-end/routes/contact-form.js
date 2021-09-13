const express = require('express');
const router = express.Router();
const sendMail = require('../mail');

/* Contact Form. */
router.post('/', function(req, res, next) {
    const content = req.body.content;
    const user = req.body.user ? req.body.user : 'Anonymous';
    sendMail('nodebuster@gmail.com', `Message from ${user}`, content);
    res.send('Form uploaded!');
});

module.exports = router;
