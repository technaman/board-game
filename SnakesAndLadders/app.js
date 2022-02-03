const express = require('express');
const app = express();
const indexRouter = require('./src/api/v1/routes/index');
const gameRouter = require('./src/api/v1/routes/game');
const logger = require('./logger');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Under Development. Please stay tuned !!');
});

app.use('/api/v1', indexRouter);
app.use('/api/v1/game', gameRouter);

app.get('*', (req, res, next) => {
    const message = 'Route not found';
    res.status(404).json({message, data: {}});
});
app.post('*', (req, res, next) => {
    const message = 'Route not found';
    res.status(404).json({message, data: {}});
});

app.use((err, req, res, next) => {
    const message = 'Something went wrong';
    res.status(500).json({
        message, data: {}
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});