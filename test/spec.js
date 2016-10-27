'use strict';

var path = require('path');
var iso31661 = require(path.resolve(__dirname, '..'));
var expect = require('chai').expect;

describe('Package', function () {
  it('Contains ' + iso31661.index.length + ' countries', function () {
  });
});

describe('iso31661.name()', function () {
  var undefinedNames = [];
  after(function () {
    console.warn('   -!- %d countries have undefined names',
                 undefinedNames.length);
  });
  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns a name for all entries using ' + lookupType + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var name = iso31661.name(country[lookupType]);
           if (!name) {
             if (undefinedNames.indexOf(country) < 0) {
               undefinedNames.push(country);
             }
             return;
           }
           expect(name).to.be.a('string');
           expect(name.length).to.be.above(0);
         });
       });
  });
});

describe('iso31661.alpha2()', function () {
  var undefinedAlpha2 = [];
  after(function () {
    console.warn('   -!- %d countries have undefined alpha2 codes',
                 undefinedAlpha2.length);
  });

  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns an alpha-2 code for all entries using ' + lookupType + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var alpha2 = iso31661.alpha2(country[lookupType]);
           if (!alpha2) {
             if (undefinedAlpha2.indexOf(country) < 0) {
               undefinedAlpha2.push(country);
             }
             return;
           }

           expect(alpha2).to.be.a('string');
           expect(alpha2.length).to.equal(2);
         });
       });
  });
});

describe('iso31661.alpha3()', function () {
  var undefinedAlpha3 = [];
  after(function () {
    console.warn('   -!- %d countries have undefined alpha3 codes',
                 undefinedAlpha3.length);
  });

  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns an alpha-3 code for all entries using ' + lookupType + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var alpha3 = iso31661.alpha3(country[lookupType]);
           if (!alpha3) {
             if (undefinedAlpha3.indexOf(country) < 0) {
               undefinedAlpha3.push(country);
             }
             return;
           }

           expect(alpha3).to.be.a('string');
           expect(alpha3.length).to.equal(3);
         });
       });
  });
});

describe('iso31661.numeric()', function () {
  var undefinedNumeric = [];
  after(function () {
    console.warn('   -!- %d countries have undefined numeric codes',
                 undefinedNumeric.length);
  });

  ['alpha2', 'alpha3', 'name', 'numeric'].forEach(function (lookupType) {
    it('Returns a stringified numeric code for all entries using ' + lookupType
      + ' input',
       function () {
         iso31661.index.forEach(function (country) {
           var number = iso31661.numeric(country[lookupType]);
           if (!number) {
             if (undefinedNumeric.indexOf(country) < 0) {
               undefinedNumeric.push(country);
             }
             return;
           }

           expect(number).to.be.a('string');
           expect(number).to.be.above(0);
           expect(number).not.to.equal(NaN);
         });
       });
  });
});

describe('Undefined input', function () {
  it('iso31661.name() returns |undefined| if no value is found', function () {
    var value = iso31661.name('Genovia');
    expect(value).to.equal(undefined);
  });

  it('iso31661.numeric() returns |undefined| if no value is found', function () {
    var value = iso31661.numeric(999);
    expect(value).to.equal(undefined);
  });

  it('iso31661.alpha2() returns |undefined| if no value is found', function () {
    var value = iso31661.alpha2('ZZ');
    expect(value).to.equal(undefined);
  });

  it('iso31661.alpha3() returns |undefined| if no value is found', function () {
    var value = iso31661.alpha3('ZZZ');
    expect(value).to.equal(undefined);
  });

  it('All methods return |undefined| upon receiving undefined input',
     function () {
       expect(iso31661.alpha2()).to.equal(undefined);
       expect(iso31661.alpha3()).to.equal(undefined);
       expect(iso31661.name()).to.equal(undefined);
       expect(iso31661.numeric()).to.equal(undefined);
     });
});
