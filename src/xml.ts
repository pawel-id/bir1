import { decodeXML } from 'entities'
import { XMLParser, X2jOptions } from 'fast-xml-parser'
import { lowercaseFirstLetter, stripPrefix } from './normalize.js'

export type EmptyTag = string | null | undefined
export type XmlOptions = Partial<X2jOptions>

export interface ParseOptions {
  emptyTag?: EmptyTag
  xmlOptions?: XmlOptions
}

export const defaultParseOptions: ParseOptions = {
  emptyTag: '',
  xmlOptions: {
    // to avoid parsing string to number
    parseTagValue: false,
  },
}

export const legacyParseOptions: ParseOptions = {
  emptyTag: undefined,
  xmlOptions: {
    ...defaultParseOptions.xmlOptions,
    transformTagName: (name: string) =>
      lowercaseFirstLetter(stripPrefix(name, 'praw_')),
  },
}

/**
 * Within object `obj` replace empty string attributes values with `replacer`.
 * Modifies the object in place.
 */
export function replaceEmpty(obj: Record<string, any>, replacer: any) {
  for (let [key, val] of Object.entries(obj)) {
    if (typeof val === 'object') {
      replaceEmpty(val, replacer)
    } else if (val === '') {
      obj[key] = replacer
    }
  }
}

export function parse(
  xml: string,
  options: ParseOptions = defaultParseOptions
) {
  const parser = new XMLParser({
    ...defaultParseOptions.xmlOptions,
    ...options.xmlOptions,
  })
  const result = parser.parse(decodeXML(xml))

  /* Current version fast-xml-parser does not support empty tag replacement, 
    but it returns empty string '' for empty tags (which is sensible option).
    Anyway if needed we can replace it with anything else. */
  if (options.emptyTag !== defaultParseOptions.emptyTag) {
    replaceEmpty(result, options.emptyTag)
  }

  return result
}
