// *- DEFAULT
import * as _G from '@effectfuljs/core';

function v() {
  var i;
  return G.generator((ret, yld, yldS) => {
    loop = G.iterator([1, 2, 3]);
    return G.block(label => G.repeat(() => {
      let i;
      const a = loop();
      const b = loop = a;

      if (b) {
        i = loop.value;
        return yld(i);
      } else return label();
    })).mbind(() => yldS(z)).mapply(a => {
      console.log(a);
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
  return G.generator((ret, yld, yldS) => yld(z).mbind(() => yldS(x)).mbind(a => {
    if (a) return ret(y);else return G.pure();
  }).mbind(() => yldS(a)));
}

function f() {
  return G.generator((ret, yld, yldS) => {
    const a = eff(1);
    return yld(a).mbind(() => {
      const a = eff(2);
      return yld(a);
    }).mbind(() => {
      const a = eff(3);
      return yldS(a);
    }).mbind(a => {
      const b = eff(3);
      return yld(b).mbind(b => {
        console.log(a + b);
        const c = eff(4);
        const d = eff(c);
        return yldS(d);
      });
    }).mapply(() => {
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
    const b = eff(3);
    console.log(a + b);
    return eff(4);
  }).mbind(a => eff(a));
}
