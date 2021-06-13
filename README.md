# BIR1 - GUS REGON client

Simple node.js client library to
[Statistics Poland](https://en.wikipedia.org/wiki/Statistics_Poland) (GUS)
information about companies
[api REGON](https://api.stat.gov.pl/Home/RegonApi?lang=en)

## Install

```bash
npm i bir1
```

## Usage

```javascript
import Bir from 'bir1'

const bir = new Bir()
await bir.login()
console.log(await bir.search({ nip: '5261040567' }))

/*
output: 

{
  regon: '011417295',
  nip: '5261040567',
  statusNip: null,
  nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA',
  wojewodztwo: 'MAZOWIECKIE',
  powiat: 'Warszawa',
  gmina: 'Mokotów',
  miejscowosc: 'Warszawa',
  kodPocztowy: '02-674',
  ulica: 'ul. Marynarska',
  nrNieruchomosci: '12',
  nrLokalu: null,
  typ: 'P',
  silosID: '6',
  dataZakonczeniaDzialalnosci: null,
  miejscowoscPoczty: 'Warszawa'
}
*/
```

## API

### constructor

• **new Bir**(`options?`)

#### Parameters

| Name           | Type     | Notes              |
| -------------- | -------- | ------------------ |
| `options`      | `Object` |                    |
| `options.key?` | `string` | production API key |

Note: By default it connects to non production database using public default
key. In order to connect to production database with current company data
provide your key.

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
