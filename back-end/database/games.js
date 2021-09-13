const db = require('./db');

//Add a Game
const addGame = ( gameData ) => {
    return new Promise((res, rej) => {
        const query = `INSERT INTO games (bustedAt, totalBets, players, playerProfit, gameProfit) VALUES (?, ?, ?, ?, ?);`;
        db.query(query, [gameData.bustAt, gameData.totalBets, gameData.participated, gameData.totalEarned, gameData.gameProfit], (err, data) => {
            if (err) rej(err);
            res(data);
        });
    })
}

//Get Games
const getGames = ( gameData ) => {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM games ORDER BY id DESC LIMIT 100;`;
        db.query(query, (err, data) => {
            if (err) rej(err);
            res(data);
        });
    })
}

module.exports = {
    addGame,
    getGames
}