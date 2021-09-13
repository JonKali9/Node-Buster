const { text } = require('express');
const express = require('express');
const nodemailer = require('nodemailer');
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

const sendMail = (to, subject, text) => {
    const mailData = {
        from: 'Node Buster',
        to,
        subject,
        text
    }
    transporter.sendMail(mailData, (err, info) => {
        
    })
}

module.exports = sendMail;
