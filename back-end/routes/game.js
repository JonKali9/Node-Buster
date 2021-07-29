// Imports
const express = require('express');
const router = express.Router();


// Initial Variables
let status = 'playing';
let multiplier = (1).toFixed(2);
let bustAt = Math.random() * 5+1;
bustAt = bustAt.toFixed(2);
let newGameIn = 0;


setInterval(() => {
    if (status === 'playing') {
        multiplier = (multiplier*1.0005);
        if (multiplier >= bustAt) {
            status = 'crashed';
            newGameIn = 300;
        };
    } else if (status === 'crashed') {
        newGameIn -= 1;
        if (newGameIn < 0) {
            status = 'waiting';
            newGameIn = 1000;
        }
    } else if (status === 'waiting') {
        if (newGameIn > 0) {
            newGameIn -= 1;
        } else {
            status = 'playing';
            multiplier = (1).toFixed(2);
            bustAt = Math.random() * 5+1;
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
                info: (multiplier).toFixed(2)
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

// Route to place a bet
router.get('/place-bet', (req, res) => {
    res.send('test');
});


module.exports = router;