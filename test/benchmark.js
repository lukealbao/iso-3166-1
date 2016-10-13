/* eslint-disable no-console */

'use strict';

var path = require('path');
var iso31661 = require(path.resolve(__dirname, '..'));
var Benchmark = require('benchmark');
var worstCase = new Benchmark.Suite();

worstCase
.add('iso31661.name("Zambia")', function () {
  iso31661.name('Zambia');
})
.add('iso31661.name(894)', function () {
  iso31661.name(894);
})
.add('iso31661.name("ZM")', function () {
  iso31661.name('ZM');
})

.on('error', function (err) {
  console.error(err.target.error);
})

.on('cycle', function (event) {
  console.log(String(event.target));
});

worstCase.run({async: true});
