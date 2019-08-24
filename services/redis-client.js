const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
    console.log("Redis database connected!!!");
    client.set('countries', JSON.stringify([
        {
            city: 'Santiago',
            latitude: "-33.448891",
            longitude: "-70.669266"
        },
        {
            city: 'Zurich',
            latitude: "47.376888",
            longitude: "8.541694"
        },
        {
            city: 'Auckland',
            latitude: "-36.848461",
            longitude: "174.763336"
        },
        {
            city: 'Sydney',
            latitude: "-33.868820",
            longitude: "151.209290"
        },
        {
            city: 'London',
            latitude: "51.507351",
            longitude: "-0.127758"
        },
        {
            city: 'Georgia',
            latitude: "32.165623",
            longitude: "-82.900078"
        },
    ]));
});

client.on('error', (err) => {
    console.log('Redis error: ' + err)
});

module.exports = client;