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
        Joe:{username: "Joe", level:5, xp:1500, completedJobs: 5, failedJobs:1, capturedWraiths:2, capturedSpirits:2, capturedDemons:1, currentJobs: [{id:1, step:1}, {id:2, step:1}] },
        Jeff:{username:"Jeff", score:7, xp:2500, completedJobs:17, failedJobs:3, capturedWraiths:7, capturedSpirits: 7, capturedDemons:3, jobs:[{id:1, step:2}, {id:0, step:3}]}
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