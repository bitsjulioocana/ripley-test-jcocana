const express = require('express');
const client = require('./services/redis-client');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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
