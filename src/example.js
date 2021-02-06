
const bir = require('./index')

;(async () => {
  await bir.login()
  const result = await bir.search('012100784')
  console.log(JSON.stringify(result, null, 2))
})()
