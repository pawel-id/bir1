import got from 'got'

const url = {
  prod: 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
  test: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
}

export type QueryOptions = {
  headers?: Record<string, string>
  body: string
}

export async function query(prod: boolean, options: QueryOptions) {
  const { headers, ...rest } = options
  const { body } = await got.post(prod ? url.prod : url.test, {
    headers: {
      'Content-Type': 'application/soap+xml',
      ...headers,
    },
    ...rest,
  })
  return body
}
