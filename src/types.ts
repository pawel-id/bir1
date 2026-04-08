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

/**
 * Map of values returned by GetValue('KomunikatKod')
 */
export const KomunikatKodErrorCodes = {
  '': 'Brak sesji. Sesja wygasła lub przekazano nieprawidłową wartość nagłówka sid.',
  '0': 'Poprzednia operacja wykonana prawidłowo (dla sesji zgodnej z przesłanym sid !)',
  '1': 'kod nieaktualny',
  '2': 'Do metody DaneSzukaj przekazano zbyt wiele identyfikatorów.',
  '4': 'Nie znaleziono podmiotów. (Częsta przyczyna: pNazwaRaportu dla P zamiast dla F i na odwrót).',
  '5': 'Nieprawidłowa lub pusta nazwa raportu.',
  '7': 'Brak sesji. Sesja wygasła lub przekazano nieprawidłową wartość nagłówka sid.',
}

/**
 * Reports for method `DanePobierzPelnyRaport`.
 */
export type DanePobierzPelnyRaportOptions =
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
  | 'BIR12OsFizycznaDaneOgolne'
  | 'BIR12OsFizycznaDzialalnoscCeidg'
  | 'BIR12OsFizycznaDzialalnoscRolnicza'
  | 'BIR12OsFizycznaDzialalnoscPozostala'
  | 'BIR12OsFizycznaDzialalnoscSkreslonaDo20141108'
  | 'BIR12OsFizycznaPkd'
  | 'BIR12OsFizycznaListaJednLokalnych'
  | 'BIR12JednLokalnaOsFizycznej'
  | 'BIR12JednLokalnaOsFizycznejPkd'
  | 'BIR12OsPrawna'
  | 'BIR12OsPrawnaPkd'
  | 'BIR12OsPrawnaListaJednLokalnych'
  | 'BIR12JednLokalnaOsPrawnej'
  | 'BIR12JednLokalnaOsPrawnejPkd'
  | 'BIR12OsPrawnaSpCywilnaWspolnicy'
  | 'BIR12TypPodmiotu'
  | 'BIR121JednLokalnaOsPrawnej'

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
  | 'BIR12NowePodmiotyPrawneOrazDzialalnosciOsFizycznych'
  | 'BIR12AktualizowanePodmiotyPrawneOrazDzialalnosciOsFizycznych'
  | 'BIR12SkreslonePodmiotyPrawneOrazDzialalnosciOsFizycznych'
  | 'BIR12NoweJednostkiLokalne'
  | 'BIR12AktualizowaneJednostkiLokalne'
  | 'BIR12SkresloneJednostkiLokalne'
