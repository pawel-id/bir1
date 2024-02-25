import assert from 'assert'
import { decodeXML } from 'entities'
import { XMLParser } from 'fast-xml-parser'
import { BirError } from './error.js'

export function unsoap(string: string) {
  const match = /<\S+Result>(.+)<\/\S+Result>/s.exec(string)
  assert(match?.[1], new BirError('SOAP Result empty or not found in response'))
  return match[1]
}

let _parser: XMLParser

/**
 * Parse provided `result` xml string into native javascript object. Check for
 * errors and throws when needed. Return plain object reflecting provided xml.
 * @param xml xml string
 * @returns parsed object
 */
export function parse(xml: string) {
  if (!_parser) {
    _parser = new XMLParser({
      // to avoid parsing tag values of type string into number
      parseTagValue: false,
    })
  }
  let result = _parser.parse(decodeXML(xml))
  result = result['root']['dane']
  BirError.assert(result)
  return result
}
