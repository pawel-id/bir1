/**
 * Lower first letter of the string.
 */
function lowerFirstLetter(name: string) {
  if (name.length === 0) return name
  return name[0].toLowerCase() + name.slice(1)
}

/**
 * Strip `prefix` from the `name` string.
 */
function stripPrefix(name: string, prefix: string | string[]) {
  if (typeof prefix === 'string') prefix = [prefix]
  for (let p of prefix) {
    if (name.startsWith(p)) {
      return name.slice(p.length)
    }
  }
  return name
}

/**
 * Replace some strings.
 */
function replace(value: string, replaceArray: [string, any][]) {
  for (let [search, replace] of replaceArray) {
    if (value === search) value = replace
  }
  return value
}

/**
 * Convert string to lower camel case.
 *
 * @remarks
 * This is simplified implementation assuming that input string is already
 * partially camel cased. In some edge cases this function produce
 * results different from proper implementation.
 * However it is stable and faster and sufficient for our use case.
 */
function lowerCamelCase(name: string) {
  const words = name.split(/[^a-zA-Z0-9]/)

  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toLowerCase() + word.slice(1)
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  })

  return camelCaseWords.join('')
}

/**
 * Traverse object recursively and apply provided function `fn` to each
 * key-value pair. Returns new object.
 * @param obj object to traverse
 * @param fn function to apply
 */
function morph(
  obj: any,
  fn: (key: string, value: any) => { key: string; value: any }
): any {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map((element: any) => morph(element, fn))
    } else {
      let newObj: Record<string, any> = {}
      for (let [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
          newObj[key] = morph(value, fn)
        } else {
          const updated = fn(key, value)
          newObj[updated.key] = updated.value
        }
      }
      return newObj
    }
  }
}

/**
 * Transform object parsed from raw API response to format compatible with
 * earlier versions of the API. This function:
 *  - removes 'praw_' prefix from keys
 *  - lower first letter of keys
 *  - replaces empty strings with `undefined`
 *
 * Note: GUS API returns more prefixed keys than 'praw_'. Removing only this
 * prefix was initial partial implementation. This is inconsistent approach and
 * thus marked as deprecated, left only for compatibility with legacy code.
 *
 * @example
 * ```js
 * import Bir from 'bir1'
 * import { legacy } from 'bir1/normalize'
 * const bir = new Bir({ normalizeFn: legacy })
 * const result = await bir.search('010058960')
 * ```
 *
 * @param obj object to normalize
 * @deprecated
 */
export function legacy(obj: any) {
  return morph(obj, (key: string, value: any) => {
    key = stripPrefix(key, 'praw_')
    key = lowerFirstLetter(key)
    value = replace(value, [['', undefined]])
    return { key, value }
  })
}

/**
 * Transform object parsed from raw API response to convenient format commonly
 * used in modern JavaScript applications. This is subjective and opinionated.
 * This function:
 * - remove prefixes from keys (e.g. `fiz_`, `praw_`, ...)
 * - lower camel case keys
 * - unifies some keys (e.g. `regon9` -> `regon`)
 * - replaces empty strings with `undefined`
 *
 * @example
 * ```js
 * import Bir from 'bir1'
 * import { modern } from 'bir1/normalize'
 * const bir = new Bir({ normalizeFn: modern })
 * const result = await bir.search('010058960')
 * ```
 *
 * @param obj object to normalize
 * @beta
 */
export function modern(obj: any) {
  return morph(obj, (key: string, value: any) => {
    key = stripPrefix(key, [
      'fiz_',
      'praw_',
      'fizC_',
      'fizP_',
      'lokfiz_',
      'lokpraw_',
      'wspolsc_',
    ])
    key = lowerCamelCase(key)
    key = replace(key, [['regon9', 'regon']])
    value = replace(value, [['', undefined]])
    return { key, value }
  })
}
