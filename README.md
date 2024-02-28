# BIR1 - GUS REGON client

Simple node.js client library to provide information about authorized government
administration authorities, regional authorities, government institutions and to
commercial entities. It connects to
[REGON service](https://api.stat.gov.pl/Home/RegonApi?lang=en) and returns data
in JSON format. Data returned from original SOAP messages are parsed to JSON. By
default the following rules apply:

- the structure of the original SOAP message is preserved (see details in
  [documentation](https://api.stat.gov.pl/Content/files/regon/GUS-Regon-UslugaBIR11-dokumentacja_v1.32.zip))
- keys are left intact (GUS use mix of snake_case and camelCase)
- values are converted to strings. Empty values are left as empty strings

Why BIR1 was choosen as package name? BIR1 (polish: "Baza Internetowa REGON") is
an internal name of the API service maintained by GUS.

Implementation follows good practices of modern node.js. It is ESM module
written in TypeScript with carefully crafted type definitions. Enjoy!

## Install

```bash
npm install bir1
```

## Quick start

```js
import Bir from 'bir1'

const bir = new Bir()
console.log(await bir.search({ nip: '5261040567' }))
// output:
// {
// Regon: '012100784',
// Nip: '5260250995',
// StatusNip: '',
// Nazwa: 'ORANGE POLSKA SPÓŁKA AKCYJNA',
// Wojewodztwo: 'MAZOWIECKIE',
// Powiat: 'm. st. Warszawa',
// Gmina: 'Ochota',
// Miejscowosc: 'Warszawa',
// KodPocztowy: '02-326',
//   ...
// }
```

See more examples [here](./examples).

## API

### Class: Bir

Class Bir provides access to REGON API

#### Constructor

`new Bir(options?): Bir`

Create a new Bir instance.

parameters:

- `options?: Object` - options object
- `options.key?: string` - API key. If this is not provided, the internally
  stored public API key is used to access non-production GUS database. It allows
  quick start, however non-production database contains old and anonymized data.
  Providing GUS provided key connects to the production database.
- `options.normalizeFn?: (obj: any) => any` Function to modify response to a
  more convenient format. Every JSON object extracted from SOAP message is
  passed to this function. It should return modified object. E.g. it is possible
  provide a function to to convert keys to camelCase or convert some values to
  numbers.

#### Methods

`login(): Promise<void>`

Login to the API (method: Zaloguj)

This method uses the key provided in the constructor to login to the API. After
successful login, the session id (`sid`) is stored in class instance and used in
subsequent requests.

Starting from version 3.0 calling this method is optional as it is called
automatically.

---

`value(value): Promise<string>`

Get diagnostic information (method: GetValue)

parameters:

- `value` - value to retrieve. One of:
  - `StanDanych`
  - `KomunikatKod`
  - `KomunikatTresc`
  - `StatusSesji`
  - `StatusUslugi`
  - `KomunikatUslugi`

---

`search(query): Promise<any>`

Search (method: DaneSzukajPodmioty). Returns basic information about entity.

parameters:

- `query: Object` - search query param. One of:
  - `query.nip: string` - NIP number
  - `query.regon: string` - REGON number
  - `query.krs: string` - KRS number

example:

```js
import Bir from 'bir1'

const bir = new Bir()
console.log(await bir.search({ nip: '5261040567' }))
```

---

`report(query): Promise<any>`

Retrive report (method: DanePobierzPelnyRaport). Returns more detailed
information about entity depending on report type.

parameters:

- `query: Object`
- `query.regon: string` - REGON number
- `query.report` - report name. One of:
  - `PublDaneRaportFizycznaOsoba`
  - `PublDaneRaportDzialalnoscFizycznejCeidg`
  - `PublDaneRaportDzialalnoscFizycznejRolnicza`
  - `PublDaneRaportDzialalnoscFizycznejPozostala`
  - `PublDaneRaportDzialalnoscFizycznejWKrupgn`
  - `PublDaneRaportDzialalnosciFizycznej`
  - `PublDaneRaportLokalneFizycznej`
  - `PublDaneRaportLokalnaFizycznej`
  - `PublDaneRaportDzialalnosciLokalnejFizycznej`
  - `PublDaneRaportPrawna`
  - `PublDaneRaportDzialalnosciPrawnej`
  - `PublDaneRaportLokalnePrawnej`
  - `PublDaneRaportLokalnaPrawnej`
  - `PublDaneRaportDzialalnosciLokalnejPrawnej`
  - `PublDaneRaportWspolnicyPrawnej`
  - `PublDaneRaportTypJednostki`
  - `BIR11OsFizycznaDaneOgolne`
  - `BIR11OsFizycznaDzialalnoscCeidg`
  - `BIR11OsFizycznaDzialalnoscRolnicza`
  - `BIR11OsFizycznaDzialalnoscPozostala`
  - `BIR11OsFizycznaDzialalnoscSkreslonaDo20141108`
  - `BIR11OsFizycznaPkd`
  - `BIR11OsFizycznaListaJednLokalnych`
  - `BIR11JednLokalnaOsFizycznej`
  - `BIR11JednLokalnaOsFizycznejPkd`
  - `BIR11OsPrawna`
  - `BIR11OsPrawnaPkd`
  - `BIR11OsPrawnaListaJednLokalnych`
  - `BIR11JednLokalnaOsPrawnej`
  - `BIR11JednLokalnaOsPrawnejPkd`
  - `BIR11OsPrawnaSpCywilnaWspolnicy`
  - `BIR11TypPodmiotu`

example:

```js
import Bir from 'bir1'

const bir = new Bir()
console.log(
  await bir.report({ regon: '012100784', report: 'PublDaneRaportPrawna' })
)
```

---

`summary(query): Promise<any>`

Retrive summary report (method: DanePobierzRaportZbiorczy). Returns summary of
changes in database.

parameters:

- `query: Object`
- `query.date: string` - date in format YYYY-MM-DD not earlier than week before
- `query.report` - report name. One of:
  - `BIR11NowePodmiotyPrawneOrazDzialalnosciOsFizycznych`
  - `BIR11AktualizowanePodmiotyPrawneOrazDzialalnosciOsFizycznych`
  - `BIR11SkreslonePodmiotyPrawneOrazDzialalnosciOsFizycznych`
  - `BIR11NoweJednostkiLokalne`
  - `BIR11AktualizowaneJednostkiLokalne`
  - `BIR11SkresloneJednostkiLokalne`

---

`logout(): Promise<void>`

Logout (method: Wyloguj)

## Migrating from version 2.x to 3.x

Please note that starting from version 3.0 of that library the following
breaking changes were introduced:

1. the library is now pure ESM module (previously CJS)
2. the keys and values are returned 'as is' (previously they were processed)

   - the keys are left intact (previously they were lowercased and a bit
     trimmed)
   - the empty values are now returned as empty strings (previously they were
     returned as `undefined`)

   See further details in the source code of [legacy](src/normalize.ts)
   normalize function. This function can be used to preserve the old behavior as
   shown in the [example](examples/legacy.js).
