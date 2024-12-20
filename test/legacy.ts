import t from 'tap'
import BirLegacy from 'bir1-legacy'
import Bir from '../src/index.ts'
import { legacy } from '../src/normalize.ts'

t.test(
  'new version with legacy normalize works the same as old one',
  async (t) => {
    const report = {
      regon: '010058960',
      report: 'BIR11OsPrawnaPkd' as const,
    }

    // Bir1 old version
    const birLegacy = new BirLegacy()
    await birLegacy.login()
    const resultLegacy = await birLegacy.report(report)

    // Bir1 new, but with legacy mode
    const birNew = new Bir({ normalizeFn: legacy })
    await birNew.login()
    const resultNew = await birNew.report(report)

    t.strictSame(resultLegacy, resultNew)

    t.end()
  }
)
