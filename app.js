const express = require('express');
const client = require('./services/redis-client');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/countries', (req, res) => {
    client.get('countries', (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.get('/errors', (req, res) => {
    client.hgetall('api.errors', (err, data) => {
        res.json(data);
    });
});

module.exports = app;
