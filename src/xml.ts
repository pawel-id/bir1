import { decodeXML } from 'entities'
import { XMLParser } from 'fast-xml-parser'
import { lowerFirstLetter, stripPrefix } from './normalize'

/**
 * Utility function to take object `obj` and replace empty string attributes
 * with `replacer` value. Modifies the object in place.
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

let _parser: XMLParser

export function parse(xml: string) {
  if (!_parser) {
    _parser = new XMLParser({
      // to avoid parsing tag values of type string into number
      parseTagValue: false,
    })
  }
  const result = _parser.parse(decodeXML(xml))

  return result
}
