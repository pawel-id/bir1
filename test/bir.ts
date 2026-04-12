import t from 'tap'
import Bir, { BirError } from '../src/index.js'
import {
  DanePobierzPelnyRaportNames,
  DanePobierzRaportZbiorczyNames,
} from '../src/types.js'

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

t.test('report existing company with BIR12', async (t) => {
  const bir = new Bir()
  const result = await bir.report({
    regon: '011417295',
    report: 'BIR12OsPrawna',
  })
  t.match(result, { praw_nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' })
  t.end()
})

t.test('BIR12 PKD report includes pkdWersja field', async (t) => {
  const bir = new Bir()
  const result = await bir.report({
    regon: '011417295',
    report: 'BIR12OsPrawnaPkd',
  })
  const entry = Array.isArray(result) ? result[0] : result
  t.ok(entry.praw_pkdWersja !== undefined, 'pkdWersja field should be present')
  t.end()
})

t.test('all DanePobierzPelnyRaport types are valid report names', async (t) => {
  const reports = DanePobierzPelnyRaportNames
  const bir = new Bir()
  await bir.login()
  // T-Mobile Polska S.A. — legal entity (Typ: P), same as other tests in this file
  const REGON_PRAWNA = '011417295'
  // Physical person entity (Typ: F) from the GUS test database. Randomly selected.
  const REGON_FIZYCZNA = '771504670'
  // These BIR11 reports return ErrorCode '5' on the Bir1 regardless of REGON
  // type, but return ErrorCode '4' (valid name, no data) on production.
  const testDbFalsePositives = new Set([
    'BIR11JednLokalnaOsFizycznejPkd',
    'BIR11JednLokalnaOsPrawnejPkd',
  ])
  for (const report of reports) {
    if (testDbFalsePositives.has(report)) continue
    const isFiz = /OsFizyczn|JednLokalnaOsFizycznej/.test(report)
    const regon = isFiz ? REGON_FIZYCZNA : REGON_PRAWNA
    try {
      await bir.report({ regon, report: report as any })
    } catch (err: any) {
      t.not(
        err?.response?.ErrorCode,
        '5',
        `${report} should be a valid report name`
      )
    }
  }
  t.end()
})

t.test(
  'all DanePobierzRaportZbiorczy types are valid report names',
  async (t) => {
    const reports = DanePobierzRaportZbiorczyNames
    const bir = new Bir()
    await bir.login()
    const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
    for (const report of reports) {
      try {
        await bir.summary({ date, report: report as any })
      } catch (err: any) {
        const code = err?.response?.ErrorCode
        t.not(code, '105', `${report} should be a valid report name`)
      }
    }
    t.end()
  }
)
