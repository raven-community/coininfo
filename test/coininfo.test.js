var test = require('tape')
var ci = require('../')

test('+ coininfo()', function (t) {
  t.test('iterate all coins', function (t) {
    var coins = [
      'rvn', 'rvn-test'
    ]

    coins.forEach(function (c) {
      t.ok(ci(c).versions.scripthash, 'should return valid data for ' + c)
    })

    t.end()
  })

    t.test('should return bip32', function (t) {
      var v = ci('RVN-TEST').versions.bip32
      t.equal(v.public, 0x043587cf)
      t.equal(v.private, 0x04358394)
      t.end()
    })

    t.test('> when does not have bip32', function (t) {
      var v = ci('PPC').versions.bip32
      t.notok(v, 'should return null')
      t.end()
    })

    t.test('> when full formal coin name is passed', function (t) {
      t.ok(ci('ravencoin'), 'should return coin info')
      t.end()
    })

    t.end()
  })

  t.test('> when coin not found', function (t) {
    var info = ci('XXX')
    t.equal(info, null, 'should return null')
    t.end()
  })

  t.test('> when accessing through property', function (t) {
    var ravencoin = ci.ravencoin
    t.equal(ravencoin.main.versions.public, 0x3c)
    t.equal(ravencoin.test.versions.public, 0x6f)
    t.end()
  })

  t.test('toRavencoinJS()', function (t) {
    var ravencoin = ci.ravencoin.main
    var rjsRavencoin = ravencoin.toRavencoinJS()
    t.equal(rjsRavencoin.wif, 0x80, 'should return a compatible ravencoinjs-lib')
    t.end()
  })

  t.test('toRavencore()', function (t) {
    // should return a compatible Bitpay bitcore
    var ravencoin = ci.ravencoin.main
    var rjsRavencore = ravencoin.toRavencore()
    t.equal(rjsRavencore.privatekey, 0x80)
    t.equal(rjsRavencore.networkMagic, 0x4e564152)
    t.true(rjsRavencore.dnsSeeds.length > 0)
    t.end()
  })

  t.end()
})
