const Bir = require('bir1').default

/**
 * In order to get up to date data from production environment, you need to
 * provide your own key. Ask for it at https://api.stat.gov.pl/Home/RegonApi
 * This sample will work also without that key, but it will return old
 * non-updated data.
 */

const bir = new Bir({ key: process.env.KEY })

;(async () => {
  console.log('StanDanych: ', await bir.value('StanDanych'))
  console.log('StatusUslugi:', await bir.value('StatusUslugi'))
  console.log('KomunikatUslugi:', await bir.value('KomunikatUslugi'))
  console.log('StatusSesji:', await bir.value('StatusSesji'))
  console.log(await bir.search({ regon: '012100784' }))
  console.log(await bir.search({ nip: '5261040567' }))
  console.log(await bir.report({ regon: '011417295', report: 'BIR11OsPrawna' }))
})()
