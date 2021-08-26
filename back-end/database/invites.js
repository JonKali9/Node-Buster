const db = require('./db');

// Get all Invites
const getInvites = ( ) => {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM invites;`;
        db.query(query, (err, data) => {
            if (err) rej(err);
            res(data);
        });
    })
}

// Add an Invite
const addInvite = ( key, maxUses ) => {
    return new Promise((res, rej) => {
        const query = `INSERT INTO invites VALUES (?, 0, ?)`;
        db.query(query, [key, maxUses], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    })
}

// Validate an Invite
const validateInvite = key => {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM invites;`;
        db.query(query, [key], (err, data) => {
            if (err) rej(err);
            if (data) {
                let validInvite = null;
                data.map(row => {if (row.invite === key) validInvite = row})
                if (validInvite) {
                    if (validInvite.uses < validInvite.maxUses) res('Valid Invite')
                    else rej('Invite expired!')
                } else {
                    rej('Invalid Invite!')
                }
            } else rej('Error!')
        })
    })
}

// Add to Invite
const useInvite = key => {
    return new Promise((res, rej) => {
        const query = `UPDATE invites SET uses = uses + 1 WHERE invite = ?;`;
        db.query(query, key, (err, data) => {
            if (err) rej(err);
            res('Database updated!')
        })
    })
}

module.exports = {
    getInvites,
    addInvite,
    validateInvite,
    useInvite
}