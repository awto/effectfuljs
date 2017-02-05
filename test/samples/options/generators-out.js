// *- DEFAULT
import * as G from '@mfjs/core';

function v() {
  var loop;
  var i;
  return G.generator((ret, yld, yldS) => {
    loop = G.iterator([1, 2, 3]);
    return G.block(label => G.set({
      loop: loop
    }).mbind(() => G.repeat(() => G.get().mbind(({
      loop
    }) => {
      var a = loop();
      var b = loop = a;

      if (b) {
        i = loop.value;
        return G.set({
          loop: loop
        }).mbind(() => yld(i));
      } else return G.set({
        loop: loop
      }).mbind(() => label());
    })))).mbind(() => yldS(z)).mapply(c => {
      console.log(c);
    });
  });
}

function c() {
  return G.generator((ret, yld, yldS) => yldS(z));
}

function d() {
  return G.generator((ret, yld, yldS) => yld(z).mbind(() => yldS(x)).mapply(() => {
    return y;
  }));
}

function e() {
  return G.generator((ret, yld, yldS) => yld(z).mbind(() => yldS(x)).mbind(b => {
    if (b) return ret(y);else return G.pure();
  }).mbind(() => yldS(a)));
}

function f() {
  return G.generator((ret, yld, yldS) => {
    var a = eff(1);
    return yld(a).mbind(() => {
      var b = eff(2);
      return yld(b);
    }).mbind(() => {
      var c = eff(3);
      return yldS(c);
    }).mbind(d => (() => {
      var e = eff(3);
      return yld(e);
    })().mbind(g => {
      console.log(d + g);
      var h = eff(4);
      var k = eff(h);
      return yldS(k);
    })).mapply(() => {
      return 10;
    });
  });
}

function v1() {
  return z.mapply(a => {
    console.log(a);
  });
}

function c1() {
  return z;
}

function d1() {
  return z.mbind(() => x);
}

function e1() {
  return eff(1).mbind(() => eff(2)).mbind(() => eff(3)).mbind(a => {
    var b = eff(3);
    console.log(a + b);
    return eff(4);
  }).mbind(c => eff(c));
}