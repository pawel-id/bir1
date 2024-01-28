/**
 * Lower first letter of the string.
 */
export function lowerFirstLetter(name: string) {
  if (name.length === 0) return name
  return name[0].toLowerCase() + name.slice(1)
}

/**
 * Strip `prefix` from the `name` string.
 */
export function stripPrefix(name: string, prefix: string | string[]) {
  if (typeof prefix === 'string') prefix = [prefix]
  for (let p of prefix) {
    if (name.startsWith(p)) {
      return name.slice(p.length)
    }
  }
  return name
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
export function lowerCamelCase(name: string) {
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

export function replaceEmptyValue(replacer: any) {
  return (key: string, value: any) => {
    if (value === '') {
      return { key, value: replacer }
    }
  }
}

export function lowerFirstLetterKey() {
  return (key: string, value: any) => {
    const newKey = lowerFirstLetter(key)
    if (newKey !== key) {
      return { key: newKey, value }
    }
  }
}

export function stripPrefixKey(prefix: string | string[]) {
  return (key: string, value: any) => {
    const newKey = stripPrefix(key, prefix)
    if (newKey !== key) {
      return { key: newKey, value }
    }
  }
}

/**
 * Traverse object recursively and apply provided functions `fns` to each
 * key-value pair. Functions can modify key and value or return undefined to
 * skip processing. Object is mutated in place.
 * @param obj object to traverse
 * @param fns functions to apply
 */
export function traverse(
  obj: any,
  fns: ((key: string, value: any) => { key: string; value: any } | undefined)[]
) {
  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      traverse(value, fns)
    } else {
      let newKey = key,
        newValue = value
      for (let fn of fns) {
        const updated = fn(newKey, newValue)
        if (updated) {
          newKey = updated.key
          newValue = updated.value
        }
      }
      if (newKey !== key) {
        delete obj[key]
        obj[newKey] = newValue
      } else {
        if (newValue !== value) {
          obj[key] = newValue
        }
      }
    }
  }
}
