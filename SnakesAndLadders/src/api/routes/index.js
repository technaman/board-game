const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Under Development. Please stay tuned !!');
});

router.post('/login', (req, res) => {
    res.send('Login successful');
});

router.post('/signup', (req, res) => {
    res.send('Signup successful');
});

router.get('/initGame', (req, res) => {
    res.send('Game initialized');
});

router.post('/startGame', (req, res) => {
    res.send('Game started');
});

module.exports = router;
