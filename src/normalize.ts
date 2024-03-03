import assert from 'node:assert'

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
 * Replace empty string.
 */
function replaceEmpty(value: any, replacer?: any) {
  return value === '' ? replacer : value
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
 * key-value pair. Function can modify key and value or return the same. Object
 * is mutated in place.
 * @param obj object to traverse
 * @param fn function to apply
 */
export function morph(
  obj: any,
  fn: (key: string, value: any) => { key: string; value: any }
) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      for (const element of obj) {
        morph(element, fn)
      }
    } else {
      for (let [key, value] of Object.entries(obj)) {
        // technically this should never happen here, but let's be safe
        assert(typeof key === 'string', 'Only string keys are supported')
        if (typeof value === 'object') {
          morph(value, fn)
        } else {
          const updated = fn(key, value)
          if (updated.key !== key) {
            delete obj[key]
            obj[updated.key] = updated.value
          } else if (updated.value !== value) {
            obj[key] = updated.value
          }
        }
      }
    }
  }
}

/**
 * Provides compatibility with legacy version of the API. This function:
 *  - removes 'praw_' prefix from keys
 *  - lower first letter of keys
 *  - replaces empty strings with `undefined`
 *
 * Note: GUS API returns more prefixed keys than 'praw_'. Removing only this
 * prefix was initial partial implementation. This approach is deprecated
 * and left only for compatibility with legacy code.
 *
 * @param obj object to normalize
 * @deprecated
 */
export function legacy(obj: any) {
  morph(obj, (key: string, value: any) => {
    key = stripPrefix(key, 'praw_')
    key = lowerFirstLetter(key)
    value = replaceEmpty(value, undefined)
    return { key, value }
  })
}
