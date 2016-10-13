'use strict';

// generate: Generate an intermediate JSON representation of the
// source country data found at https://github.com/datasets/country-codes.git.
//
// This is strictly an intermediate form. The Makefile should take
// care of pulling the source from Github and creating this file. As an
// intermediate representation, its end goal is to create the subset in
// src/index.json. Thus, there should be no need to modify the operations
// of this file.

var inputFile = process.argv[2];
var outputFile = process.argv[3];
var fs = require('fs');
var csv = require('csv');

console.log('Generating "%s" from <%s>', outputFile, inputFile);

var readStream = fs.createReadStream(inputFile, {
  flags: 'r', encoding: 'utf8'
});

var writeStream = fs.createWriteStream(outputFile, {
  flags: 'w', encoding: 'utf8'
});

var parser = csv.parse();

var struct = [];
var keys;
var linesSeen = 0;

parser.on('readable', function () {
  var line = parser.read();
  if (line === null) return;
  if (linesSeen++ <= 0) {
    keys = line;
    return;
  }

  var entry = {};
  keys.forEach(function (key, i) {
    entry[key] = line[i];
  });
  
  struct.push(entry);
});

parser.on('end', function () {
  console.log('Generated %d entries', struct && struct.length);
  writeStream.write(JSON.stringify(struct, null, 2));
});

readStream
.pipe(parser);

