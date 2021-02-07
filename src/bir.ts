require('dotenv').config()
import assert from 'assert'
import got from 'got'
import { decodeXML } from 'entities'
import { parse as parseXML } from 'fast-xml-parser'
import { template } from './template'
import { normalize, removePrefix } from './normalize'
import camelcase from 'camelcase'

const url = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'

function envelope(string: string) {
  const match = /<\S+:Envelope.+<\/\S+:Envelope>/s.exec(string)
  assert(match && match[0], new Error('SOAP Envelope not found in response'))
  return decodeXML(match[0])
}

function extractData(object: object, action: string) {
  const result =
    // @ts-ignore: fix it later
    object['s:Envelope']['s:Body'][`${action}Response`][`${action}Result`]
  return result['root']['dane']
}

export default class Bir {
  api = got.extend({
    method: 'POST',
    prefixUrl: url,
    headers: {
      'Content-Type': 'application/soap+xml',
    },
  })
  sid: string | undefined

  async login() {
    const key = process.env.KEY
    assert(key, new Error('no KEY provided'))
    const body = await template('Zaloguj', { key })
    const response = await this.api({ body })

    const regexp = /<ZalogujResult>(\S+)<\/ZalogujResult>/
    const match = response.body.match(regexp)
    if (match) {
      this.sid = match[1]
    }
  }

  async report(regon: string) {
    const action = 'DanePobierzPelnyRaport'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = parseXML(envelope(response.body))
    const data = extractData(result, action)
    return normalize(data, [removePrefix('praw'), camelcase])
  }

  async search(regon: string) {
    const action = 'DaneSzukajPodmioty'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = parseXML(envelope(response.body))
    const data = extractData(result, action)
    return normalize(data, [camelcase])
  }
}
