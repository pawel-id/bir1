require('dotenv').config()
import assert from 'assert'
import got from 'got'
import { decodeXML } from 'entities'
import { parse as parseXML } from 'fast-xml-parser'
import { template } from './template'
import { normalize, removePrefix } from './normalize'
import camelcase from 'camelcase'
import BirError from './bir-error'

const url = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'

function soapResult(string: string) {
  const match = /<\S+Result>(.+)<\/\S+Result>/s.exec(string)
  assert(match && match[1], new Error('SOAP Result not found in response'))
  return match[1]
}

function xml2json(xml: string) {
  return parseXML(decodeXML(xml))
}

function extractData(object: any) {
  return object['root']['dane']
}

function validate(data: any) {
  if (BirError.looksLike(data)) {
    throw BirError.fromResponse(data)
  }
  return data
}

export default class Bir {
  private api = got.extend({
    method: 'POST',
    prefixUrl: url,
    headers: {
      'Content-Type': 'application/soap+xml',
    },
  })
  private sid?: string

  async login() {
    const key = process.env.KEY
    assert(key, new Error('no KEY provided'))
    const body = await template('Zaloguj', { key })
    const response = await this.api({ body })

    const sid = soapResult(response.body)
    assert(sid, new Error('login failed'))
    this.sid = sid
  }

  async value(value: string) {
    const body = await template('GetValue', { value })
    const response = await this.api({ body })
    return soapResult(response.body)
  }

  async report(regon: string) {
    const action = 'DanePobierzPelnyRaport'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = xml2json(soapResult(response.body))
    const data = extractData(result)
    return validate(normalize(data, [removePrefix('praw'), camelcase]))
  }

  async search(regon: string) {
    const action = 'DaneSzukajPodmioty'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = xml2json(soapResult(response.body))
    const data = extractData(result)
    return validate(normalize(data, [camelcase]))
  }
}
