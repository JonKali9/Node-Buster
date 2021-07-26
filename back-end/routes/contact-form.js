const { text } = require('express');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
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
    const content = req.body.content;
    const user = req.body.user ? req.body.user : 'Anonymous';
    const mailData = {
        from: process.env.GMAIL_EMAIL,
        to: 'nodebuster@gmail.com',
        subject: `Message from ${user}`,
        text: content,
    }
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            console.log(error);
            res.status(400).send('Error uploading Form!');
        } else {
            res.send('Form uploaded!');
        }
    })
});

module.exports = router;
