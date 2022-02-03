const express = require('express');
const app = express();
const indexRouter = require('./src/api/routes/index');

app.get('/', (req, res) => {
    res.send('Under Development. Please stay tuned !!');
});

app.use('/api/v1', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});