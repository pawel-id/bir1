import t from 'tap'
import Bir from '../src/index'
import { legacyParseOptions } from '../src/xml'

const options = { parseOptions: legacyParseOptions } 

t.test('search by REGON for example company', async (t) => {
  const bir = new Bir(options)
  await bir.login()
  const result = await bir.search({ regon: '012100784' })
  t.match(result, { nazwa: 'ORANGE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('search by NIP for example company', async (t) => {
  const bir = new Bir(options)
  await bir.login()
  const result = await bir.search({ nip: '5261040567' })
  t.match(result, { nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('search by KRS for example company', async (t) => {
  const bir = new Bir(options)
  await bir.login()
  const result = await bir.search({ krs: '0000391193' })
  t.match(result, { nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('search fail for non existing company', async (t) => {
  const bir = new Bir(options)
  await bir.login()
  const searchNotExisting = async () =>
    await bir.search({ regon: 'notExisting' })
  await t.rejects(searchNotExisting, {
    message: 'No data found for the specified search criteria',
  })
  t.end()
})

t.test('report existing company', async (t) => {
  const bir = new Bir(options)
  await bir.login()
  const result = await bir.report({
    regon: '011417295',
    report: 'BIR11OsPrawna',
  })
  t.match(result, { nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})
