const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Get sent');
})

app.get('/testConnection', (req, res) => {
    res.send('Test connection successful');
})

app.post('/sendPlayerProfile', (req, res) => {
    const {username, score} = req.body;
    console.log(score);
    console.log(username);
    res.send('Received user: ' + username);
})

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})