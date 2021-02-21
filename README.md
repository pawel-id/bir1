# BIR1 - GUS REGON client #

Simple node.js client library to [Statistics
Poland](https://en.wikipedia.org/wiki/Statistics_Poland) (GUS) information about
companies [api REGON](https://api.stat.gov.pl/Home/RegonApi)

# install

```bash
npm i bir1
```

## usage

```javascript
const Bir = require('bir1')

const bir = new Bir()
await bir.login()
console.log(await bir.search({ nip: '5261040567' }))

/*
output: 

{
  regon: 11417295,
  nip: 5261040567,
  statusNip: '',
  nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA',
  wojewodztwo: 'MAZOWIECKIE',
  powiat: 'Warszawa',
  gmina: 'Mokotów',
  miejscowosc: 'Warszawa',
  kodPocztowy: '02-674',
  ulica: 'ul. Marynarska',
  nrNieruchomosci: 12,
  nrLokalu: '',
  typ: 'P',
  silosId: 6,
  dataZakonczeniaDzialalnosci: '',
  miejscowoscPoczty: 'Warszawa'
}
*/

```

By default it connects to non production database. In order to connect to
production to get most up to date company data provide your key as `new
Bir({key: 'aabc123def567'})` 
