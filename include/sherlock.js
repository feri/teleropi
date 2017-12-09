/**
 * A set of routines that obtain various information from the host
 * computer running Teleropi.
 *
 * Author: ferenc.szekely@gmail.com
 * License: MIT
 *
 * Copyright (c) 2017 Ferenc Székely
 */
'use strict';

const netif = require('netinterfaces');
const config = require('../config/teleropi.config');

var sherlock = exports = module.exports = {}

sherlock.reportIPs = function() {
  let map = netif.list();
  let reply = "Available interfaces:\r\n";
  let allifs = [], addresses = '', name = '', found = false;
  let debug = require('debug')(config.name + '_reportIPs');

  if (map) {
    debug('%o', Object.keys(map));

    let len = Object.keys(map).length;
    for (let i = 0; i < len; i++) {
      addresses = '';
      name = Object.keys(map)[i];
      allifs = map[name];

      let len = allifs.length
      for (let i = 0; i < len; i++) {
        if (allifs[i].internal == false && typeof allifs[i].address != "undefined") {
          found = true;
          addresses += allifs[i].address + ' ';
        }
      }
      if (addresses != '') {
        reply += name + ': ' + addresses + "\r\n";
        debug('interface %s: %s', name, addresses);
      }
    }
  }

  if (! found) {
    reply = "There is no available network interface.";
  }

  return reply;
}
