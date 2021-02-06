require('dotenv').config()
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const got = require('got')
const parser = require('fast-xml-parser')

const url = 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc'

const envelope = (string) => {
  const match = /<\S+:Envelope.+<\/\S+:Envelope>/s.exec(string)
  assert(match && match[0], new Error('SOAP Envelope not found in response'))
  return match[0]
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#xD;/g, '')
}

const template = async (name, params = {}) => {
  const template = await fs.promises.readFile(
    path.join(__dirname, 'templates', `${name}.xml`),
    'utf8'
  )
  let result = template
  for (const param in params) {
    result = result.replace(new RegExp(`{{${param}}}`, 'g'), params[param])
  }
  return result
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
    return result['s:Envelope']['s:Body'][`${action}Response`][`${action}Result`]['root']['dane']
  }

  async search(regon) {
    const action = 'DaneSzukajPodmioty'
    const body = await template(action, { regon })
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = parser.parse(envelope(response.body))
    return result['s:Envelope']['s:Body'][`${action}Response`][`${action}Result`]['root']['dane']
  }
}

module.exports = Bir
