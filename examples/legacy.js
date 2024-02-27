import Bir from 'bir1'
import { legacy } from 'bir1/normalize'

/**
 * In previous version of that library (1.x, 2.x), there was some preprocessing
 * applied to keys and values. This is no longer needed, but if you want to use
 * old approach, you can use legacy normalize function from `bir1/normalize`.
 * 
 * The implementation of legacy normalize function best describes previous
 * approach. See the source code of file://src/normalize.ts for details.
 */

// legacy approach (some preprocessing)
const birLegacy = new Bir({ normalizeFn: legacy })
await birLegacy.login()
console.log(
  await birLegacy.report({
    regon: '011417295',
    report: 'BIR11OsPrawna',
  })
)

// new approach (no preprocessing)
const birCurrent = new Bir()
await birCurrent.login()
console.log(
  await birCurrent.report({
    regon: '011417295',
    report: 'BIR11OsPrawna',
  })
)