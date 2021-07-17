const db = require('./db');

//Add a Post
const addEmail = ( email ) => {
    return new Promise((res, rej) => {
        const query = `INSERT INTO emails VALUES (?)`;
        db.query(query, [email], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    })
}

module.exports = {
    addEmail
}