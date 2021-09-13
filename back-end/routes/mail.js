const express = require('express');
const router = express.Router();
const db = require('../database/mailing-list');
const sendMail = require('../mail');


/* Contact Form. */
router.post('/', function(req, res, next) {
    const {title, content} = req.body;
    db.getEmails()
    .then(resp => {
        resp.map(email => {
            sendMail(email.email, title, content);
        })
        res.sendStatus(200);
    })
});

module.exports = router;
