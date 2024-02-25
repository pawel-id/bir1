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

```javascript
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

## API

### constructor

• **new Bir**(`options?`)

#### Parameters

| Name           | Type     | Notes              |
| -------------- | -------- | ------------------ |
| `options`      | `Object` |                    |
| `options.key?` | `string` | production API key |

Note: by default it connects to non production GUS database using public default
key. In order to connect to production database with current company data
provide a key granted by GUS.

### login

▸ **login**(): `Promise`<void\>

#### Returns

`Promise`<void\>

---

### search

▸ **search**(`query`): `Promise`<any\>

#### Parameters

| Name           | Type     | Notes |
| -------------- | -------- | ----- |
| `query`        | `Object` |       |
| `query.nip?`   | `string` |       |
| `query.regon?` | `string` |       |
| `query.krs?`   | `string` |       |

#### Returns

`Promise`<any\>

---

### report

▸ **report**(`query`): `Promise`<any\>

#### Parameters

| Name           | Type     | Notes                 |
| -------------- | -------- | --------------------- |
| `query`        | `Object` |                       |
| `query.regon`  | `string` |                       |
| `query.report` | `string` | e.g.: `BIR11OsPrawna` |

See BIR1 original documentation for more report types.

#### Returns

`Promise`<any\>

---

### value

▸ **value**(`value`): `Promise`<string\>

#### Parameters

| Name    | Type     |
| ------- | -------- |
| `value` | `string` |

#### Returns

`Promise`<string\>
