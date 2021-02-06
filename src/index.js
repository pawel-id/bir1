
const Bir = require('./bir')

;(async () => {
  const bir = new Bir()
  await bir.login()
  const result = await bir.search('012100784')
  console.log(JSON.stringify(result, null, 2))
})()
