const url = {
  prod: 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
  test: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
}

export type QueryOptions = {
  headers?: Record<string, string>
  body: string
}

export async function query(prod: boolean, options: QueryOptions) {
  const { headers, body } = options
  const response = await fetch(prod ? url.prod : url.test, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/soap+xml',
      ...headers,
    },
    body,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const responseBody = await response.text()
  return responseBody
}
