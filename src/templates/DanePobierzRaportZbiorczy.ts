export const DanePobierzRaportZbiorczy = (params: {
  date: string
  report: string
}) => `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
  <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
    <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DanePobierzRaportZbiorczy</wsa:Action>
    <wsa:To>https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
  </soap:Header>
  <soap:Body>
    <ns:DanePobierzRaportZbiorczy>
      <ns:pDataRaportu>${params.date}</ns:pDataRaportu>
      <ns:pNazwaRaportu>${params.report}</ns:pNazwaRaportu>
    </ns:DanePobierzRaportZbiorczy>
  </soap:Body>
</soap:Envelope>
`
