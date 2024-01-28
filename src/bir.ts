import assert from 'assert'
import got, { Got } from 'got'
import { template } from './template'
import { unsoap, parse } from './extract'
import { BirError } from './error'
import {
  GetValueOptions,
  DanePobierzPelnyRaportOptions,
  DanePobierzRaportZbiorczyOptions,
} from './types'

const url = {
  prod: 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
  test: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
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
  private key: string
  private sid?: string
  private prod: boolean
  private _normalizeFn?: (obj: any) => any
  private _client?: Got

  /**
   * Create a new Bir instance
   *
   * @remarks
   * If `options.key` is not provided, the internally stored public API key
   * is used to access non-production GUS database. It allows quick start,
   * however non-production database contains old and anonymized data.
   * Providing GUS provided key connects to the production database.
   */
  constructor(
    options: {
      /**
       * API key provided by GUS.
       */
      key?: string

      /**
       * Function to normalize the response object i.e. to mutate response
       * to a more convenient format.
       */
      normalizeFn?: (obj: any) => any
    } = {}
  ) {
    this.key = options.key || 'abcde12345abcde12345'
    this.prod = options.key ? true : false
    this._normalizeFn = options.normalizeFn
  }

  private normalize(obj: any) {
    if (this._normalizeFn) {
      this._normalizeFn(obj)
    }
    return obj
  }

  private async api(options: any) {
    if (!this._client) {
      this._client = got.extend({
        method: 'POST',
        prefixUrl: this.prod ? url.prod : url.test,
        headers: {
          'Content-Type': 'application/soap+xml',
        },
      })
    }
    return this._client(options)
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
    const sid = unsoap(response.body)
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
    return unsoap(response.body)
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
    return this.normalize(parse(unsoap(response.body)))
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
    return this.normalize(parse(unsoap(response.body)))
  }

  /**
   * Retrive summary report (method: DanePobierzRaportZbiorczy)
   * @param query.date date in format YYYY-MM-DD not earlier than week before
   * @param query.report report name
   */
  async summary(query: {
    date: string
    report: DanePobierzRaportZbiorczyOptions
  }) {
    const body = await template('DanePobierzRaportZbiorczy', query)
    const response = await this.api({ headers: { sid: this.sid }, body })
    return this.normalize(parse(unsoap(response.body)))
  }

  /**
   * Logout (method: Wyloguj)
   */
  async logout() {
    const body = await template('Wyloguj', { sid: this.sid })
    const response = await this.api({ body })
    unsoap(response.body)
  }
}
