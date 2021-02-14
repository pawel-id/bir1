require('dotenv').config()
import assert from 'assert'
import got from 'got'
import { decodeXML } from 'entities'
import { parse as parseXML } from 'fast-xml-parser'
import { template } from './template'
import { normalize, removePrefix } from './normalize'
import camelcase from 'camelcase'

const url = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'

function soapResult(string: string) {
  const match = /<\S+Result>(.+)<\/\S+Result>/s.exec(string)
  assert(match && match[1], new Error('SOAP Result not found in response'))
  return match[1]
}

function xml2json(xml: string) {
  return parseXML(decodeXML(xml))
}

function extractData(object: object) {
  // @ts-ignore: fix it later
  return object['root']['dane']
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

    const sid = soapResult(response.body)
    assert(sid, new Error('login failed'))
    this.sid = sid
  }

  async report(regon: string) {
    const action = 'DanePobierzPelnyRaport'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = xml2json(soapResult(response.body))
    const data = extractData(result)
    return normalize(data, [removePrefix('praw'), camelcase])
  }

  async search(regon: string) {
    const action = 'DaneSzukajPodmioty'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = xml2json(soapResult(response.body))
    const data = extractData(result)
    return normalize(data, [camelcase])
  }
}
