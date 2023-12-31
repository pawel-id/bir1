import assert from 'assert'
import got, { Got } from 'got'
import { template } from './template.js'
import { xml2json } from './xml-parser.js'
import BirError from './bir-error.js'

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
  private _api: Got | undefined

  constructor(options: { key?: string } = {}) {
    this.key = options.key || 'abcde12345abcde12345'
    this.prod = options.key ? true : false
  }

  private async api(options: any) {
    if (!this._api) {
      this._api = got.extend({
        method: 'POST',
        prefixUrl: this.prod ? url.prod : url.test,
        headers: {
          'Content-Type': 'application/soap+xml',
        },
      })
    }
    return this._api(options)
  }

  async login() {
    assert(this.key, new Error('no api key provided'))
    const body = await template('Zaloguj', { key: this.key })
    const response = await this.api({ body })
    const sid = soapResult(response.body)
    assert(sid, new Error('login failed, no session found in response'))
    this.sid = sid
  }

  async value(value: string) {
    const body = await template('GetValue', { value })
    const response = await this.api({ body })
    return soapResult(response.body)
  }

  async report(query: { regon: string; report: string }) {
    const body = await template('DanePobierzPelnyRaport', query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = await xml2json(soapResult(response.body))
    return validate(extractData(result))
  }

  async search(query: { nip: string } | { regon: string } | { krs: string }) {
    const body = await template('DaneSzukajPodmioty', query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = await xml2json(soapResult(response.body))
    return validate(extractData(result))
  }
}
