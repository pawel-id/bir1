# GUS REGON service #

This is how I imagine client to [GUS REGON service](http://bip.stat.gov.pl/dzialalnosc-statystyki-publicznej/rejestr-regon/interfejsyapi/jak-skorzystac-informacja-dla-podmiotow-komercyjnych/) should work. 

```javascript
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
```

Unfortunately it doesn't. :-(

## the problem ##
The code supplied tries to login into service using demo public key. Expected result is session id, but insted it returns error. 

I think that implementation of the GUS REGON service is a bit not standard. This is the reason why that simple approach fails. 

## options ##
If you are still eager to use GUS REGON service there are three options:

1. Tweak the above code (add some headers, custom code, etc...) to run it. to Is it possible anyway? Any ideas?
2. Use some library from people who did it already (see working examples below)

## idea ##
But why every developer should struggle with such non standard service? The are two choices:

3. ask GUS to provide some standard modern interface like REST (can you hear us GUS people? - probably not...)
4. use option 1. or 2. and wrap it in an interface as above, add some caching and serve the community? Anybody?

## working examples ##
If you are looking for something which seems to work:

* https://pypi.python.org/pypi/litex.regon
* https://github.com/Appsolutly/node-regon
