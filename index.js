const express = require('express');
const redis = require('redis');

const host = process.env.REDIS_HOST || '127.0.0.1';
const client = redis.createClient({ host });
const key = 'counter';
client.set(key, 0);

const app = express();
app.get('/health', (req, res) =>
  res.send(JSON.stringify({ status: 'UP' }))
);
app.get('/', (req, res) => {
  client.get(key, (err, reply) => {
    if (err) {
      res.send(JSON.stringify({
        error: err,
      }));
      return;
    }
    res.send(JSON.stringify({
      counter: reply,
    }));
    client.set(key, parseInt(reply) + 1);
  });
});

const port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log(`app is listening port ${port}...`);
});
