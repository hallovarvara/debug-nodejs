const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const sessionValidator = require('./middleware/validate-session');

const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

const APP_PORT = 4000;
const app = express();

db.sync();

app.use(bodyParser.json());
app.use('/api/auth', user);
app.use(sessionValidator);
app.use('/api/game', game);

app.listen(APP_PORT, function () {
  process.stdout.write(`App is listening on ${APP_PORT}`);
});
