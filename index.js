/* eslint-disable max-lines */

'use strict';

var path = require('path');
var index = require(path.resolve(__dirname, 'src/', 'index.json'));

module.exports = {
  numeric: function (input) { return lookup(input, 'numeric'); },
  alpha2: function (input) { return lookup(input, 'alpha2'); },
  alpha3: function (input) { return lookup(input, 'alpha3'); },
  name: function (input) { return lookup(input, 'name'); }
};

// lookup :: (String | Number, String) -> (String | Number | Undefined)
//
// Private abstract function accepts any ISO 3166-1 value as input,
// along with an output type (in {numeric, alpha2, alpha3, name}) and returns
// the matching value if it exists. If not, it will return undefined.

function lookup (input, type) {
  // We will look up the country in the index via the |input|. We
  // find the correct input by identifying the |key| that it would
  // appear under.
  var key;

  if (parseInt(input, 10) >= 0) {
    key = 'numeric';
  } else if (input === 'UK') {
    // Annoying edge case: Name is UK, alpha2 is GB, so if you lookup
    // 'UK', it won't work, as it will be sorted as 'GB'. Note:
    // technically, any 2- or 3-character |name| would present this
    // problem, but only UK fails in practice.
    key = 'name';
  } else {
    switch(input.length) {
    case 2:
      key = 'alpha2';
      break;

    case 3:
      key = 'alpha3';
      break;

    default:
      key = 'name';
      break;
    }
  }

  // Using binary search for everything. We want to sort it, but
  // since country names and numeric codes to not increase monotonically,
  // we have to do it at runtime.
  var sortedIndex = index.sort(function (a, b) {
    if (a[key] < b[key]) return -1;
    return 1;
  });


  // This will be either |undefined| or the object found in the
  // |index| that matches on |key|.
  var country = binarySearch(sortedIndex, function (country) {
    // soft-equals, as input may be, e.g., "840" OR 840
    if (country[key] == input) return 0;
    return (country[key] < input) ? -1 : 1;
  });

  return country && country[type];
}

// binarySearch :: (Array, (Any) -> {-1, 0, 1}) -> Any
//
// Rather than having a matrix of lookup tables, we keep everything in
// a simple array and use binary search to identify the proper entry.
// The |predicate| function works in the same way as a predicate you give
// to |Array.sort|: if the entry comes before the target, return -1, if
// it comes after, return 1, and return 0 if the entry is the target.
function binarySearch (items, predicate) {
  if (!items || items.length === 0) return (undefined);

  var i = Math.floor(items.length / 2);

  switch (predicate(items[i])) {
  case 0:
    return items[i];

  case -1:
    return binarySearch(items.slice(i + 1), predicate);

  case 1:
    return binarySearch(items.slice(0, i), predicate);

  default:
    throw new TypeError('Predicate must return n {-1, 0, 1}');
  }
}

Object.defineProperty(module.exports, 'index', {
  get: function () { return index; },
  set: function () { throw new TypeError('Index is immutable'); },
  configurable: false,
  enumerable: false
});
