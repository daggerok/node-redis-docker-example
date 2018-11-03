/**
 * Redis part
 */
const redis = require('redis');
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || '6379';
const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});
//
const key = 'counter';
client.set(key, '0');

/**
 * Express part
 */
const express = require('express');
const app = express();
//
app.get('/health', (req, res) =>
  res.send(JSON.stringify({ status: 'UP' }))
);
app.get('/health/**', (req, res) => res.redirect('/health'));
//
app.get('/**', (req, res) => {
  client.get(key, (err, reply) => {
    if (err) {
      return res.send(JSON.stringify({
        error: err,
      }));
    }
    res.send(JSON.stringify({
      counter: reply,
    }));
    client.set(key, parseInt(reply) + 1);
  });
});
app.get('/**', (req, res) => res.redirect('/'));
//
const httpPort = process.env.HTTP_PORT || process.env.PORT || '3000';
app.listen(httpPort, () => {
  console.log(`app is listening port ${httpPort}...`);
});
