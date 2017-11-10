/**
 * Teleropi web app
 *
 * Author: ferenc.szekely@gmail.com
 * License: MIT
 *
 * Copyright (c) 2017 Ferenc Székely
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Slimbot = require('slimbot');
const netif = require('netinterfaces');
// config file(s)
const teleropi = require('./config/teleropi.config');

// debug stuff
var debug = require('debug')(teleropi.name);
var slimbot_debug = require('debug')(teleropi.name + '_Slimbot');

// list all interfaces
function reportIps(messageId = null) {
  var reply = 'Available interfaces:';
  var map = netif.list();
  if (messageId && map) {
    slimbot.sendMessage(messageId, reply + "\r\n" + JSON.stringify(map), {});
  }
}

// start
var index = require('./routes/index');
const slimbot = new Slimbot(teleropi.TelegramToken);
slimbot_debug('%o', slimbot);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Slimbot - Register listeners
slimbot.on('message', message => {
  let optionalParams = {};
  let reply = 'Please type help for valid commands';

  slimbot_debug('Telegram Message: %o', message);

  if (message.text) {
    switch (message.text.toLowerCase()) {
      case '/help':
      case 'help':
      case 'menu':
        reply = 'Click on the commands below';
        // define inline keyboard to send to user
        optionalParams = {
          parse_mode: 'Markdown',
          reply_markup: JSON.stringify({
            inline_keyboard: [[
              { text: 'Hello', callback_data: 'hello' }
            ],[
              { text: 'All IP Interfaces', callback_data: 'ip' },
            ],[
              { text: 'Last Picture', callback_data: 'lastpic' },
            ]]
          })
        };
        slimbot.sendMessage(message.chat.id, reply, optionalParams);
        break;
      case '/ip':
      case 'ip':
        reportIps(message.chat.id);
        break;
      case '/lastpic':
      case 'lastpic':
        reply = 'Here comes the last picture: ';
        slimbot.sendMessage(message.chat.id, reply, optionalParams);
        break;
    }
  }
});

slimbot.on('callback_query', query => {
  let reply = '';

  slimbot_debug('Telegram Query: %o', query);

  switch (query.data) {
    case 'hello':
      reply = 'Hello!';
      slimbot.sendMessage(query.message.chat.id, reply);
      break;
    case 'ip':
      reportIps(query.message.chat.id);
      break;
    case 'lastpic':
      reply = 'Here comes the last picture: ';
      slimbot.sendMessage(query.message.chat.id, reply);
      break;
    default:
      reply = 'n/a';
      slimbot.sendMessage(query.message.chat.id, reply);
  }
});

// Slimbot - Call API
slimbot.startPolling();

module.exports = app;
