require('dotenv').config()
const assert = require('assert')
const got = require('got')
const parser = require('fast-xml-parser')
const { template } = require('./template')
const { normalize, camelcase, removePrefix } = require('./normalize')

const url = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'

function envelope(string) {
  const match = /<\S+:Envelope.+<\/\S+:Envelope>/s.exec(string)
  assert(match && match[0], new Error('SOAP Envelope not found in response'))
  return match[0]
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#xD;/g, '')
}

function extractData(object, action) {
  const result =
    object['s:Envelope']['s:Body'][`${action}Response`][`${action}Result`]
  return result['root']['dane']
}
class Bir {
  constructor() {
    this.api = got.extend({
      method: 'POST',
      prefixUrl: url,
      headers: {
        'Content-Type': 'application/soap+xml',
      },
    })
  }

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

  async report(regon) {
    const action = 'DanePobierzPelnyRaport'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = parser.parse(envelope(response.body))
    const data = extractData(result, action)
    return normalize(data, [removePrefix('praw'), camelcase])
  }

  async search(regon) {
    const action = 'DaneSzukajPodmioty'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = parser.parse(envelope(response.body))
    const data = extractData(result, action)
    return normalize(data, [camelcase])
  }
}

module.exports = Bir
