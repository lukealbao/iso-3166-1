/* eslint-disable max-lines */

'use strict';

var path = require('path');
var index = require(path.resolve(__dirname, 'src/', 'index.json'));

module.exports = {
  numeric: function (input) { return map[input].numeric; },
  alpha2: function (input) { return map[input].alpha2; },
  alpha3: function (input) { return map[input].alpha3; },
  name: function (input) { return map[input].name; }
};

var map = {};
index.forEach(function (c) {
  Object.keys(c).forEach(function (key) {
    map[c[key]] = c;
  });
});

Object.defineProperty(module.exports, 'index', {
  get: function () { return index; },
  set: function () { throw new TypeError('Index is immutable'); },
  configurable: false,
  enumerable: false
});
