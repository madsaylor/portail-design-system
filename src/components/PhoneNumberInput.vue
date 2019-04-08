<template>
  <div class="vue-tel-input" :class="{ disabled: disabled }">
    <div
      class="dropdown"
      @click="toggleDropdown"
      v-click-outside="clickedOutside"
      :class="{ open: open }"
      @keydown.native="keyboardNav"
      tabindex="0"
      @keydown.native.esc="reset"
    >
      <span class="selection">
        <div class="iti-flag" v-if="enabledFlags" :class="activeCountry.iso2.toLowerCase()"></div>
        <span class="country-code" v-if="enabledCountryCode">+{{ activeCountry.dialCode }}</span>
        <span class="dropdown-arrow">{{ open ? '▲' : '▼' }}</span>
      </span>
      <ul v-show="open" ref="list">
        <li
          class="dropdown-item"
          v-for="(pb, index) in sortedCountries"
          :key="pb.iso2 + (pb.preferred ? '-preferred' : '')"
          @click="choose(pb)"
          :class="getItemClass(index, pb.iso2)"
          @mousemove="selectedIndex = index"
        >
          <div class="iti-flag" v-if="enabledFlags" :class="pb.iso2.toLowerCase()"></div>
          <strong>{{ pb.name }}</strong>
          <span v-if="dropdownOptions && !dropdownOptions.disabledDialCode">+{{ pb.dialCode }}</span>
        </li>
      </ul>
    </div>
    <input
      ref="input"
      v-model="phone"
      type="tel"
      :placeholder="placeholder"
      :state="state"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      :name="name"
      :class="inputClasses"
      :maxlength="maxLen"
      @blur="onBlur"
      @input="onInput"
    >
  </div>
</template>

<script>
import { formatNumber, AsYouType, isValidNumber } from 'libphonenumber-js';

const countriesArray = [
  [
    'Afghanistan (‫افغانستان‬‎)',
    'af',
    '93',
  ],
  [
    'Albania (Shqipëri)',
    'al',
    '355',
  ],
  [
    'Algeria (‫الجزائر‬‎)',
    'dz',
    '213',
  ],
  [
    'American Samoa',
    'as',
    '1684',
  ],
  [
    'Andorra',
    'ad',
    '376',
  ],
  [
    'Angola',
    'ao',
    '244',
  ],
  [
    'Anguilla',
    'ai',
    '1264',
  ],
  [
    'Antigua and Barbuda',
    'ag',
    '1268',
  ],
  [
    'Argentina',
    'ar',
    '54',
  ],
  [
    'Armenia (Հայաստան)',
    'am',
    '374',
  ],
  [
    'Aruba',
    'aw',
    '297',
  ],
  [
    'Australia',
    'au',
    '61',
    0,
  ],
  [
    'Austria (Österreich)',
    'at',
    '43',
  ],
  [
    'Azerbaijan (Azərbaycan)',
    'az',
    '994',
  ],
  [
    'Bahamas',
    'bs',
    '1242',
  ],
  [
    'Bahrain (‫البحرين‬‎)',
    'bh',
    '973',
  ],
  [
    'Bangladesh (বাংলাদেশ)',
    'bd',
    '880',
  ],
  [
    'Barbados',
    'bb',
    '1246',
  ],
  [
    'Belarus (Беларусь)',
    'by',
    '375',
  ],
  [
    'Belgium (België)',
    'be',
    '32',
  ],
  [
    'Belize',
    'bz',
    '501',
  ],
  [
    'Benin (Bénin)',
    'bj',
    '229',
  ],
  [
    'Bermuda',
    'bm',
    '1441',
  ],
  [
    'Bhutan (འབྲུག)',
    'bt',
    '975',
  ],
  [
    'Bolivia',
    'bo',
    '591',
  ],
  [
    'Bosnia and Herzegovina (Босна и Херцеговина)',
    'ba',
    '387',
  ],
  [
    'Botswana',
    'bw',
    '267',
  ],
  [
    'Brazil (Brasil)',
    'br',
    '55',
  ],
  [
    'British Indian Ocean Territory',
    'io',
    '246',
  ],
  [
    'British Virgin Islands',
    'vg',
    '1284',
  ],
  [
    'Brunei',
    'bn',
    '673',
  ],
  [
    'Bulgaria (България)',
    'bg',
    '359',
  ],
  [
    'Burkina Faso',
    'bf',
    '226',
  ],
  [
    'Burundi (Uburundi)',
    'bi',
    '257',
  ],
  [
    'Cambodia (កម្ពុជា)',
    'kh',
    '855',
  ],
  [
    'Cameroon (Cameroun)',
    'cm',
    '237',
  ],
  [
    'Canada',
    'ca',
    '1',
    1,
    ['204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416', '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587', '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807', '819', '825', '867', '873', '902', '905'],
  ],
  [
    'Cape Verde (Kabu Verdi)',
    'cv',
    '238',
  ],
  [
    'Caribbean Netherlands',
    'bq',
    '599',
    1,
  ],
  [
    'Cayman Islands',
    'ky',
    '1345',
  ],
  [
    'Central African Republic (République centrafricaine)',
    'cf',
    '236',
  ],
  [
    'Chad (Tchad)',
    'td',
    '235',
  ],
  [
    'Chile',
    'cl',
    '56',
  ],
  [
    'China (中国)',
    'cn',
    '86',
  ],
  [
    'Christmas Island',
    'cx',
    '61',
    2,
  ],
  [
    'Cocos (Keeling) Islands',
    'cc',
    '61',
    1,
  ],
  [
    'Colombia',
    'co',
    '57',
  ],
  [
    'Comoros (‫جزر القمر‬‎)',
    'km',
    '269',
  ],
  [
    'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
    'cd',
    '243',
  ],
  [
    'Congo (Republic) (Congo-Brazzaville)',
    'cg',
    '242',
  ],
  [
    'Cook Islands',
    'ck',
    '682',
  ],
  [
    'Costa Rica',
    'cr',
    '506',
  ],
  [
    'Côte d’Ivoire',
    'ci',
    '225',
  ],
  [
    'Croatia (Hrvatska)',
    'hr',
    '385',
  ],
  [
    'Cuba',
    'cu',
    '53',
  ],
  [
    'Curaçao',
    'cw',
    '599',
    0,
  ],
  [
    'Cyprus (Κύπρος)',
    'cy',
    '357',
  ],
  [
    'Czech Republic (Česká republika)',
    'cz',
    '420',
  ],
  [
    'Denmark (Danmark)',
    'dk',
    '45',
  ],
  [
    'Djibouti',
    'dj',
    '253',
  ],
  [
    'Dominica',
    'dm',
    '1767',
  ],
  [
    'Dominican Republic (República Dominicana)',
    'do',
    '1',
    2,
    ['809', '829', '849'],
  ],
  [
    'Ecuador',
    'ec',
    '593',
  ],
  [
    'Egypt (‫مصر‬‎)',
    'eg',
    '20',
  ],
  [
    'El Salvador',
    'sv',
    '503',
  ],
  [
    'Equatorial Guinea (Guinea Ecuatorial)',
    'gq',
    '240',
  ],
  [
    'Eritrea',
    'er',
    '291',
  ],
  [
    'Estonia (Eesti)',
    'ee',
    '372',
  ],
  [
    'Ethiopia',
    'et',
    '251',
  ],
  [
    'Falkland Islands (Islas Malvinas)',
    'fk',
    '500',
  ],
  [
    'Faroe Islands (Føroyar)',
    'fo',
    '298',
  ],
  [
    'Fiji',
    'fj',
    '679',
  ],
  [
    'Finland (Suomi)',
    'fi',
    '358',
    0,
  ],
  [
    'France',
    'fr',
    '33',
  ],
  [
    'French Guiana (Guyane française)',
    'gf',
    '594',
  ],
  [
    'French Polynesia (Polynésie française)',
    'pf',
    '689',
  ],
  [
    'Gabon',
    'ga',
    '241',
  ],
  [
    'Gambia',
    'gm',
    '220',
  ],
  [
    'Georgia (საქართველო)',
    'ge',
    '995',
  ],
  [
    'Germany (Deutschland)',
    'de',
    '49',
  ],
  [
    'Ghana (Gaana)',
    'gh',
    '233',
  ],
  [
    'Gibraltar',
    'gi',
    '350',
  ],
  [
    'Greece (Ελλάδα)',
    'gr',
    '30',
  ],
  [
    'Greenland (Kalaallit Nunaat)',
    'gl',
    '299',
  ],
  [
    'Grenada',
    'gd',
    '1473',
  ],
  [
    'Guadeloupe',
    'gp',
    '590',
    0,
  ],
  [
    'Guam',
    'gu',
    '1671',
  ],
  [
    'Guatemala',
    'gt',
    '502',
  ],
  [
    'Guernsey',
    'gg',
    '44',
    1,
  ],
  [
    'Guinea (Guinée)',
    'gn',
    '224',
  ],
  [
    'Guinea-Bissau (Guiné Bissau)',
    'gw',
    '245',
  ],
  [
    'Guyana',
    'gy',
    '592',
  ],
  [
    'Haiti',
    'ht',
    '509',
  ],
  [
    'Honduras',
    'hn',
    '504',
  ],
  [
    'Hong Kong (香港)',
    'hk',
    '852',
  ],
  [
    'Hungary (Magyarország)',
    'hu',
    '36',
  ],
  [
    'Iceland (Ísland)',
    'is',
    '354',
  ],
  [
    'India (भारत)',
    'in',
    '91',
  ],
  [
    'Indonesia',
    'id',
    '62',
  ],
  [
    'Iran (‫ایران‬‎)',
    'ir',
    '98',
  ],
  [
    'Iraq (‫العراق‬‎)',
    'iq',
    '964',
  ],
  [
    'Ireland',
    'ie',
    '353',
  ],
  [
    'Isle of Man',
    'im',
    '44',
    2,
  ],
  [
    'Israel (‫ישראל‬‎)',
    'il',
    '972',
  ],
  [
    'Italy (Italia)',
    'it',
    '39',
    0,
  ],
  [
    'Jamaica',
    'jm',
    '1876',
  ],
  [
    'Japan (日本)',
    'jp',
    '81',
  ],
  [
    'Jersey',
    'je',
    '44',
    3,
  ],
  [
    'Jordan (‫الأردن‬‎)',
    'jo',
    '962',
  ],
  [
    'Kazakhstan (Казахстан)',
    'kz',
    '7',
    1,
  ],
  [
    'Kenya',
    'ke',
    '254',
  ],
  [
    'Kiribati',
    'ki',
    '686',
  ],
  [
    'Kosovo',
    'xk',
    '383',
  ],
  [
    'Kuwait (‫الكويت‬‎)',
    'kw',
    '965',
  ],
  [
    'Kyrgyzstan (Кыргызстан)',
    'kg',
    '996',
  ],
  [
    'Laos (ລາວ)',
    'la',
    '856',
  ],
  [
    'Latvia (Latvija)',
    'lv',
    '371',
  ],
  [
    'Lebanon (‫لبنان‬‎)',
    'lb',
    '961',
  ],
  [
    'Lesotho',
    'ls',
    '266',
  ],
  [
    'Liberia',
    'lr',
    '231',
  ],
  [
    'Libya (‫ليبيا‬‎)',
    'ly',
    '218',
  ],
  [
    'Liechtenstein',
    'li',
    '423',
  ],
  [
    'Lithuania (Lietuva)',
    'lt',
    '370',
  ],
  [
    'Luxembourg',
    'lu',
    '352',
  ],
  [
    'Macau (澳門)',
    'mo',
    '853',
  ],
  [
    'Macedonia (FYROM) (Македонија)',
    'mk',
    '389',
  ],
  [
    'Madagascar (Madagasikara)',
    'mg',
    '261',
  ],
  [
    'Malawi',
    'mw',
    '265',
  ],
  [
    'Malaysia',
    'my',
    '60',
  ],
  [
    'Maldives',
    'mv',
    '960',
  ],
  [
    'Mali',
    'ml',
    '223',
  ],
  [
    'Malta',
    'mt',
    '356',
  ],
  [
    'Marshall Islands',
    'mh',
    '692',
  ],
  [
    'Martinique',
    'mq',
    '596',
  ],
  [
    'Mauritania (‫موريتانيا‬‎)',
    'mr',
    '222',
  ],
  [
    'Mauritius (Moris)',
    'mu',
    '230',
  ],
  [
    'Mayotte',
    'yt',
    '262',
    1,
  ],
  [
    'Mexico (México)',
    'mx',
    '52',
  ],
  [
    'Micronesia',
    'fm',
    '691',
  ],
  [
    'Moldova (Republica Moldova)',
    'md',
    '373',
  ],
  [
    'Monaco',
    'mc',
    '377',
  ],
  [
    'Mongolia (Монгол)',
    'mn',
    '976',
  ],
  [
    'Montenegro (Crna Gora)',
    'me',
    '382',
  ],
  [
    'Montserrat',
    'ms',
    '1664',
  ],
  [
    'Morocco (‫المغرب‬‎)',
    'ma',
    '212',
    0,
  ],
  [
    'Mozambique (Moçambique)',
    'mz',
    '258',
  ],
  [
    'Myanmar (Burma) (မြန်မာ)',
    'mm',
    '95',
  ],
  [
    'Namibia (Namibië)',
    'na',
    '264',
  ],
  [
    'Nauru',
    'nr',
    '674',
  ],
  [
    'Nepal (नेपाल)',
    'np',
    '977',
  ],
  [
    'Netherlands (Nederland)',
    'nl',
    '31',
  ],
  [
    'New Caledonia (Nouvelle-Calédonie)',
    'nc',
    '687',
  ],
  [
    'New Zealand',
    'nz',
    '64',
  ],
  [
    'Nicaragua',
    'ni',
    '505',
  ],
  [
    'Niger (Nijar)',
    'ne',
    '227',
  ],
  [
    'Nigeria',
    'ng',
    '234',
  ],
  [
    'Niue',
    'nu',
    '683',
  ],
  [
    'Norfolk Island',
    'nf',
    '672',
  ],
  [
    'North Korea (조선 민주주의 인민 공화국)',
    'kp',
    '850',
  ],
  [
    'Northern Mariana Islands',
    'mp',
    '1670',
  ],
  [
    'Norway (Norge)',
    'no',
    '47',
    0,
  ],
  [
    'Oman (‫عُمان‬‎)',
    'om',
    '968',
  ],
  [
    'Pakistan (‫پاکستان‬‎)',
    'pk',
    '92',
  ],
  [
    'Palau',
    'pw',
    '680',
  ],
  [
    'Palestine (‫فلسطين‬‎)',
    'ps',
    '970',
  ],
  [
    'Panama (Panamá)',
    'pa',
    '507',
  ],
  [
    'Papua New Guinea',
    'pg',
    '675',
  ],
  [
    'Paraguay',
    'py',
    '595',
  ],
  [
    'Peru (Perú)',
    'pe',
    '51',
  ],
  [
    'Philippines',
    'ph',
    '63',
  ],
  [
    'Poland (Polska)',
    'pl',
    '48',
  ],
  [
    'Portugal',
    'pt',
    '351',
  ],
  [
    'Puerto Rico',
    'pr',
    '1',
    3,
    ['787', '939'],
  ],
  [
    'Qatar (‫قطر‬‎)',
    'qa',
    '974',
  ],
  [
    'Réunion (La Réunion)',
    're',
    '262',
    0,
  ],
  [
    'Romania (România)',
    'ro',
    '40',
  ],
  [
    'Russia (Россия)',
    'ru',
    '7',
    0,
  ],
  [
    'Rwanda',
    'rw',
    '250',
  ],
  [
    'Saint Barthélemy',
    'bl',
    '590',
    1,
  ],
  [
    'Saint Helena',
    'sh',
    '290',
  ],
  [
    'Saint Kitts and Nevis',
    'kn',
    '1869',
  ],
  [
    'Saint Lucia',
    'lc',
    '1758',
  ],
  [
    'Saint Martin (Saint-Martin (partie française))',
    'mf',
    '590',
    2,
  ],
  [
    'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
    'pm',
    '508',
  ],
  [
    'Saint Vincent and the Grenadines',
    'vc',
    '1784',
  ],
  [
    'Samoa',
    'ws',
    '685',
  ],
  [
    'San Marino',
    'sm',
    '378',
  ],
  [
    'São Tomé and Príncipe (São Tomé e Príncipe)',
    'st',
    '239',
  ],
  [
    'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
    'sa',
    '966',
  ],
  [
    'Senegal (Sénégal)',
    'sn',
    '221',
  ],
  [
    'Serbia (Србија)',
    'rs',
    '381',
  ],
  [
    'Seychelles',
    'sc',
    '248',
  ],
  [
    'Sierra Leone',
    'sl',
    '232',
  ],
  [
    'Singapore',
    'sg',
    '65',
  ],
  [
    'Sint Maarten',
    'sx',
    '1721',
  ],
  [
    'Slovakia (Slovensko)',
    'sk',
    '421',
  ],
  [
    'Slovenia (Slovenija)',
    'si',
    '386',
  ],
  [
    'Solomon Islands',
    'sb',
    '677',
  ],
  [
    'Somalia (Soomaaliya)',
    'so',
    '252',
  ],
  [
    'South Africa',
    'za',
    '27',
  ],
  [
    'South Korea (대한민국)',
    'kr',
    '82',
  ],
  [
    'South Sudan (‫جنوب السودان‬‎)',
    'ss',
    '211',
  ],
  [
    'Spain (España)',
    'es',
    '34',
  ],
  [
    'Sri Lanka (ශ්‍රී ලංකාව)',
    'lk',
    '94',
  ],
  [
    'Sudan (‫السودان‬‎)',
    'sd',
    '249',
  ],
  [
    'Suriname',
    'sr',
    '597',
  ],
  [
    'Svalbard and Jan Mayen',
    'sj',
    '47',
    1,
  ],
  [
    'Swaziland',
    'sz',
    '268',
  ],
  [
    'Sweden (Sverige)',
    'se',
    '46',
  ],
  [
    'Switzerland (Schweiz)',
    'ch',
    '41',
  ],
  [
    'Syria (‫سوريا‬‎)',
    'sy',
    '963',
  ],
  [
    'Taiwan (台灣)',
    'tw',
    '886',
  ],
  [
    'Tajikistan',
    'tj',
    '992',
  ],
  [
    'Tanzania',
    'tz',
    '255',
  ],
  [
    'Thailand (ไทย)',
    'th',
    '66',
  ],
  [
    'Timor-Leste',
    'tl',
    '670',
  ],
  [
    'Togo',
    'tg',
    '228',
  ],
  [
    'Tokelau',
    'tk',
    '690',
  ],
  [
    'Tonga',
    'to',
    '676',
  ],
  [
    'Trinidad and Tobago',
    'tt',
    '1868',
  ],
  [
    'Tunisia (‫تونس‬‎)',
    'tn',
    '216',
  ],
  [
    'Turkey (Türkiye)',
    'tr',
    '90',
  ],
  [
    'Turkmenistan',
    'tm',
    '993',
  ],
  [
    'Turks and Caicos Islands',
    'tc',
    '1649',
  ],
  [
    'Tuvalu',
    'tv',
    '688',
  ],
  [
    'U.S. Virgin Islands',
    'vi',
    '1340',
  ],
  [
    'Uganda',
    'ug',
    '256',
  ],
  [
    'Ukraine (Україна)',
    'ua',
    '380',
  ],
  [
    'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
    'ae',
    '971',
  ],
  [
    'United Kingdom',
    'gb',
    '44',
    0,
  ],
  [
    'United States',
    'us',
    '1',
    0,
  ],
  [
    'Uruguay',
    'uy',
    '598',
  ],
  [
    'Uzbekistan (Oʻzbekiston)',
    'uz',
    '998',
  ],
  [
    'Vanuatu',
    'vu',
    '678',
  ],
  [
    'Vatican City (Città del Vaticano)',
    'va',
    '39',
    1,
  ],
  [
    'Venezuela',
    've',
    '58',
  ],
  [
    'Vietnam (Việt Nam)',
    'vn',
    '84',
  ],
  [
    'Wallis and Futuna (Wallis-et-Futuna)',
    'wf',
    '681',
  ],
  [
    'Western Sahara (‫الصحراء الغربية‬‎)',
    'eh',
    '212',
    1,
  ],
  [
    'Yemen (‫اليمن‬‎)',
    'ye',
    '967',
  ],
  [
    'Zambia',
    'zm',
    '260',
  ],
  [
    'Zimbabwe',
    'zw',
    '263',
  ],
  [
    'Åland Islands',
    'ax',
    '358',
    1,
  ],
];

const allCountries = countriesArray.map(country => ({
  name: country[0],
  iso2: country[1].toUpperCase(),
  dialCode: country[2],
  priority: country[3] || 0,
  areaCodes: country[4] || null,
}));


export default {
  name: 'phone-numbuer-input',
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: 'Enter a phone number',
    },
    disabledFetchingCountry: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledFormatting: {
      type: Boolean,
      default: false,
    },
    invalidMsg: {
      default: '',
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    defaultCountry: {
      // Default country code, ie: 'AU'
      // Will override the current country of user
      type: String,
      default: '',
    },
    enabledCountryCode: {
      type: Boolean,
      default: false,
    },
    enabledFlags: {
      type: Boolean,
      default: true
    },
    preferredCountries: {
      type: Array,
      default: () => [],
    },
    onlyCountries: {
      type: Array,
      default: () => [],
    },
    ignoredCountries: {
      type: Array,
      default: () => [],
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    name: {
      type: String,
      default: 'telephone',
    },
    inputClasses: {
      type: String,
      default: '',
    },
    dropdownOptions: {
      type: Object,
      default: () => ({}),
    },
    inputOptions: {
      type: Object,
      default: () => ({}),
    },
    maxLen: {
      type: Number,
      default: 25,
    },
  },
  mounted() {
    this.initializeCountry();
  },
  created() {
    if (this.value) {
      this.phone = this.value
    }
  },
  data() {
    return {
      phone: '',
      activeCountry: { iso2: '' },
      open: false,
      selectedIndex: null,
      typeToFindInput: '',
      typeToFindTimer: null,
    };
  },
  computed: {
    mode() {
      if (!this.phone) {
        return '';
      }
      if (this.phone[0] === '+') {
        return 'code';
      }
      if (this.phone[0] === '0') {
        return 'prefix';
      }
      return 'normal';
    },
    filteredCountries() {
      // List countries after filtered
      if (this.onlyCountries.length) {
        return this.getCountries(this.onlyCountries);
      }
      if (this.ignoredCountries.length) {
        return allCountries.filter(({ iso2 }) =>
          !this.ignoredCountries.includes(iso2.toUpperCase()) &&
          !this.ignoredCountries.includes(iso2.toLowerCase()))
      }
      return allCountries;
    },
    sortedCountries() {
      // Sort the list countries: from preferred countries to all countries
      const preferredCountries = this.getCountries(this.preferredCountries)
        .map(country => ({ ...country, preferred: true }));
      return [...preferredCountries, ...this.filteredCountries];
    },
    formattedResult() {
      // Calculate phone number based on mode
      if (!this.mode || !this.filteredCountries) {
        return '';
      }
      let phone = this.phone;
      if (this.mode === 'code') {
        // If user manually type the country code
        const formatter = new AsYouType();// eslint-disable-line
        formatter.input(this.phone);
        // Find inputted country in the countries list
        // this.activeCountry = this.findCountry(formatter.country) || this.activeCountry;
      } else if (this.mode === 'prefix') {
        phone = this.phone.slice(1);
      }
      if (this.disabledFormatting) {
        return this.phone;
      }
      return formatNumber(phone, this.activeCountry && this.activeCountry.iso2, 'International');
    },
    state() {
      return isValidNumber(this.formattedResult, this.activeCountry && this.activeCountry.iso2);
    },
    response() {
      // If it is a valid number, returns the formatted value
      // Otherwise returns what it is
      const response = {
        number: this.state ? this.formattedResult : this.phone,
        isValid: this.state,
        country: this.activeCountry,
      }
      // If formatting to the input is disabled, try to return the formatted value to its parent
      if (this.disabledFormatting) {
        Object.assign(response, {
          formattedNumber: formatNumber(this.phone, this.activeCountry && this.activeCountry.iso2, 'International')
        })
      }
      return response;
    },
  },
  watch: {
    state(value) {
      if (value && this.mode !== 'prefix') {
        // If mode is 'prefix', keep the number as user typed,
        // Otherwise format it
        this.phone = this.formattedResult;
      }
      this.$emit('onValidate', this.response);
    },
    value() {
      this.phone = this.value;
    },
  },
  methods: {
    initializeCountry() {
      /**
       * 1. Use default country if passed from parent
       */
      if (this.defaultCountry) {
        const defaultCountry = this.findCountry(this.defaultCountry);
        if (defaultCountry) {
          this.activeCountry = defaultCountry;
          return;
        }
      }
      /**
       * 2. Use the first country from preferred list (if available) or all countries list
       */
      this.activeCountry = this.findCountry(this.preferredCountries[0]) || this.filteredCountries[0];
    },
    /**
     * Get the list of countries from the list of iso2 code
     */
    getCountries(list = []) {
      return list
        .map(countryCode => this.findCountry(countryCode))
        .filter(Boolean);
    },
    findCountry(iso = '') {
      return allCountries.find(country => country.iso2 === iso.toUpperCase());
    },
    getItemClass(index, iso2) {
      const highlighted = this.selectedIndex === index;
      const lastPreferred = index === this.preferredCountries.length - 1;
      const preferred = !!~this.preferredCountries.map(c => c.toUpperCase()).indexOf(iso2);
      return {
        highlighted,
        'last-preferred': lastPreferred,
        preferred,
      };
    },
    choose(country) {
      this.activeCountry = country;
      if (this.inputOptions && this.inputOptions.showDialCode && country) {
        this.phone = '+' + country.dialCode;
      }
      this.$emit('onInput', this.response);
    },
    onInput() {
      this.$refs.input.setCustomValidity(this.response.isValid ? '' : this.invalidMsg);
      // Emit input event in case v-model is used in the parent
      this.$emit('input', this.response.number);
      // Emit the response, includes phone, validity and country
      this.$emit('onInput', this.response);
    },
    onBlur() {
      this.$emit('onBlur');
    },
    toggleDropdown() {
      if (this.disabled) {
        return;
      }
      this.open = !this.open;
    },
    clickedOutside() {
      this.open = false;
    },
    keyboardNav(e) {
      if (e.keyCode === 40) {
        // down arrow
        this.open = true;
        if (this.selectedIndex === null) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex = Math.min(this.sortedCountries.length - 1, this.selectedIndex + 1);
        }
        let selEle = this.$refs.list.children[this.selectedIndex];
        if (selEle.offsetTop + selEle.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight)
          this.$refs.list.scrollTop = selEle.offsetTop - this.$refs.list.clientHeight + selEle.clientHeight;
      } else if (e.keyCode === 38) {
        // up arrow
        this.open = true;
        if (this.selectedIndex === null) {
          this.selectedIndex = this.sortedCountries.length - 1;
        } else {
          this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        }
        let selEle = this.$refs.list.children[this.selectedIndex];
        if (selEle.offsetTop < this.$refs.list.scrollTop)
          this.$refs.list.scrollTop = selEle.offsetTop;
      } else if (e.keyCode === 13) {
        // enter key
        if (this.selectedIndex !== null) {
          this.choose(this.sortedCountries[this.selectedIndex]);
        }
        this.open = !this.open;
      } else {
        // typing a country's name
        this.typeToFindInput += e.key;
        clearTimeout(this.typeToFindTimer);
        this.typeToFindTimer = setTimeout(() => {
          this.typeToFindInput = '';
        }, 700);
        // don't include preferred countries so we jump to the right place in the alphabet
        let typedCountryI = this.sortedCountries.slice(this.preferredCountries.length).findIndex(c => c.name.toLowerCase().startsWith(this.typeToFindInput));
        if (~typedCountryI) {
          this.selectedIndex = this.preferredCountries.length + typedCountryI;
          let selEle = this.$refs.list.children[this.selectedIndex];
          if (selEle.offsetTop < this.$refs.list.scrollTop || selEle.offsetTop + selEle.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight) {
            this.$refs.list.scrollTop = selEle.offsetTop - this.$refs.list.clientHeight / 2;
          }
        }
      }
    },
    reset() {
      this.selectedIndex = this.sortedCountries.map(c => c.iso2).indexOf(this.activeCountry.iso2);
      this.open = false;
    },
  },
  directives: {
    'click-outside': {
      bind: function (el, binding) {
        // Define Handler and cache it on the element
        var bubble = binding.modifiers.bubble;
        var handler = function (e) {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        };
        el.__vueClickOutside__ = handler;
        // add Event Listeners
        document.addEventListener('click', handler)
      },
      unbind: function (el) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null
      }
    }
  },
}
</script>

<style src="./../flags/sprite.css"></style>
<style lang="less">
@import '../styles/vars';

li.last-preferred {
  border-bottom: @app-last-item-border;
}
.iti-flag {
  margin-right: @app-input-margin;
  margin-left: @app-input-margin;
}
.dropdown-item .iti-flag {
  display: inline-block;
  margin-right: @app-input-margin;
}
.selection {
  font-size: @selection-font-size;
  display: flex;
  align-items: center;
}
.vue-tel-input {
  border-radius: @tel-input-radius;
  display: flex;
  border: @tel-input-border;
  text-align: left;
}
.vue-tel-input:focus-within {
  border-color: @color-primary;
}
input {
  border: none;
  border-radius: @input-border-radius;
  width: 100%;
  outline: none;
  padding-left: @phone-input-padding;
}
ul {
  z-index: 1;
  padding: 0;
  margin: 0;
  text-align: left;
  list-style: none;
  max-height: @drop-panel-max-height;
  overflow-y: scroll;
  position: absolute;
  top: 33px;
  left: -1px;
  background-color: @color-gray-100;
  border: @drop-panel-border;
  width: @drop-panel-width;
}
.dropdown {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
  padding: @phone-input-padding;
  cursor: pointer;
}
.dropdown.open {
  background-color: @color-gray-200;
}
.dropdown:hover {
  background-color: @color-gray-200;
}
.country-code {
  color: @color-gray-500;
}
.dropdown-arrow {
  transform: scaleY(0.5);
  display: inline-block;
  color: @color-gray-500;
}
.dropdown-item {
  cursor: pointer;
  padding: @dropdown-item-padding;
}
.dropdown-item.highlighted {
  background-color: @color-gray-200;
}
.dropdown-menu.show {
  max-height: @drop-menu-max-height;
  overflow: scroll;
}
.vue-tel-input.disabled .selection,
.vue-tel-input.disabled .dropdown,
.vue-tel-input.disabled input {
  cursor: no-drop;
}
</style>