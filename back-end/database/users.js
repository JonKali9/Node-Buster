const db = require('./db');
const bcrypt = require('bcrypt');

// Generate random string
const generateSecret = len => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let secret = '';
    while (len > 0) {
        secret += chars.charAt(Math.random() * chars.length);
        len--;
    }
    return secret;
}

// Register User
const register = async ( username, email, password ) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return new Promise((res, rej) => {
        const d = new Date();
        const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        const query = `INSERT INTO users (username, email, password, sessionId, balance, lastPlayed) VALUES (?, ?, ?, ?, 25, ?);`;
        db.query(query, [username, email, hash, generateSecret(18), date], (err, data) => {
            if (err) rej('Could not create Account');
            res('Account Created!');
        })
    })
}

// Login User
const login = async ( username, password ) => {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM users WHERE username = ?;`;
        db.query(query, [username], async (err, data) => {
            if (err) rej('Error');
            if (data[0]) {
                const hashedPassword = data[0].password;
                const validPassword = await bcrypt.compare(password, hashedPassword);
                if (validPassword) res('Logged In!')
                else rej('Invalid Password')
            } else {
                rej('Could not find User');
            }
        })
    })
}

// Get user session Id
const updateSession = username => {
    const session = generateSecret(18);
    return new Promise((res, rej) => {
        const query = `UPDATE users SET sessionId = ? WHERE BINARY username = ?;`;
        db.query(query, [session, username], (err, data) => {
            if (err) rej('Could not update session');
            res(session);
        })
    })
}

// Get User balance
const getBalance = session => {
    return new Promise((res, rej) => {
        const query = `SELECT balance FROM users WHERE BINARY sessionId = ?;`;
        db.query(query, [session], (err, data) => {
            if (err) rej('Could not get balance');
            if (data[0]) res(String(data[0].balance));
            res('0');
        })
    })
}

// Add to User Balance
const addToBalance = async (session, amount) => {
    return new Promise(async (res, rej) => {
        let balance = await getBalance(session);
        balance = Number(balance) + amount;
        const query = `UPDATE users SET balance = ? WHERE BINARY sessionId = ?;`;
        db.query(query, [balance, session], (err, data) => {
            if (err) rej('Could not add to balance');
            res('Updated balance!');
        })
    })
}

// Take from User Balance
const takeFromBalance = async (session, amount) => {
    return new Promise(async (res, rej) => {
        let balance = await getBalance(session);
        balance = Number(balance) - amount;
        const query = `UPDATE users SET balance = ? WHERE BINARY sessionId = ?;`;
        db.query(query, [balance, session], (err, data) => {
            if (err) rej('Could not take from balance');
            res('Updated balance!');
        })
    })
}

// Update last Played
const updateLastPlayed = async (session) => {
    return new Promise(async (res, rej) => {
        const d = new Date();
        const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        const query = `UPDATE users SET lastPlayed = ? WHERE BINARY sessionId = ?;`;
        db.query(query, [date, session], (err, data) => {
            if (err) rej('Could not take from balance');
            res('Updated last Played!');
        })
    })
}



// Get Public User Info
const getPublicInfo = session => {
    return new Promise((res, rej) => {
        const query = `SELECT username FROM users WHERE BINARY sessionId = ?;`;
        db.query(query, [session], (err, data) => {
            if (err) rej('Could not get User');
            res(data);
        })
    })
}


// Get all User info
const getUsers = () => {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM users;`;
        db.query(query, (err, data) => {
            if (err) rej('Error');
            res(data);
        })
    })
}

module.exports = {
    register,
    login,
    updateSession,
    getBalance,
    addToBalance,
    takeFromBalance,
    updateLastPlayed,
    getPublicInfo,
    getUsers
}