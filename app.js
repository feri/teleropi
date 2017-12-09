/**
 * Teleropi - Telegram bot for Raspberry Pi
 *
 * Author: ferenc.szekely@gmail.com
 * License: MIT
 *
 * Copyright (c) 2017 Ferenc Székely
 */
'use strict';

const Slimbot = require('slimbot');
const config = require('./config/teleropi.config');
const sherlock = require('./include/sherlock.js');

// debug function
let debug = require('debug')(config.name + '_Slimbot');

// the bot
const slimbot = new Slimbot(config.TelegramToken);
debug('%o', slimbot);

/**
 * 'message' event handler
 */
slimbot.on('message', message => {
  let optionalParams = {};
  let reply = 'Please type help for valid commands';

  debug('Telegram Message: %o', message);

  if (message.text) {
    switch (message.text.toLowerCase()) {
      case '/help':
      case 'help':
      case 'menu':
        reply = 'Click on the commands below';
        // define inline keyboard for the user
        // this is the primary user interafce for the bot
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
      case 'hello':
        reply = 'Hello!';
        slimbot.sendMessage(message.chat.id, reply);
        break;
      case '/ip':
      case 'ip':
        reply = sherlock.reportIPs();
        break;
      case '/lastpic':
      case 'lastpic':
        reply = 'http://urho.eu/rpi/last.jpg';
        slimbot.sendMessage(message.chat.id, reply, optionalParams);
        break;
    }
  }
});

/**
 * 'callback_query' event handler
 */
slimbot.on('callback_query', query => {
  let reply = '';

  debug('Telegram Query: %o', query);

  switch (query.data) {
    case 'hello':
      reply = 'Hello!';
      break;
    case 'ip':
      reply = sherlock.reportIPs();
      break;
    case 'lastpic':
      reply = 'http://urho.eu/rpi/last.jpg';
      break;
    default:
      reply = 'n/a';
  }

  slimbot.sendMessage(query.message.chat.id, reply);
});

// Start the bot
slimbot.startPolling();
