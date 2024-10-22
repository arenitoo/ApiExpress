const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Bem-vindo à API Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});