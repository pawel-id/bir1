import assert from 'assert'
import got, { Got } from 'got'
import { template } from './template.js'
import { parse, ParseOptions } from './xml.js'
import { BirError } from './error.js'
import {
  GetValueOptions,
  DanePobierzPelnyRaportOptions,
  DanePobierzRaportZbiorczyOptions,
} from './types.js'

const url = {
  prod: 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
  test: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
}

function soapResult(string: string) {
  const match = /<\S+Result>(.+)<\/\S+Result>/s.exec(string)
  assert(match?.[1], new BirError('SOAP Result empty or not found in response'))
  return match[1]
}

function extract(result: string, parserOptions?: ParseOptions) {
  let resultObject = parse(result, parserOptions)
  resultObject = resultObject['root']['dane']
  BirError.assert(resultObject)
  return resultObject
}

interface BirOptions {
  /**
   * API key provided by GUS
   *
   * @remarks
   * If `options.key` is not provided, the internally stored public API key 
   * is used to access non-production GUS database. It allows quick start with
   * the API, however non-production database contains old and anonymized data.
   * Providing a key connects to the production database.
   */
  key?: string

  /**
   * Additional parse options for XML parser
   */
  parseOptions?: ParseOptions
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
 *   //   statusNip: '',
 *   //   nazwa: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA',
 *   //   ...
 *   // }
 * ```
 */
export default class Bir {
  key: string
  sid?: string
  prod: boolean
  parseOptions?: ParseOptions
  client: Got | undefined

  /**
   * Create a new Bir instance
   */
  constructor(options: BirOptions = {}) {
    this.key = options.key || 'abcde12345abcde12345'
    this.prod = options.key ? true : false
    this.parseOptions = options.parseOptions
  }

  private async api(options: any) {
    if (!this.client) {
      this.client = got.extend({
        method: 'POST',
        prefixUrl: this.prod ? url.prod : url.test,
        headers: {
          'Content-Type': 'application/soap+xml',
        },
      })
    }
    return this.client(options)
  }

  /**
   * Login to the API (method: Zaloguj)
   *
   * @remarks
   * This method must be called before any other method. It is not called
   * automatically to allow for more control over the login process.
   */
  async login() {
    assert(this.key, new BirError('No api key provided'))
    const body = await template('Zaloguj', { key: this.key })
    const response = await this.api({ body })
    const sid = soapResult(response.body)
    assert(sid, new BirError('Login failed, no session found in response'))
    this.sid = sid
  }

  /**
   * Get diagnostic information (method: GetValue)
   * @param value value to retrieve
   */
  async value(value: GetValueOptions) {
    const body = await template('GetValue', { value })
    const response = await this.api({ headers: { sid: this.sid }, body })
    return soapResult(response.body)
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
    return extract(soapResult(response.body), this.parseOptions)
  }

  /**
   * Retrive report (method: DanePobierzPelnyRaport)
   * @param query.regon REGON number
   * @param query.report report name
   */
  async report(query: {
    regon: string
    report: DanePobierzPelnyRaportOptions
  }) {
    const body = await template('DanePobierzPelnyRaport', query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    return extract(soapResult(response.body), this.parseOptions)
  }

  /**
   * Retrive summary report (method: DanePobierzRaportZbiorczy)
   * @param query.date date in format YYYY-MM-DD not earlier the week before
   * @param query.report report name
   */
  async summary(query: {
    date: string
    report: DanePobierzRaportZbiorczyOptions
  }) {
    const body = await template('DanePobierzRaportZbiorczy', query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    return extract(soapResult(response.body), this.parseOptions)
  }

  /**
   * Logout (method: Wyloguj)
   *
   */
  async logout() {
    assert(this.sid, new BirError('Not loggged in'))
    const body = await template('Wyloguj', { sid: this.sid })
    const response = await this.api({ body })
    soapResult(response.body)
  }
}
