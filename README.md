# GUS REGON service #

This is example of accessing [GUS](stat.gov.pl) Regon service as described in [documentation](http://bip.stat.gov.pl/dzialalnosc-statystyki-publicznej/rejestr-regon/interfejsyapi/jak-skorzystac-informacja-dla-podmiotow-komercyjnych/) based on javascript/node.js package [soap](https://www.npmjs.com/package/soap)

## the problem ##
The code supplied tries to login into service using demo public key. Expected result is session id. Unfortunately it doesn't work. 

I think that implementation of the service is a bit not standard. But I don't know how to tweak my code to run properly. **Maybe someone could help?**

Here is example of python [working library](https://pypi.python.org/pypi/litex.regon) accessing this service. As I found in source code comments author complains that he has to implement it from scratch because no any standard library works... 




