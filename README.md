# ISO 3166-1 Conversions
Currently supports a list of 249 countries. 

## Usage

All methods will accept a valid 3166-1 value: Either `name`, `alpha2`,
`alpha3`, or `numeric`. Numeric inputs may be a Number or a
String. The rest of course must be Strings. Calling a given method
will return the type specified, if it exists. Otherwise, it will
return `undefined`.

```javascript
iso3166.name('US'); // -> "United States"
iso3166.alpha2('United States'); // -> "US"
iso3166.alpha3('840'); // -> "USA"
iso3166.numeric('US'); // -> 840

iso3166.alpha2('Genovia'); // -> undefined
```

## Benchmark

All data is kept in a single array, which gives it a fairly small
footprint. Each method will return the proper value via a binary
search through all the countries. In the worst case scenario, you can
expect 20k-30k ops/second.

```
iso36601.name(894) x 32,301 ops/sec ±3.59% (76 runs sampled)
iso36601.name("ZM") x 14,111 ops/sec ±3.37% (78 runs sampled)
iso36601.name("Zambia") x 12,585 ops/sec ±3.07% (79 runs sampled)
```


