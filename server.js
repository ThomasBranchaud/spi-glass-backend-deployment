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

app.get('/get-user', (req , res) => {
    const username = req.query.username;
    if (!username){
        console.log('Username not inputted correctly');
        return res.send('Username not inputted correctly');
    }

    const fakeDB = {
        Joe:{username: "Joe", score:100, jobs: [{name: "wailing", step:1}, {name: "disturbance", step:1}] },
        Jeff:{username:"Jeff", score:200, jobs:[{name: "disturbance", step:2}, {name: "wailing", step:3}]}
    };

    const player = fakeDB[username];
    if (!player){
        res.send("User not found");
    }
    res.json(player);
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