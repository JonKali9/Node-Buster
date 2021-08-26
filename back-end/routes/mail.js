const { text } = require('express');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const db = require('../database/mailing-list');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    },
    secure: true
})

/* Contact Form. */
router.post('/', function(req, res, next) {
    const {title, content} = req.body;
    db.getEmails()
    .then(resp => {
        resp.map(email => {
            const mailData = {
                from: 'nodebuster@gmail.com',
                to: email.email,
                subject: title,
                text: content
            };
            transporter.sendMail(mailData, (err, info) => {
                if (err) console.log(err);
            })
        })
        res.sendStatus(200);
    })
});

module.exports = router;
