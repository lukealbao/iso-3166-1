'use strict';

// makeIndex: create a src/index.json file
//
// The goal of this build script is to take the exhaustive list of
// countries provided by https://github.com/datasets/country-codes.git
// and generate a lookup table for internal use.
//
// This package generates a _subset_ of attributes in the source file.
// If you would like to include other attributes, they can be added here,
// but you will need to extend the |lookup| method in the main file to
// enable searching via the new property.

var inputFile = process.argv[2];
var outputFile = process.argv[3];
var fs = require('fs');

// Source is an array representation of the entries from
// https://github.com/datasets/country-codes.git. It has
// more data than we currently use.
var source = JSON.parse(fs.readFileSync(inputFile, {
  flags: 'r', encoding: 'utf8'
}));

var writeStream = fs.createWriteStream(outputFile, {
  flags: 'w', encoding: 'utf8'
});

var index = source.map(function (entry) {
              var iso3166 = {};
              
              iso3166.name = entry.name || entry.official_name_en;
              iso3166.alpha2 = entry['ISO3166-1-Alpha-2'];
              iso3166.alpha3 = entry['ISO3166-1-Alpha-3'];
              iso3166.numeric = entry['ISO3166-1-numeric'];
              
              return iso3166;
            }).filter(function (country) {
              return country.name
                  && country.alpha2
                  && country.alpha3
                  && country.numeric;
            });

writeStream.write(JSON.stringify(index, null, 2));


