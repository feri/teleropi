TeleRopi
===
Experiments with Telegram API and Raspberry Pi.

Installation
===

1. clone the repo
2. run 'nmp install'

Configuration
===
Edit ''config/teleropi.config'' according to your installation.

Create a Telegram bot and add the API Token to 'TelegramToken'.

Start
===

$ bin/www

or using debugging:

$ DEBUG=* bin/www

Debug flags
===
*               : Enable all debugging
Slimbot_TeleRopi: Slimbot related debug messages only
