# BIR1 - GUS REGON client

Simple node.js client library to provide information about companies. It
connects to [REGON service](https://api.stat.gov.pl/Home/RegonApi?lang=en) and
returns data in JSON format. Supports all BIR 1.0 and 1.1 API methods.

BIR1 (polish: "Baza Internetowa REGON") is an internal name of the API service
(hence our package name).

It is written in TypeScript and provides type definitions.

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
//   regon: '011417295',
//   nip: '5261040567',
//   statusNip: '',
//   nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA',
//   wojewodztwo: 'MAZOWIECKIE',
//   powiat: 'Warszawa',
//   gmina: 'Mokotów',
//   miejscowosc: 'Warszawa',
//   kodPocztowy: '02-674',
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
