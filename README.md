# GUS REGON service #

This is how I imagine client to [GUS REGON service](http://bip.stat.gov.pl/dzialalnosc-statystyki-publicznej/rejestr-regon/interfejsyapi/jak-skorzystac-informacja-dla-podmiotow-komercyjnych/) should work. Unfortunately it doesn't.

## the problem ##
The code supplied tries to login into service using demo public key. Expected result is session id, but insted it returns error. 

I think that implementation of the provided service is a bit not standard. This is the reason that simple approach fails. Is possible anyway to tweak it somehow to run?

## working examples ##

If you are looking for something which seems to work:

* https://pypi.python.org/pypi/litex.regon
* https://github.com/Appsolutly/node-regon
