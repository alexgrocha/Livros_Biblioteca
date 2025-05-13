const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const livrosRoutes = require('./routes/livrosRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', livrosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
