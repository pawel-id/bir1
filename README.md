# GUS REGON service #

This is how I imagine client to [GUS](stat.gov.pl) REGON service as described in [documentation](http://bip.stat.gov.pl/dzialalnosc-statystyki-publicznej/rejestr-regon/interfejsyapi/jak-skorzystac-informacja-dla-podmiotow-komercyjnych/). Unfortunately it doesn't work.

## the problem ##
The code supplied tries to login into service using demo public key. Expected result is session id, but insted it retunrs error. 

I think that implementation of the service is a bit not standard. But I don't know how to tweak my code to run properly. Is it possible anyway?

## working examples ##

If you are looking for something which seems to work:

* https://pypi.python.org/pypi/litex.regon
* https://github.com/Appsolutly/node-regon
