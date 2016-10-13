/* eslint-disable max-lines */

'use strict';

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
  var key;

  if (parseInt(input, 10) >= 0) {
    key = 'numeric';
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

var index = [
  {
    alpha2: 'AF',
    alpha3: 'AFG',
    name: 'Afghanistan',
    numeric: 4
  },
  {
    alpha2: 'AL',
    alpha3: 'ALB',
    name: 'Albania',
    numeric: 8
  },
  {
    alpha2: 'AQ',
    alpha3: 'ATA',
    name: 'Antarctica',
    numeric: 10
  },
  {
    alpha2: 'DZ',
    alpha3: 'DZA',
    name: 'Algeria',
    numeric: 12
  },
  {
    alpha2: 'AS',
    alpha3: 'ASM',
    name: 'American Samoa',
    numeric: 16
  },
  {
    alpha2: 'AD',
    alpha3: 'AND',
    name: 'Andorra',
    numeric: 20
  },
  {
    alpha2: 'AO',
    alpha3: 'AGO',
    name: 'Angola',
    numeric: 24
  },
  {
    alpha2: 'AG',
    alpha3: 'ATG',
    name: 'Antigua And Barbuda',
    numeric: 28
  },
  {
    alpha2: 'AZ',
    alpha3: 'AZE',
    name: 'Azerbaijan',
    numeric: 31
  },
  {
    alpha2: 'AR',
    alpha3: 'ARG',
    name: 'Argentina',
    numeric: 32
  },
  {
    alpha2: 'AU',
    alpha3: 'AUS',
    name: 'Australia',
    numeric: 36
  },
  {
    alpha2: 'AT',
    alpha3: 'AUT',
    name: 'Austria',
    numeric: 40
  },
  {
    alpha2: 'BS',
    alpha3: 'BHS',
    name: 'Bahamas',
    numeric: 44
  },
  {
    alpha2: 'BH',
    alpha3: 'BHR',
    name: 'Bahrain',
    numeric: 48
  },
  {
    alpha2: 'BD',
    alpha3: 'BGD',
    name: 'Bangladesh',
    numeric: 50
  },
  {
    alpha2: 'AM',
    alpha3: 'ARM',
    name: 'Armenia',
    numeric: 51
  },
  {
    alpha2: 'BB',
    alpha3: 'BRB',
    name: 'Barbados',
    numeric: 52
  },
  {
    alpha2: 'BE',
    alpha3: 'BEL',
    name: 'Belgium',
    numeric: 56
  },
  {
    alpha2: 'BM',
    alpha3: 'BMU',
    name: 'Bermuda',
    numeric: 60
  },
  {
    alpha2: 'BT',
    alpha3: 'BTN',
    name: 'Bhutan',
    numeric: 64
  },
  {
    alpha2: 'BO',
    alpha3: 'BOL',
    name: 'Bolivia, Plurinational State Of',
    numeric: 68
  },
  {
    alpha2: 'BA',
    alpha3: 'BIH',
    name: 'Bosnia & Herzegovina',
    numeric: 70
  },
  {
    alpha2: 'BW',
    alpha3: 'BWA',
    name: 'Botswana',
    numeric: 72
  },
  {
    alpha2: 'BV',
    alpha3: 'BVT',
    name: 'Bouvet Island',
    numeric: 74
  },
  {
    alpha2: 'BR',
    alpha3: 'BRA',
    name: 'Brazil',
    numeric: 76
  },
  {
    alpha2: 'BZ',
    alpha3: 'BLZ',
    name: 'Belize',
    numeric: 84
  },
  {
    alpha2: 'IO',
    alpha3: 'IOT',
    name: 'British Indian Ocean Territory',
    numeric: 86
  },
  {
    alpha2: 'SB',
    alpha3: 'SLB',
    name: 'Solomon Islands',
    numeric: 90
  },
  {
    alpha2: 'VG',
    alpha3: 'VGB',
    name: 'Virgin Islands (British)',
    numeric: 92
  },
  {
    alpha2: 'BN',
    alpha3: 'BRN',
    name: 'Brunei Darussalam',
    numeric: 96
  },
  {
    alpha2: 'BG',
    alpha3: 'BGR',
    name: 'Bulgaria',
    numeric: 100
  },
  {
    alpha2: 'MM',
    alpha3: 'MMR',
    name: 'Myanmar',
    numeric: 104
  },
  {
    alpha2: 'BI',
    alpha3: 'BDI',
    name: 'Burundi',
    numeric: 108
  },
  {
    alpha2: 'BY',
    alpha3: 'BLR',
    name: 'Byelorussian SSR',
    numeric: 112
  },
  {
    alpha2: 'KH',
    alpha3: 'KHM',
    name: 'Cambodia',
    numeric: 116
  },
  {
    alpha2: 'CM',
    alpha3: 'CMR',
    name: 'Cameroon',
    numeric: 120
  },
  {
    alpha2: 'CA',
    alpha3: 'CAN',
    name: 'Canada',
    numeric: 124
  },
  {
    alpha2: 'CV',
    alpha3: 'CPV',
    name: 'Cabo Verde',
    numeric: 132
  },
  {
    alpha2: 'KY',
    alpha3: 'CYM',
    name: 'Cayman Islands',
    numeric: 136
  },
  {
    alpha2: 'CF',
    alpha3: 'CAF',
    name: 'Central African Republic',
    numeric: 140
  },
  {
    alpha2: 'LK',
    alpha3: 'LKA',
    name: 'Sri Lanka',
    numeric: 144
  },
  {
    alpha2: 'TD',
    alpha3: 'TCD',
    name: 'Chad',
    numeric: 148
  },
  {
    alpha2: 'CL',
    alpha3: 'CHL',
    name: 'Chile',
    numeric: 152
  },
  {
    alpha2: 'CN',
    alpha3: 'CHN',
    name: 'China',
    numeric: 156
  },
  {
    alpha2: 'TW',
    alpha3: 'TWN',
    name: 'Taiwan',
    numeric: 158
  },
  {
    alpha2: 'CX',
    alpha3: 'CXR',
    name: 'Christmas Island',
    numeric: 162
  },
  {
    alpha2: 'CC',
    alpha3: 'CCK',
    name: 'Cocos (Keeling) Islands',
    numeric: 166
  },
  {
    alpha2: 'CO',
    alpha3: 'COL',
    name: 'Colombia',
    numeric: 170
  },
  {
    alpha2: 'KM',
    alpha3: 'COM',
    name: 'Comoros',
    numeric: 174
  },
  {
    alpha2: 'YT',
    alpha3: 'MYT',
    name: 'Mayotte',
    numeric: 175
  },
  {
    alpha2: 'CG',
    alpha3: 'COG',
    name: 'Republic Of Congo',
    numeric: 178
  },
  {
    alpha2: 'CD',
    alpha3: 'COD',
    name: 'Democratic Republic Of Congo',
    numeric: 180
  },
  {
    alpha2: 'CK',
    alpha3: 'COK',
    name: 'Cook Islands',
    numeric: 184
  },
  {
    alpha2: 'CR',
    alpha3: 'CRI',
    name: 'Costa Rica',
    numeric: 188
  },
  {
    alpha2: 'HR',
    alpha3: 'HRV',
    name: 'Croatia',
    numeric: 191
  },
  {
    alpha2: 'CU',
    alpha3: 'CUB',
    name: 'Cuba',
    numeric: 192
  },
  {
    alpha2: 'CY',
    alpha3: 'CYP',
    name: 'Cyprus',
    numeric: 196
  },
  {
    alpha2: 'CZ',
    alpha3: 'CZE',
    name: 'Czech Republic',
    numeric: 203
  },
  {
    alpha2: 'BJ',
    alpha3: 'BEN',
    name: 'Benin',
    numeric: 204
  },
  {
    alpha2: 'DK',
    alpha3: 'DNK',
    name: 'Denmark',
    numeric: 208
  },
  {
    alpha2: 'DM',
    alpha3: 'DMA',
    name: 'Dominica',
    numeric: 212
  },
  {
    alpha2: 'DO',
    alpha3: 'DOM',
    name: 'Dominican Republic',
    numeric: 214
  },
  {
    alpha2: 'EC',
    alpha3: 'ECU',
    name: 'Ecuador',
    numeric: 218
  },
  {
    alpha2: 'SV',
    alpha3: 'SLV',
    name: 'El Salvador',
    numeric: 222
  },
  {
    alpha2: 'GQ',
    alpha3: 'GNQ',
    name: 'Equatorial Guinea',
    numeric: 226
  },
  {
    alpha2: 'ET',
    alpha3: 'ETH',
    name: 'Ethiopia',
    numeric: 231
  },
  {
    alpha2: 'ER',
    alpha3: 'ERI',
    name: 'Eritrea',
    numeric: 232
  },
  {
    alpha2: 'EE',
    alpha3: 'EST',
    name: 'Estonia',
    numeric: 233
  },
  {
    alpha2: 'FO',
    alpha3: 'FRO',
    name: 'Faroe Islands',
    numeric: 234
  },
  {
    alpha2: 'FK',
    alpha3: 'FLK',
    name: 'Falkland Islands',
    numeric: 238
  },
  {
    alpha2: 'GS',
    alpha3: 'SGS',
    name: 'South Georgia And The South Sandwich Islands',
    numeric: 239
  },
  {
    alpha2: 'FJ',
    alpha3: 'FJI',
    name: 'Fiji',
    numeric: 242
  },
  {
    alpha2: 'FI',
    alpha3: 'FIN',
    name: 'Finland',
    numeric: 246
  },
  {
    alpha2: 'AX',
    alpha3: 'ALA',
    name: 'Åland Islands',
    numeric: 248
  },
  {
    alpha2: 'FR',
    alpha3: 'FRA',
    name: 'France',
    numeric: 250
  },
  {
    alpha2: 'GF',
    alpha3: 'GUF',
    name: 'French Guiana',
    numeric: 254
  },
  {
    alpha2: 'PF',
    alpha3: 'PYF',
    name: 'French Polynesia',
    numeric: 258
  },
  {
    alpha2: 'TF',
    alpha3: 'ATF',
    name: 'French Southern Territories',
    numeric: 260
  },
  {
    alpha2: 'DJ',
    alpha3: 'DJI',
    name: 'Djibouti',
    numeric: 262
  },
  {
    alpha2: 'GA',
    alpha3: 'GAB',
    name: 'Gabon',
    numeric: 266
  },
  {
    alpha2: 'GE',
    alpha3: 'GEO',
    name: 'Gilbert and Ellice Islands',
    numeric: 268
  },
  {
    alpha2: 'GM',
    alpha3: 'GMB',
    name: 'Gambia',
    numeric: 270
  },
  {
    alpha2: 'PS',
    alpha3: 'PSE',
    name: 'Palestinian Territory, Occupied',
    numeric: 275
  },
  {
    alpha2: 'DE',
    alpha3: 'DEU',
    name: 'Germany',
    numeric: 276
  },
  {
    alpha2: 'GH',
    alpha3: 'GHA',
    name: 'Ghana',
    numeric: 288
  },
  {
    alpha2: 'GI',
    alpha3: 'GIB',
    name: 'Gibraltar',
    numeric: 292
  },
  {
    alpha2: 'KI',
    alpha3: 'KIR',
    name: 'Kiribati',
    numeric: 296
  },
  {
    alpha2: 'GR',
    alpha3: 'GRC',
    name: 'Greece',
    numeric: 300
  },
  {
    alpha2: 'GL',
    alpha3: 'GRL',
    name: 'Greenland',
    numeric: 304
  },
  {
    alpha2: 'GD',
    alpha3: 'GRD',
    name: 'Grenada',
    numeric: 308
  },
  {
    alpha2: 'GP',
    alpha3: 'GLP',
    name: 'Guadeloupe',
    numeric: 312
  },
  {
    alpha2: 'GU',
    alpha3: 'GUM',
    name: 'Guam',
    numeric: 316
  },
  {
    alpha2: 'GT',
    alpha3: 'GTM',
    name: 'Guatemala',
    numeric: 320
  },
  {
    alpha2: 'GN',
    alpha3: 'GIN',
    name: 'Guinea',
    numeric: 324
  },
  {
    alpha2: 'GY',
    alpha3: 'GUY',
    name: 'Guyana',
    numeric: 328
  },
  {
    alpha2: 'HT',
    alpha3: 'HTI',
    name: 'Haiti',
    numeric: 332
  },
  {
    alpha2: 'HM',
    alpha3: 'HMD',
    name: 'Heard Island And McDonald Islands',
    numeric: 334
  },
  {
    alpha2: 'VA',
    alpha3: 'VAT',
    name: 'Vatican City State',
    numeric: 336
  },
  {
    alpha2: 'HN',
    alpha3: 'HND',
    name: 'Honduras',
    numeric: 340
  },
  {
    alpha2: 'HK',
    alpha3: 'HKG',
    name: 'Hong Kong',
    numeric: 344
  },
  {
    alpha2: 'HU',
    alpha3: 'HUN',
    name: 'Hungary',
    numeric: 348
  },
  {
    alpha2: 'IS',
    alpha3: 'ISL',
    name: 'Iceland',
    numeric: 352
  },
  {
    alpha2: 'IN',
    alpha3: 'IND',
    name: 'India',
    numeric: 356
  },
  {
    alpha2: 'ID',
    alpha3: 'IDN',
    name: 'Indonesia',
    numeric: 360
  },
  {
    alpha2: 'IR',
    alpha3: 'IRN',
    name: 'Iran, Islamic Republic Of',
    numeric: 364
  },
  {
    alpha2: 'IQ',
    alpha3: 'IRQ',
    name: 'Iraq',
    numeric: 368
  },
  {
    alpha2: 'IE',
    alpha3: 'IRL',
    name: 'Ireland',
    numeric: 372
  },
  {
    alpha2: 'IL',
    alpha3: 'ISR',
    name: 'Israel',
    numeric: 376
  },
  {
    alpha2: 'IT',
    alpha3: 'ITA',
    name: 'Italy',
    numeric: 380
  },
  {
    alpha2: 'CI',
    alpha3: 'CIV',
    name: 'Côte d\'Ivoire',
    numeric: 384
  },
  {
    alpha2: 'JM',
    alpha3: 'JAM',
    name: 'Jamaica',
    numeric: 388
  },
  {
    alpha2: 'JP',
    alpha3: 'JPN',
    name: 'Japan',
    numeric: 392
  },
  {
    alpha2: 'KZ',
    alpha3: 'KAZ',
    name: 'Kazakhstan',
    numeric: 398
  },
  {
    alpha2: 'JO',
    alpha3: 'JOR',
    name: 'Jordan',
    numeric: 400
  },
  {
    alpha2: 'KE',
    alpha3: 'KEN',
    name: 'Kenya',
    numeric: 404
  },
  {
    alpha2: 'KP',
    alpha3: 'PRK',
    name: 'Korea, Democratic People\'s Republic Of',
    numeric: 408
  },
  {
    alpha2: 'KR',
    alpha3: 'KOR',
    name: 'Korea, Republic Of',
    numeric: 410
  },
  {
    alpha2: 'KW',
    alpha3: 'KWT',
    name: 'Kuwait',
    numeric: 414
  },
  {
    alpha2: 'KG',
    alpha3: 'KGZ',
    name: 'Kyrgyzstan',
    numeric: 417
  },
  {
    alpha2: 'LA',
    alpha3: 'LAO',
    name: 'Lao People\'s Democratic Republic',
    numeric: 418
  },
  {
    alpha2: 'LB',
    alpha3: 'LBN',
    name: 'Lebanon',
    numeric: 422
  },
  {
    alpha2: 'LS',
    alpha3: 'LSO',
    name: 'Lesotho',
    numeric: 426
  },
  {
    alpha2: 'LV',
    alpha3: 'LVA',
    name: 'Latvia',
    numeric: 428
  },
  {
    alpha2: 'LR',
    alpha3: 'LBR',
    name: 'Liberia',
    numeric: 430
  },
  {
    alpha2: 'LY',
    alpha3: 'LBY',
    name: 'Libya',
    numeric: 434
  },
  {
    alpha2: 'LI',
    alpha3: 'LIE',
    name: 'Liechtenstein',
    numeric: 438
  },
  {
    alpha2: 'LT',
    alpha3: 'LTU',
    name: 'Lithuania',
    numeric: 440
  },
  {
    alpha2: 'LU',
    alpha3: 'LUX',
    name: 'Luxembourg',
    numeric: 442
  },
  {
    alpha2: 'MO',
    alpha3: 'MAC',
    name: 'Macao',
    numeric: 446
  },
  {
    alpha2: 'MG',
    alpha3: 'MDG',
    name: 'Madagascar',
    numeric: 450
  },
  {
    alpha2: 'MW',
    alpha3: 'MWI',
    name: 'Malawi',
    numeric: 454
  },
  {
    alpha2: 'MY',
    alpha3: 'MYS',
    name: 'Malaysia',
    numeric: 458
  },
  {
    alpha2: 'MV',
    alpha3: 'MDV',
    name: 'Maldives',
    numeric: 462
  },
  {
    alpha2: 'ML',
    alpha3: 'MLI',
    name: 'Mali',
    numeric: 466
  },
  {
    alpha2: 'MT',
    alpha3: 'MLT',
    name: 'Malta',
    numeric: 470
  },
  {
    alpha2: 'MQ',
    alpha3: 'MTQ',
    name: 'Martinique',
    numeric: 474
  },
  {
    alpha2: 'MR',
    alpha3: 'MRT',
    name: 'Mauritania',
    numeric: 478
  },
  {
    alpha2: 'MU',
    alpha3: 'MUS',
    name: 'Mauritius',
    numeric: 480
  },
  {
    alpha2: 'MX',
    alpha3: 'MEX',
    name: 'Mexico',
    numeric: 484
  },
  {
    alpha2: 'MC',
    alpha3: 'MCO',
    name: 'Monaco',
    numeric: 492
  },
  {
    alpha2: 'MN',
    alpha3: 'MNG',
    name: 'Mongolia',
    numeric: 496
  },
  {
    alpha2: 'MD',
    alpha3: 'MDA',
    name: 'Moldova',
    numeric: 498
  },
  {
    alpha2: 'ME',
    alpha3: 'MNE',
    name: 'Montenegro',
    numeric: 499
  },
  {
    alpha2: 'MS',
    alpha3: 'MSR',
    name: 'Montserrat',
    numeric: 500
  },
  {
    alpha2: 'MA',
    alpha3: 'MAR',
    name: 'Morocco',
    numeric: 504
  },
  {
    alpha2: 'MZ',
    alpha3: 'MOZ',
    name: 'Mozambique',
    numeric: 508
  },
  {
    alpha2: 'OM',
    alpha3: 'OMN',
    name: 'Oman',
    numeric: 512
  },
  {
    alpha2: 'NA',
    alpha3: 'NAM',
    name: 'Namibia',
    numeric: 516
  },
  {
    alpha2: 'NR',
    alpha3: 'NRU',
    name: 'Nauru',
    numeric: 520
  },
  {
    alpha2: 'NP',
    alpha3: 'NPL',
    name: 'Nepal',
    numeric: 524
  },
  {
    alpha2: 'NL',
    alpha3: 'NLD',
    name: 'Netherlands',
    numeric: 528
  },
  {
    alpha2: 'CW',
    alpha3: 'CUW',
    name: 'Curacao',
    numeric: 531
  },
  {
    alpha2: 'AW',
    alpha3: 'ABW',
    name: 'Aruba',
    numeric: 533
  },
  {
    alpha2: 'SX',
    alpha3: 'SXM',
    name: 'Sint Maarten',
    numeric: 534
  },
  {
    alpha2: 'BQ',
    alpha3: 'BES',
    name: 'British Antarctic Territory',
    numeric: 535
  },
  {
    alpha2: 'NC',
    alpha3: 'NCL',
    name: 'New Caledonia',
    numeric: 540
  },
  {
    alpha2: 'VU',
    alpha3: 'VUT',
    name: 'Vanuatu',
    numeric: 548
  },
  {
    alpha2: 'NZ',
    alpha3: 'NZL',
    name: 'New Zealand',
    numeric: 554
  },
  {
    alpha2: 'NI',
    alpha3: 'NIC',
    name: 'Nicaragua',
    numeric: 558
  },
  {
    alpha2: 'NE',
    alpha3: 'NER',
    name: 'Niger',
    numeric: 562
  },
  {
    alpha2: 'NG',
    alpha3: 'NGA',
    name: 'Nigeria',
    numeric: 566
  },
  {
    alpha2: 'NU',
    alpha3: 'NIU',
    name: 'Niue',
    numeric: 570
  },
  {
    alpha2: 'NF',
    alpha3: 'NFK',
    name: 'Norfolk Island',
    numeric: 574
  },
  {
    alpha2: 'NO',
    alpha3: 'NOR',
    name: 'Norway',
    numeric: 578
  },
  {
    alpha2: 'MP',
    alpha3: 'MNP',
    name: 'Northern Mariana Islands',
    numeric: 580
  },
  {
    alpha2: 'UM',
    alpha3: 'UMI',
    name: 'United States Minor Outlying Islands',
    numeric: 581
  },
  {
    alpha2: 'FM',
    alpha3: 'FSM',
    name: 'Micronesia, Federated States Of',
    numeric: 583
  },
  {
    alpha2: 'MH',
    alpha3: 'MHL',
    name: 'Marshall Islands',
    numeric: 584
  },
  {
    alpha2: 'PW',
    alpha3: 'PLW',
    name: 'Palau',
    numeric: 585
  },
  {
    alpha2: 'PK',
    alpha3: 'PAK',
    name: 'Pakistan',
    numeric: 586
  },
  {
    alpha2: 'PA',
    alpha3: 'PAN',
    name: 'Panama',
    numeric: 591
  },
  {
    alpha2: 'PG',
    alpha3: 'PNG',
    name: 'Papua New Guinea',
    numeric: 598
  },
  {
    alpha2: 'PY',
    alpha3: 'PRY',
    name: 'Paraguay',
    numeric: 600
  },
  {
    alpha2: 'PE',
    alpha3: 'PER',
    name: 'Peru',
    numeric: 604
  },
  {
    alpha2: 'PH',
    alpha3: 'PHL',
    name: 'Philippines',
    numeric: 608
  },
  {
    alpha2: 'PN',
    alpha3: 'PCN',
    name: 'Pitcairn',
    numeric: 612
  },
  {
    alpha2: 'PL',
    alpha3: 'POL',
    name: 'Poland',
    numeric: 616
  },
  {
    alpha2: 'PT',
    alpha3: 'PRT',
    name: 'Portugal',
    numeric: 620
  },
  {
    alpha2: 'GW',
    alpha3: 'GNB',
    name: 'Guinea-bissau',
    numeric: 624
  },
  {
    alpha2: 'TL',
    alpha3: 'TLS',
    name: 'Timor-Leste, Democratic Republic of',
    numeric: 626
  },
  {
    alpha2: 'PR',
    alpha3: 'PRI',
    name: 'Puerto Rico',
    numeric: 630
  },
  {
    alpha2: 'QA',
    alpha3: 'QAT',
    name: 'Qatar',
    numeric: 634
  },
  {
    alpha2: 'RE',
    alpha3: 'REU',
    name: 'Reunion',
    numeric: 638
  },
  {
    alpha2: 'RO',
    alpha3: 'ROU',
    name: 'Romania',
    numeric: 642
  },
  {
    alpha2: 'RU',
    alpha3: 'RUS',
    name: 'Russian Federation',
    numeric: 643
  },
  {
    alpha2: 'RW',
    alpha3: 'RWA',
    name: 'Rwanda',
    numeric: 646
  },
  {
    alpha2: 'BL',
    alpha3: 'BLM',
    name: 'Saint Barthélemy',
    numeric: 652
  },
  {
    alpha2: 'SH',
    alpha3: 'SHN',
    name: 'Saint Helena, Ascension And Tristan Da Cunha',
    numeric: 654
  },
  {
    alpha2: 'KN',
    alpha3: 'KNA',
    name: 'Saint Kitts And Nevis',
    numeric: 659
  },
  {
    alpha2: 'AI',
    alpha3: 'AIA',
    name: 'French Afar and Issas',
    numeric: 660
  },
  {
    alpha2: 'LC',
    alpha3: 'LCA',
    name: 'Saint Lucia',
    numeric: 662
  },
  {
    alpha2: 'MF',
    alpha3: 'MAF',
    name: 'Saint Martin',
    numeric: 663
  },
  {
    alpha2: 'PM',
    alpha3: 'SPM',
    name: 'Saint Pierre And Miquelon',
    numeric: 666
  },
  {
    alpha2: 'VC',
    alpha3: 'VCT',
    name: 'Saint Vincent And The Grenadines',
    numeric: 670
  },
  {
    alpha2: 'SM',
    alpha3: 'SMR',
    name: 'San Marino',
    numeric: 674
  },
  {
    alpha2: 'ST',
    alpha3: 'STP',
    name: 'Sao Tome and Principe',
    numeric: 678
  },
  {
    alpha2: 'SA',
    alpha3: 'SAU',
    name: 'Saudi Arabia',
    numeric: 682
  },
  {
    alpha2: 'SN',
    alpha3: 'SEN',
    name: 'Senegal',
    numeric: 686
  },
  {
    alpha2: 'RS',
    alpha3: 'SRB',
    name: 'Serbia',
    numeric: 688
  },
  {
    alpha2: 'SC',
    alpha3: 'SYC',
    name: 'Seychelles',
    numeric: 690
  },
  {
    alpha2: 'SL',
    alpha3: 'SLE',
    name: 'Sierra Leone',
    numeric: 694
  },
  {
    alpha2: 'SG',
    alpha3: 'SGP',
    name: 'Singapore',
    numeric: 702
  },
  {
    alpha2: 'SK',
    alpha3: 'SVK',
    name: 'Sikkim',
    numeric: 703
  },
  {
    alpha2: 'VN',
    alpha3: 'VNM',
    name: 'Viet Nam',
    numeric: 704
  },
  {
    alpha2: 'SI',
    alpha3: 'SVN',
    name: 'Slovenia',
    numeric: 705
  },
  {
    alpha2: 'SO',
    alpha3: 'SOM',
    name: 'Somalia',
    numeric: 706
  },
  {
    alpha2: 'ZA',
    alpha3: 'ZAF',
    name: 'South Africa',
    numeric: 710
  },
  {
    alpha2: 'ZW',
    alpha3: 'ZWE',
    name: 'Zimbabwe',
    numeric: 716
  },
  {
    alpha2: 'ES',
    alpha3: 'ESP',
    name: 'Spain',
    numeric: 724
  },
  {
    alpha2: 'SS',
    alpha3: 'SSD',
    name: 'South Sudan',
    numeric: 728
  },
  {
    alpha2: 'SD',
    alpha3: 'SDN',
    name: 'Sudan',
    numeric: 729
  },
  {
    alpha2: 'EH',
    alpha3: 'ESH',
    name: 'Western Sahara',
    numeric: 732
  },
  {
    alpha2: 'SR',
    alpha3: 'SUR',
    name: 'Suriname',
    numeric: 740
  },
  {
    alpha2: 'SJ',
    alpha3: 'SJM',
    name: 'Svalbard And Jan Mayen',
    numeric: 744
  },
  {
    alpha2: 'SZ',
    alpha3: 'SWZ',
    name: 'Swaziland',
    numeric: 748
  },
  {
    alpha2: 'SE',
    alpha3: 'SWE',
    name: 'Sweden',
    numeric: 752
  },
  {
    alpha2: 'CH',
    alpha3: 'CHE',
    name: 'Switzerland',
    numeric: 756
  },
  {
    alpha2: 'SY',
    alpha3: 'SYR',
    name: 'Syrian Arab Republic',
    numeric: 760
  },
  {
    alpha2: 'TJ',
    alpha3: 'TJK',
    name: 'Tajikistan',
    numeric: 762
  },
  {
    alpha2: 'TH',
    alpha3: 'THA',
    name: 'Thailand',
    numeric: 764
  },
  {
    alpha2: 'TG',
    alpha3: 'TGO',
    name: 'Togo',
    numeric: 768
  },
  {
    alpha2: 'TK',
    alpha3: 'TKL',
    name: 'Tokelau',
    numeric: 772
  },
  {
    alpha2: 'TO',
    alpha3: 'TON',
    name: 'Tonga',
    numeric: 776
  },
  {
    alpha2: 'TT',
    alpha3: 'TTO',
    name: 'Trinidad And Tobago',
    numeric: 780
  },
  {
    alpha2: 'AE',
    alpha3: 'ARE',
    name: 'United Arab Emirates',
    numeric: 784
  },
  {
    alpha2: 'TN',
    alpha3: 'TUN',
    name: 'Tunisia',
    numeric: 788
  },
  {
    alpha2: 'TR',
    alpha3: 'TUR',
    name: 'Turkey',
    numeric: 792
  },
  {
    alpha2: 'TM',
    alpha3: 'TKM',
    name: 'Turkmenistan',
    numeric: 795
  },
  {
    alpha2: 'TC',
    alpha3: 'TCA',
    name: 'Turks And Caicos Islands',
    numeric: 796
  },
  {
    alpha2: 'TV',
    alpha3: 'TUV',
    name: 'Tuvalu',
    numeric: 798
  },
  {
    alpha2: 'UG',
    alpha3: 'UGA',
    name: 'Uganda',
    numeric: 800
  },
  {
    alpha2: 'UA',
    alpha3: 'UKR',
    name: 'Ukraine',
    numeric: 804
  },
  {
    alpha2: 'MK',
    alpha3: 'MKD',
    name: 'Macedonia, The Former Yugoslav Republic Of',
    numeric: 807
  },
  {
    alpha2: 'EG',
    alpha3: 'EGY',
    name: 'Egypt',
    numeric: 818
  },
  {
    alpha2: 'GB',
    alpha3: 'GBR',
    name: 'United Kingdom',
    numeric: 826
  },
  {
    alpha2: 'GG',
    alpha3: 'GGY',
    name: 'Guernsey',
    numeric: 831
  },
  {
    alpha2: 'JE',
    alpha3: 'JEY',
    name: 'Jersey',
    numeric: 832
  },
  {
    alpha2: 'IM',
    alpha3: 'IMN',
    name: 'Isle Of Man',
    numeric: 833
  },
  {
    alpha2: 'TZ',
    alpha3: 'TZA',
    name: 'Tanzania, United Republic Of',
    numeric: 834
  },
  {
    alpha2: 'US',
    alpha3: 'USA',
    name: 'United States',
    numeric: 840
  },
  {
    alpha2: 'VI',
    alpha3: 'VIR',
    name: 'Virgin Islands (US)',
    numeric: 850
  },
  {
    alpha2: 'BF',
    alpha3: 'BFA',
    name: 'Burkina Faso',
    numeric: 854
  },
  {
    alpha2: 'UY',
    alpha3: 'URY',
    name: 'Uruguay',
    numeric: 858
  },
  {
    alpha2: 'UZ',
    alpha3: 'UZB',
    name: 'Uzbekistan',
    numeric: 860
  },
  {
    alpha2: 'VE',
    alpha3: 'VEN',
    name: 'Venezuela',
    numeric: 862
  },
  {
    alpha2: 'WF',
    alpha3: 'WLF',
    name: 'Wallis And Futuna',
    numeric: 876
  },
  {
    alpha2: 'WS',
    alpha3: 'WSM',
    name: 'Samoa',
    numeric: 882
  },
  {
    alpha2: 'YE',
    alpha3: 'YEM',
    name: 'Yemen',
    numeric: 887
  },
  {
    alpha2: 'ZM',
    alpha3: 'ZMB',
    name: 'Zambia',
    numeric: 894
  }
];

Object.defineProperty(module.exports, 'index', {
  get: function () { return index; },
  set: function () { throw new TypeError('Index is immutable'); },
  configurable: false,
  enumerable: false
});
