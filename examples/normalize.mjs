import Bir from 'bir1'
import { legacy, modern } from 'bir1/normalize'

/**
 * In previous version of that library (1.x, 2.x), there was some preprocessing
 * applied to keys and values. This is no longer needed, and by default the
 * parsed objects are returned 'as is'. However if you want to use
 * old approach, you can use legacy normalize function from `bir1/normalize`.
 * Also you can use any other function exported from that module or provide
 * your own.
 *
 * For further details see implementation file://src/normalize.ts .
 */

const myReport = {
  regon: '010058960',
  report: 'BIR11OsPrawna',
}

// run and compare all three approaches

// legacy approach (some preprocessing)
const birLegacy = new Bir({ normalizeFn: legacy })
console.log(await birLegacy.report(myReport))

// default approach (no preprocessing)
const birStraight = new Bir()
console.log(await birStraight.report(myReport))

// modern approach (some other preprocessing)
const birModern = new Bir({ normalizeFn: modern })
console.log(await birModern.report(myReport))
