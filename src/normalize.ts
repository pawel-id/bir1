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
