const express = require('express');
const router = require('./routes/routes');

const app = express();
app.use(express.json({ extended: true }));
app.use('/api', router);

app.use((error, req, res, next) => {
  res.status(error.status).json({ error: { code: error.code, message: error.message } });
});

module.exports = app;
