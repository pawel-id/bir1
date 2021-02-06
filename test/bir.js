const t = require('tap')
const bir = require('..')

t.test('search for example company', async (t) => {
  await bir.login()
  const result = await bir.search('012100784')
  t.match(result, {
    Nazwa: 'ORANGE POLSKA SPÓŁKA AKCYJNA',
  })
  t.end()
})
