require('dotenv').config()
import assert from 'assert'
import got from 'got'
import { template } from './template'
import { xml2json } from './xml-parser'
import BirError from './bir-error'

const url = {
  prod: 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
  test: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
}

function soapResult(string: string) {
  const match = /<\S+Result>(.+)<\/\S+Result>/s.exec(string)
  assert(
    match && match[1],
    new Error('SOAP Result empty or not found in response')
  )
  return match[1]
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
  private key: string
  private sid?: string
  private prod: boolean
  private api

  constructor(options: { key?: string } = {}) {
    this.key = options.key || 'abcde12345abcde12345'
    this.prod = options.key ? true : false
    this.api = got.extend({
      method: 'POST',
      prefixUrl: this.prod ? url.prod : url.test,
      headers: {
        'Content-Type': 'application/soap+xml',
      },
    })
  }

  async login() {
    assert(this.key, new Error('no api key provided'))
    const body = await template('Zaloguj', { key: this.key })
    const response = await this.api({ body })
    const sid = soapResult(response.body)
    assert(sid, new Error('login failed, no session foun in response'))
    this.sid = sid
  }

  async value(value: string) {
    const body = await template('GetValue', { value })
    const response = await this.api({ body })
    return soapResult(response.body)
  }

  async report(query: { regon: string }) {
    const action = 'DanePobierzPelnyRaport'
    const body = await template(action, query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = await xml2json(soapResult(response.body))
    return validate(extractData(result))
  }

  async search(query: { nip: string } | { regon: string }) {
    const action = 'DaneSzukajPodmioty'
    const body = await template(action, query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = await xml2json(soapResult(response.body))
    return validate(extractData(result))
  }
}
