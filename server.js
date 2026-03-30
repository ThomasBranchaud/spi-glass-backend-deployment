const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Get sent');
})

app.post('/', (req, res) => {
    res.send('Post sent');
})

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})