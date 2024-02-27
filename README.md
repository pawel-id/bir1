# BIR1 - GUS REGON client

Simple node.js client library to provide information about authorized government
administration authorities, regional authorities, government institutions and to
commercial entities. It connects to
[REGON service](https://api.stat.gov.pl/Home/RegonApi?lang=en) and returns data
in JSON format. Supports all BIR 1.0 and 1.1 API methods. Please refer to link
above to find documentation for more details.

BIR1 (polish: "Baza Internetowa REGON") is an internal name of the API service
(hence our package name).

Implementation follows best practices of modern node.js. It is ESM module
written in TypeScript with carefully crafted type definitions. Enjoy!

Data returned data from SOAP messages are parsed to JSON. By default the
following rules apply:

- keys are left intact (it is mixed snake_case and camelCase)
- values are converted to strings. Empty values are left as empty strings

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

see more examples in [examples](./examples) directory

## API

### Class: Bir

Class Bir provides access to REGON API

#### Constructor

`new Bir(options?): Bir`

Create a new Bir instance.

##### Parameters

- `options.key?: string` - API key. If this is not provided, the internally
  stored public API key is used to access non-production GUS database. It allows
  quick start, however non-production database contains old and anonymized data.
  Providing GUS provided key connects to the production database.
- `options.normalizeFn?: (obj: any) => any` Function to modify response to a
  more convenient format

#### Methods

##### login

`login(): Promise<void>`

Login to the API (method: Zaloguj)

This method uses the key provided in the constructor to login to the API. After
successful login, the session id (`sid`) is stored in class instance and used in
subsequent requests.

Starting from version 3.0 calling this method is optional as it is called
automatically.

---

##### value

`value(value): Promise<string>`

Get diagnostic information (method: GetValue)

###### Parameters

- `value` - value to retrieve. One of:
  - `StanDanych`
  - `KomunikatKod`
  - `KomunikatTresc`
  - `StatusSesji`
  - `StatusUslugi`
  - `KomunikatUslugi`

---

##### search

`search(query): Promise<any>`

Search (method: DaneSzukajPodmioty). Returns basic information about entity.

###### Parameters

- `query: Object` - search query param. One of:
  - `query.nip: string` - NIP number
  - `query.regon: string` - REGON number
  - `query.krs: string` - KRS number

---

##### report

`report(query): Promise<any>`

Retrive report (method: DanePobierzPelnyRaport). Returns more detailed
information about entity depending on report type.

###### Parameters

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

---

##### summary

`summary(query): Promise<any>`

Retrive summary report (method: DanePobierzRaportZbiorczy). Returns summary of
changes in database.

###### Parameters

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

##### logout

`logout(): Promise<void>`

Logout (method: Wyloguj)
