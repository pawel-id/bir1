/**
 * Options for method `GetValue`.
 */
export type GetValueOptions =
  | 'StanDanych'
  | 'KomunikatKod'
  | 'KomunikatTresc'
  | 'StatusSesji'
  | 'StatusUslugi'
  | 'KomunikatUslugi'

export type DanePobierzPelnyRaportBir1Options =
  | 'PublDaneRaportFizycznaOsoba'
  | 'PublDaneRaportDzialalnoscFizycznejCeidg'
  | 'PublDaneRaportDzialalnoscFizycznejRolnicza'
  | 'PublDaneRaportDzialalnoscFizycznejPozostala'
  | 'PublDaneRaportDzialalnoscFizycznejWKrupgn'
  | 'PublDaneRaportDzialalnosciFizycznej'
  | 'PublDaneRaportLokalneFizycznej'
  | 'PublDaneRaportLokalnaFizycznej'
  | 'PublDaneRaportDzialalnosciLokalnejFizycznej'
  | 'PublDaneRaportPrawna'
  | 'PublDaneRaportDzialalnosciPrawnej'
  | 'PublDaneRaportLokalnePrawnej'
  | 'PublDaneRaportLokalnaPrawnej'
  | 'PublDaneRaportDzialalnosciLokalnejPrawnej'
  | 'PublDaneRaportWspolnicyPrawnej'
  | 'PublDaneRaportTypJednostki'

export type DanePobierzPelnyRaportBir11Options =
  | 'BIR11OsFizycznaDaneOgolne'
  | 'BIR11OsFizycznaDzialalnoscCeidg'
  | 'BIR11OsFizycznaDzialalnoscRolnicza'
  | 'BIR11OsFizycznaDzialalnoscPozostala'
  | 'BIR11OsFizycznaDzialalnoscSkreslonaDo20141108'
  | 'BIR11OsFizycznaPkd'
  | 'BIR11OsFizycznaListaJednLokalnych'
  | 'BIR11JednLokalnaOsFizycznej'
  | 'BIR11JednLokalnaOsFizycznejPkd'
  | 'BIR11OsPrawna'
  | 'BIR11OsPrawnaPkd'
  | 'BIR11OsPrawnaListaJednLokalnych'
  | 'BIR11JednLokalnaOsPrawnej'
  | 'BIR11JednLokalnaOsPrawnejPkd'
  | 'BIR11OsPrawnaSpCywilnaWspolnicy'
  | 'BIR11TypPodmiotu'

/**
 * Reports for method `DanePobierzPelnyRaport`.
 *
 */
export type DanePobierzPelnyRaportOptions =
  | DanePobierzPelnyRaportBir1Options
  | DanePobierzPelnyRaportBir11Options

/**
 * Reports for method `DanePobierzRaportZbiorczy`.
 */
export type DanePobierzRaportZbiorczyOptions =
  | 'BIR11NowePodmiotyPrawneOrazDzialalnosciOsFizycznych'
  | 'BIR11AktualizowanePodmiotyPrawneOrazDzialalnosciOsFizycznych'
  | 'BIR11SkreslonePodmiotyPrawneOrazDzialalnosciOsFizycznych'
  | 'BIR11NoweJednostkiLokalne'
  | 'BIR11AktualizowaneJednostkiLokalne'
  | 'BIR11SkresloneJednostkiLokalne'
