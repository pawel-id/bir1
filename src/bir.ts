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

/**
 * Class Bir provides access to REGON API
 * 
 * @example Create a new Bir instance
 * ```js
 *   import Bir from 'bir1'
 *   const bir = new Bir()
 *   await bir.login()
 *   console.log(await bir.search({ nip: '5261040567' }))
 *   // output:
 *   // {
 *   //   regon: '011417295',
 *   //   nip: '5261040567',
 *   //   statusNip: null,
 *   //   nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA',
 *   //   ...
 *   // }
 * ```
 */
export default class Bir {
  private key: string
  private sid?: string
  private prod: boolean
  private _api: Got | undefined

  /**
   * Creates a new Bir instance
   * 
   * @param options.key production API key provided by GUS. 
   * 
   * @remarks
   * If key is not provided, the internally stored public API key is used to 
   * access non-production database. It allow quick start to play with the API,
   * however it should be noted that the non-production database contains old
   * and anonymized data.
   */
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

  /**
   * Login to the API (method: Zaloguj)
   * 
   * @remarks
   * This method must be called before any other method. It is not called
   * automatically to allow for more control over the login process.
   */
  async login() {
    assert(this.key, new Error('no api key provided'))
    const body = await template('Zaloguj', { key: this.key })
    const response = await this.api({ body })
    const sid = soapResult(response.body)
    assert(sid, new Error('login failed, no session found in response'))
    this.sid = sid
  }

  /**
   * Get a value (method: GetValue)
   * It is used to retrieve diagnostic information.
   */
  async value(value: string) {
    const body = await template('GetValue', { value })
    const response = await this.api({ body })
    return soapResult(response.body)
  }

  /**
   * Retrive report (method: DanePobierzPelnyRaport)
   * @param query.regon REGON number
   * @param query.report report name
   */
  async report(query: { regon: string; report: string }) {
    const body = await template('DanePobierzPelnyRaport', query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = await xml2json(soapResult(response.body))
    return validate(extractData(result))
  }

  /**
   * Search (method: DaneSzukajPodmioty)
   * @param query 
   * @param query.nip NIP number
   * @param query.regon REGON number
   * @param query.krs KRS number
   * 
   * @remarks
   * Only one of the query parameters can be used at a time.
   */
  async search(query: { nip: string } | { regon: string } | { krs: string }) {
    const body = await template('DaneSzukajPodmioty', query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    const result = await xml2json(soapResult(response.body))
    return validate(extractData(result))
  }
}
