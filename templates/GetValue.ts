const GetValue = (params: { value: string }) => {
  return `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/2014/07">
      <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/2014/07/IUslugaBIR/GetValue</wsa:Action>
      </soap:Header>
      <soap:Body>
        <ns:GetValue>
          <ns:pNazwaParametru>${params.value}</ns:pNazwaParametru>
        </ns:GetValue>
      </soap:Body>
    </soap:Envelope>
  `
}

export { GetValue };