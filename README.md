TeleRopi
===
Experiments with the Telegram Bot API and Raspberry Pi.

Installation
===

1. clone the repo
2. run 'nmp install'

Configuration
===
Create a Telegram bot in order to obtain an API token that is required
by TeleRopi. More information on creating a bot can be found at:
https://core.telegram.org/bots#6-botfather.

TeleRopi's configuration is located at: __config/teleropi.config__

Please rename the template and edit the configuration according to your
installation. Add the Telegram API Token to the appropriate line in the
configuration file.

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
