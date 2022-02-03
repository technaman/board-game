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

module.exports = router;