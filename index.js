  var soap = require('soap');

  var url = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/wsdl/UslugaBIRzewnPubl.xsd';

  var args = {
      pKluczUzytkownika: 'abcde12345abcde12345',
  };

  var options = {
      endpoint: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
      forceSoap12Headers: true
  }

  soap.createClient(url, options, function (err, client) {
      client.addHttpHeader('Content-Type', 'application/soap+xml; charset=utf-8')
      client.Zaloguj(args, function (err, result) {
          if (err) {
              console.log(err)
          }
          if (result) {
              console.log(result.toJSON())
          }
      });
  });