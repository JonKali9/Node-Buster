const db = require('./db');

//Add an Email
const addEmail = ( email ) => {
    return new Promise((res, rej) => {
        const query = `INSERT INTO emails VALUES (?)`;
        db.query(query, [email], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    })
}

//Get all Emails
const getEmails = ( email ) => {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM emails;`;
        db.query(query, [email], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    })
}

module.exports = {
    addEmail,
    getEmails
}