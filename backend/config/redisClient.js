const Redis = require('ioredis');

const redis = new Redis();

redis.on('error', (err) => {
    console.error('Erro de conexão com o Redis:', err);
});

redis.on('connect', () => {
    console.log('Conectado ao Redis com sucesso!');
});

module.exports = redis;
