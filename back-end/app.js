// imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit  = require('express-rate-limit');

// routes
const mailinglist = require('./routes/mailing-list');
const contactform = require('./routes/contact-form');
const game = require('./routes/game');
const register = require('./routes/register');
const login = require('./routes/login');
const user = require('./routes/user');
const mail = require('./routes/admin/mail');
const users = require('./routes/admin/users');
const invites = require('./routes/admin/invites')
const games = require('./routes/admin/games');

// initial variables
const app = express();
const PORT = 3001;
const spamPrevention = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many requests, try again later.' 
});

// view engine setup
app.use(/^(?!.*(status|balance)).*$/, logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());

// setup routers
app.use('/api', game)
app.use('/api/mailing-list', spamPrevention, mailinglist);
app.use('/api/contact-form', contactform);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/user', user);
// admin routers
app.use('/api/users', users);
app.use('/api/invites', invites);
app.use('/api/mail', mail);
app.use('/api/games', games);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

// run server
app.listen(PORT, (err) => {
  console.clear();
  if (err) throw err;
  console.log(`[+] Server listening on port ${PORT}.`)
});

module.exports = app;
