import Bir from '../src/bir'
import {
  traverse,
  stripPrefixKey,
  lowerFirstLetterKey,
  replaceEmptyValue,
} from '../src/normalize'

function legacyNormalize(obj: any) {
  traverse(obj, [
    stripPrefixKey('praw_'),
    lowerFirstLetterKey,
    replaceEmptyValue,
  ])
}

async function main() {
  const bir = new Bir({ normalizeFn: legacyNormalize })
  await bir.login()

  const result = await bir.search({ regon: '012100784' })
  console.log(result)

  const result2 = await bir.report({
    regon: '011417295',
    report: 'BIR11OsPrawna',
  })
  console.log(result2)
}

main()
