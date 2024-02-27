import Bir from 'bir1'
import { legacy } from 'bir1/normalize'

// In previous version of that library (1.0 - 2.0), there was some preprocessing
// applied to keys. This is no longer needed, but if you want to use old 
// approach, you can use legacy normalize function from `bir1/normalize` module.

const birLegacy = new Bir({ normalizeFn: legacy })
await birLegacy.login()
console.log(
  await birLegacy.report({
    regon: '011417295',
    report: 'BIR11OsPrawna',
  })
)
