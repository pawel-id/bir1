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
    lowerFirstLetterKey(),
    replaceEmptyValue(undefined),
  ])
}

async function main() {
  const bir = new Bir({ normalizeFn: legacyNormalize })
  await bir.login()
  console.log(
    await bir.report({
      regon: '011417295',
      report: 'BIR11OsPrawna',
    })
  )
}

main()
