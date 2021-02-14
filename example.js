const bir = require('./dist')

;(async () => {
  try {
    await bir.login()
    // console.log('StanDanych: ', await bir.value('StanDanych'))
    console.log('StatusUslugi:', await bir.value('StatusUslugi'))
    console.log('KomunikatUslugi:', await bir.value('KomunikatUslugi'))
    console.log('StatusSesji:', await bir.value('StatusSesji'))
    console.log(await bir.search('012100784'))
    console.log(await bir.report('012100784a'))
  } catch (error) {
    console.log(error)
  }
})()
