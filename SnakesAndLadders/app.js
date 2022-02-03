const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Under Development. Please stay tuned !!');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on PORT ${PORT}`);
});