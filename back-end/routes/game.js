// Imports
const express = require('express');
const router = express.Router();
const users = require('../database/users');
const games = require('../database/games');

// Get bust Value
const getBust = () => {
    return Math.random() * 2+1;
}

// Initial Variables
let status = 'playing';
let multiplier = (1).toFixed(2);
let bustAt = getBust();
bustAt = bustAt.toFixed(2);
let newGameIn = 0;
let players = [];

// Update balances
const updateBalances = () => {
    for (i=0; i<players.length; i++) {
        players.splice(i, 1);
    }
}

// Place game data into Database
const gameStats = () => {
    // Grab all game Data
    let totalBets = 0;
    let totalEarned = 0;
    let gameProfit = totalBets;
    players.map(player => {
        totalBets += Number(player.bet);
        if (player.status === 'cashed out') {
            totalEarned += (player.bet * player.cashedOutAt) - player.bet;
            gameProfit -= (player.bet * player.cashedOutAt) - player.bet;
        } else {
            gameProfit += player.bet;
        }
    })
    const gameData = {
        bustAt,
        participated: players.length,
        totalBets,
        totalEarned,
        gameProfit
    }
    // Place data into database
    // games.addGame(gameData);
}

// Runs the Game
setInterval(() => {
    // Game is in progress
    if (status === 'playing') {
        // Updates the Multiplier
        multiplier = (multiplier*1.0005);
        // Checks if game has crashed
        if (multiplier >= bustAt) {
            // Finishes the current Game
            gameStats();
            status = 'crashed';
            updateBalances();
            newGameIn = 300;
        };
    // Game has crashed
    } else if (status === 'crashed') {
        // Timer for Crash Screen
        newGameIn -= 1;
        if (newGameIn < 0) {
            status = 'waiting';
            newGameIn = 1500;
        }
    // Waiting for New Game
    } else if (status === 'waiting') {
        // Checks whether to start new Game yet
        if (newGameIn > 0) {
            newGameIn -= 1;
        } else {
            // Starts new Game
            status = 'playing';
            multiplier = (1).toFixed(2);
            bustAt = getBust();
            bustAt = bustAt.toFixed(2);
        }
    }
}, 10);

// Route to get game status
router.get('/status', (req, res) => {
    switch (status) {
        case 'waiting':
            res.json({
                status: 'waiting',
                info: Math.round(newGameIn/100)
            })
            break;
        case 'playing':
            res.json({
                status: 'playing',
                info: multiplier
            })
            break;
        case 'crashed':
            res.json({
                status: 'crashed',
                info: bustAt
            })
            break;
    }
});

// Route to place bet
router.post('/place-bet/:bet', (req, res) => {
    if (status === 'waiting') {
        const user = req.cookies.session;
        const userBalance = users.getBalance(user);
        if (userBalance >= req.params.bet) {
            users.takeFromBalance(user, req.params.bet);
            users.updateLastPlayed(user);
            players.push({
                user,
                bet: req.params.bet,
                status: 'betting'
            })
            res.send('Bet placed');
        } else {
            res.status(400).send('Could not place bet');
        }
    } else {
        res.status(400).send('Could not place bet');
    }
});

// Route to cancel bet
router.post('/cancel-bet', (req, res) => {
    if (status === 'waiting') {
        const user = req.cookies.session;
        const player = players.filter(player => player.user === user)[0];
        users.addToBalance(user, Number(player.bet));
        players = players.filter(player => player.user !== user);
        res.send('Bet cancelled');
    } else {
        res.status(400).send('Could not cancel bet');
    }
});

// Route to Cash Out
router.post('/cash-out', (req, res) => {
    if (status === 'playing') {
        const user = req.cookies.session;
        const player = players.filter(player => player.user === user)[0];
        users.addToBalance(user, Number(player.bet*multiplier));
        players = players.map(player => {
            if (player.user === user) {
                player.status = 'cashed out';
                player.cashedOutAt = multiplier;
            };
            return player;
        })
        res.send('Cash out');
    } else {
        res.status(400).send('Could not cash out');
    }
});

// Route to get user balance
router.get('/balance', async (req, res) => {
    const user = req.cookies.session;
    const balance = await users.getBalance(user);
    res.send(balance);
});


module.exports = router;