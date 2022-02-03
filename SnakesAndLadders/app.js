const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Under Development. Please stay tuned !!');
});

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
});