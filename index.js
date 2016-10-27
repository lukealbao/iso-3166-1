/* eslint-disable max-lines */

'use strict';

var path = require('path');
var index = require(path.resolve(__dirname, 'src/', 'index.json'));

module.exports = {
  numeric: function (input) { return map[input] && map[input].numeric; },
  alpha2: function (input) { return map[input] && map[input].alpha2; },
  alpha3: function (input) { return map[input] && map[input].alpha3; },
  name: function (input) { return map[input] && map[input].name; },
  currency: function (input) {
    return (map[input] && map[input].currency) || undefined;
  }
};

var map = {};
index.forEach(function (c) {
  Object.keys(c).forEach(function (key) {
    // Currency codes can be shared by multiple countries, so we
    // do not want to map currency codes to objects. The 3166-numeric
    // is capable of a 1-1 match.
    if (/currency/i.test(key)) return;

    map[c[key]] = c;
  });
});

Object.defineProperty(module.exports, 'index', {
  get: function () { return index; },
  set: function () { throw new TypeError('Index is immutable'); },
  configurable: false,
  enumerable: false
});
