const t = require('tap')
const bir = require('..')

t.test('search for example company', async (t) => {
  await bir.login()
  const result = await bir.search('012100784')
  t.match(result, { nazwa: 'ORANGE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('search fail for non existing company', async (t) => {
  await bir.login()
  const searchNotExisting = async () => await bir.search('notExisting')
  await t.rejects(searchNotExisting, {
    message: 'No data found for the specified search criteria',
  })
  t.end()
})
