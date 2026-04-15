const express = require('express');
const pool = require('./databaseConnection');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Get sent');
})

app.get('/testConnection', (req, res) => {
    res.send('Test connection successful');
})

app.get('/get-user', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        console.log('Username not inputted correctly');
        return res.send('Username not inputted correctly');
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const player = result.rows[0];
        console.log(player);
        if (!player) {
            res.send("User not found");
        }
        res.json(player);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
})

app.get('/get-fake-user', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        console.log('Username not inputted correctly');
        return res.send('Username not inputted correctly');
    }
    const jobs = [
        {id: 1, currentStep: 2},
        {id: 2, currentStep: 3},
    ]
    const fakeDB = {
        TESTUSER: {level: 7, xp: 2500, completedJobs: 10, failedJobs: 4, capturedWraiths: 3, capturedSpirits: 3, capturedDemons: 4, currentJobs: jobs}
    };
    const player = fakeDB;
    if (!player) {
        res.send("User not found");
    }
    res.json(player);
})

app.post('/sendPlayerProfile', async (req, res) => {
    const { username, level, xp, completedJobs, failedJobs, capturedWraiths, capturedSpirits, capturedDemons, currentJobs} = req.body;
    console.log(username + " : " + level + " : " + xp + " : " + completedJobs + " : " + failedJobs + " : " + capturedWraiths + " : " + capturedSpirits + " : " + capturedDemons);
    console.log(currentJobs[0].id);
    res.send('Received user: ' + username);
    try {
        const result = await pool.query(
            'INSERT INTO users' +
            ' (username, level, xp, completedJobs, failedJobs, capturedWraiths, capturedSpirits, capturedDemons, currentJobs) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)' +
            ' ON CONFLICT (username)' +
            ' DO UPDATE SET ' +
            ' level = EXCLUDED.level,' +
            ' xp = EXCLUDED.xp,' +
            ' completedJobs = EXCLUDED.completedJobs,' +
            ' failedJobs = EXCLUDED.failedJobs,' +
            ' capturedWraiths = EXCLUDED.capturedWraiths,' +
            ' capturedSpirits = EXCLUDED.capturedSpirits,' +
            ' capturedDemons = EXCLUDED.capturedDemons, ' +
            ' currentJobs = EXCLUDED.currentJobs',
            [username, level, xp, completedJobs, failedJobs, capturedWraiths, capturedSpirits, capturedDemons, JSON.stringify(currentJobs)]
        );
        res.json({
            success: true,
            user: result.rows[0],
        });
    } catch (err) {
        console.error(err);
        res.stats(500).json({
            success: false,
            error: err.message,
        });
    }
})

app.get('/test-db-connection', async (req, res) => {
    const currentJobs = [
        {id: 6, currentStep: 2},
        {id: 2, currentStep: 3},
    ]
    try {
        const result = await pool.query(
            'INSERT INTO users' +
            ' (username, level, xp, completedJobs, failedJobs, capturedWraiths, capturedSpirits, capturedDemons, currentJobs) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)' +
            ' ON CONFLICT (username)' +
            ' DO UPDATE SET ' +
            ' level = EXCLUDED.level,' +
            ' xp = EXCLUDED.xp,' +
            ' completedJobs = EXCLUDED.completedJobs,' +
            ' failedJobs = EXCLUDED.failedJobs,' +
            ' capturedWraiths = EXCLUDED.capturedWraiths,' +
            ' capturedSpirits = EXCLUDED.capturedSpirits,' +
            ' capturedDemons = EXCLUDED.capturedDemons, ' +
            ' currentJobs = EXCLUDED.currentJobs',
                ["TESTUSER", 5, 1500, 10, 20, 1000, 1000, 1000, JSON.stringify(currentJobs)]
        );
        res.json({
            success: true,
            user: result.rows[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }

});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})