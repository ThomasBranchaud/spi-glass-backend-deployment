const {Pool} = require("pg");

const pool = new Pool({
    host: 'database.cs.wpi.edu',
    user: 'sguser',
    password: 'Eu5nafo4eivohd8za',
    database: 'spiglass',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = pool;