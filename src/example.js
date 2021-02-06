
const bir = require('./index')

;(async () => {
  await bir.login()
  console.log(await bir.search('012100784'))
  console.log(await bir.report('012100784'))
})()
