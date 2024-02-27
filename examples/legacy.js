import Bir from 'bir1'
import { legacy } from 'bir1/normalize'

const birLegacy = new Bir({ normalizeFn: legacy })
await birLegacy.login()
console.log(
  await birLegacy.report({
    regon: '011417295',
    report: 'BIR11OsPrawna',
  })
)
