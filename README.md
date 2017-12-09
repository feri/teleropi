TeleRopi
===
Experiments with the Telegram Bot API and Raspberry Pi.

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
```
$ node app.js
```

or debug (using flags):

```
$ DEBUG=* node app.js
```

Debug flags
===
```
*                 : Enable all debugging
TeleRopi_Slimbot  : Slimbot debug messages only
TeleRopi_reportIPs: reportIPs debug messages only
```
