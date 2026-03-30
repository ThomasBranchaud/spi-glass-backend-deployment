const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Get sent');
})

app.post('/sendUserInfo', (req, res) => {
    const {username, info} = req.body;
    console.log(info);
    console.log(username);
    res.send('Received user: ' + username);
})

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})