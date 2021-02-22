# BIR1 - GUS REGON client #

Simple node.js client library to [Statistics
Poland](https://en.wikipedia.org/wiki/Statistics_Poland) (GUS) information about
companies [api REGON](https://api.stat.gov.pl/Home/RegonApi?lang=en)

## install

```bash
npm i bir1
```

## usage

```javascript
const Bir = require('bir1')

(async () => {
  const bir = new Bir()
  await bir.login()
  console.log(await bir.search({ nip: '5261040567' }))
})()

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

By default it connects to non production database using public default key. In
order to connect to production database with current company data provide your
key like this `new Bir({ key: 'example123def567' })` 
