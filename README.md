# ISO 3166-1 Conversions
Currently supports a list of 249 countries.

## Why For?
This was built to integrate with legacy payment processing systems that
use all different formats of the ISO 3166-1 standard. It can be used
in a pipeline for standardizing the format. 

Let's say you want to standardize everything to ISO 3166-1 alpha-2,
but you could receive alpha-2, alpha-3, or full names. Well, just
pass any input value through the `alpha2` method, and whether you input
`"CA"`, `"CAN"`, `"124"`, or `124`, it will evaluate to `"CA"`.

## Usage

All methods will accept a valid 3166-1 value: Either `name`, `alpha2`,
`alpha3`, or `numeric`. Numeric inputs may be a Number or a
String. The rest of course must be Strings. Calling a given method
will return the type specified, if it exists. Otherwise, it will
return `undefined`. `numeric` and `currency` calls will return
Strings, because there exist 0-padded codes.

```javascript
iso3166.name('JP); // -> "Japan"
iso3166.alpha2('Japan'); // -> "JP"
iso3166.alpha3('392'); // -> "JPN"
iso3166.numeric('JP'); // -> "392"
iso3166.currency('JPN'); // -> "392"

iso3166.alpha2('Genovia'); // -> undefined
```

### Caveats
- Everything is case sensitive. Passing in "JAPAN" or "jp" will return
  `undefined`.
- This is not capable of receiving currency codes as input. Since many
  countries share a currency code, a country cannot be identified by
  its currency code. 

## Benchmark

All data is kept in a single array, which gives it a fairly small
footprint. Each method will return the proper value via a binary
search through all the countries. In the worst case scenario, you can
expect 20k-30k ops/second.

```
iso31661.name(894) x 41,279,429 ops/sec ±3.22% (75 runs sampled)
iso31661.name("ZM") x 35,323,443 ops/sec ±2.90% (75 runs sampled)
iso31661.name("Zambia") x 19,911,280 ops/sec ±3.03% (73 runs sampled)
```


