'use strict';

var path = require('path');
var iso31661 = require(path.resolve(__dirname, '..'));
var expect = require('chai').expect;

describe('Package', function () {
  it('Contains ' + iso31661.index.length + ' countries', function () {
  });
});

describe('iso31661.name()', function () {
  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns a name for all entries using ' + lookupType + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var name = iso31661.name(country[lookupType]);
           expect(name).to.be.a('string');
           expect(name.length).to.be.above(0);
         });
       });
  });
});

describe('iso31661.alpha2()', function () {
  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns an alpha-2 code for all entries using ' + lookupType + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var alpha2 = iso31661.alpha2(country[lookupType]);
           expect(alpha2).to.be.a('string');
           expect(alpha2.length).to.equal(2);
         });
       });
  });
});

describe('iso31661.alpha3()', function () {
  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns an alpha-3 code for all entries using ' + lookupType + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var alpha3 = iso31661.alpha3(country[lookupType]);
           expect(alpha3).to.be.a('string');
           expect(alpha3.length).to.equal(3);
         });
       });
  });
});

describe('iso31661.numeric()', function () {
  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns an alpha-3 code for all entries using ' + lookupType + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var number = iso31661.numeric(country[lookupType]);
           expect(number).to.be.a('number');
           expect(number).to.be.above(0);
           expect(number).not.to.equal(NaN);
         });
       });
  });
});
