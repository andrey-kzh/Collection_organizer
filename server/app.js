const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const { localStorage } = require('./libs/asyncLocalStorage');

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));

app.use((req, res, next) => {
  localStorage.enterWith(new Map());
  return next();
});

app.use('/api', router);

app.use((error, req, res, next) => {
  res.status(error.status).json({ error: { code: error.code, message: error.message } });
});

module.exports = app;
