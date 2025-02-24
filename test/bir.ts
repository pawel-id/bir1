import t from 'tap'
import Bir, { BirError } from '../src/index.js'

t.test('search by REGON for example company', async (t) => {
  const bir = new Bir()
  const result = await bir.search({ regon: '012100784' })
  t.match(result, { Nazwa: 'ORANGE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('search by NIP for example company', async (t) => {
  const bir = new Bir()
  const result = await bir.search({ nip: '5261040567' })
  t.match(result, { Nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('search by KRS for example company', async (t) => {
  const bir = new Bir()
  const result = await bir.search({ krs: '0000391193' })
  t.match(result, { Nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('search fail for non existing company', async (t) => {
  const bir = new Bir()
  const searchNotExisting = async () =>
    await bir.search({ regon: 'notExisting' })
  try {
    await searchNotExisting()
    t.fail('Should throw error when searching for a non-existing company')
  } catch (err) {
    t.match(err, { message: 'No data found for the specified search criteria' })
    t.ok(err instanceof BirError, 'Error should be an instance of Error')
  }
  t.end()
})

t.test('report existing company', async (t) => {
  const bir = new Bir()
  const result = await bir.report({
    regon: '011417295',
    report: 'BIR11OsPrawna',
  })
  t.match(result, { praw_nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})
