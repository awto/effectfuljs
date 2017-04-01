import {exprEqual, compiler} from "./kit/core"

describe('expressions translator', function() {
  it('should leave pure expressions as is', function() {
    exprEqual(
      `function() {
        return 2 + 2;
      }`,
      `function() {
        return 2 + 2;
      }`);
  });
  it('should treat function call as effectful', function() {
    exprEqual(
      `function() {
        eff(2);
      }`,
      `function() {
        return eff(2);
      }`);
  });
  it('should transform expressions with effectful part to mapply', function() {
    exprEqual(
      `function() {
        1 + console.log(2 + eff(3)) + 4;
      }`,
      `function() {
        return M(eff(3)).mapply(a => {
          const b = console.log(2 + a);
          1 + b + 4;
        });
      }`); 
    exprEqual(
      `function() {
        console.log(eff(1) + eff(2));
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mapply(b => {
          console.log(a + b);
        }));
      }`);
  });
  it('should transform nested effectful expressions to bind', function() {
    exprEqual(
      `function() {
        eff(effb(2)) + 2;
      }`,
      `function () {
        return M(effb(2)).mbind(a => eff(a)).mapply(a => {
          a + 2;
        });
      }`);
  });
  it('should use mapply for pure function calls if possible', function() {
    exprEqual(
      `function() {
        console.log(eff(1), 2);
      }`,
      `function() {
        return M(eff(1)).mapply(a => {
          console.log(a, 2);
        });
      }`);
    exprEqual(
      `function() {
        console.log(eff(1), 2) + eff(2) * 2;
      }`,
      `function () {
        return M(eff(1)).mbind(a => {
          const b = console.log(a, 2);
          return M(eff(2)).mapply(a => {
            b + a * 2;
          });
        });
      }`)
    exprEqual(
      `function() {
        console.log(eff(1), eff(2), 2);
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mapply(b => {
          console.log(a, b, 2);
        }));
      }`);
    exprEqual(
      `function() {
        console.log(eff(1) + eff(2), 2);
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mapply(b => {
          console.log(a + b, 2);
        }));
      }`);
  });
  it('should convert effectful callee into a bind', function() {
    exprEqual(
      `function() {
        effC(eff(1), eff(2));
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mbind(b => effC(a, b)));
      }`);
    exprEqual(
      `function() {
        eff(1)(eff(2));
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mbind(b => a(b)));
      }`);
    exprEqual(
      `function() {
        eff(1)(eff(2));
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mbind(b => a(b)));
      }`);
    exprEqual(
      `function() {
        eff(1)(eff(2)(eff(3)));
      }`,
      `function () {
        return M(eff(1))
          .mbind(
            a => M(eff(2)).mbind(
              a => M(eff(3)).mbind(b => a(b))).mbind(b => a(b)));
      }`);
    exprEqual(
      `function() {
        eff(1)(eff(2), eff(3), 4);
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mbind(b => M(eff(3)).mbind(
          c => a(b, c, 4))));
      }`);
  });
  it('should combine bind in mapplys accordingly', function() {
    exprEqual(
      `function() {
        5 + eff(effb(2)) + effc(3);
      }`,
      `function () {
        return M(effb(2)).mbind(a => eff(a)).mbind(a => M(effc(3)).mapply(b => {
          5 + a + b;
        }));
      }`);
    exprEqual(
      `function() {
        eff(1)(eff(2) + 2);
      }`,
      `function () {
        return M(eff(1)).mbind(a => M(eff(2)).mbind(b => a(b + 2)));
      }`);
    exprEqual(
      `function() {
        5 + effc(3) + eff(effb(2) + 4);
      }`,
      `function () {
        return M(effc(3)).mbind(a => M(effb(2)).mbind(a => eff(a + 4)).mapply(b => {
          5 + a + b;
        }));
      }`);
    exprEqual(
      `function() {
        5 + effc(3) + eff(effb(2) + 4);
      }`,
      `function () {
        return M(effc(3)).mbind(a => M(effb(2)).mbind(a => eff(a + 4)).mapply(b => {
          5 + a + b;
        }));
      }`);
  });
  it('should keep pure statements block in a single function', function() {
    exprEqual(
      `function() {
        console.log(eff("1"), 3);
        console.log("2");
        return console.log("3");
      }`,
      `function () {
        return M(eff('1')).mapply(a => {
          console.log(a, 3);
          console.log('2');
          return console.log('3');
        });
      }`);
    exprEqual(
      `function() {
        console.log(eff("1"), eff(2), 3);
        return console.log("4");
      }`,
      `function () {
        return M(eff('1')).mbind(a => M(eff(2)).mapply(b => {
          console.log(a, b, 3);
          return console.log('4');
        }));
      }`);
    exprEqual(
      `function() {
        console.log(eff("1"), 3);
        console.log("2");
        console.log("3");
        return eff(2);
      }`,
      `function () {
        return M(eff("1")).mbind(a => {
          console.log(a, 3);
          console.log("2");
          console.log("3");
          return eff(2);
        });
      }`);
  });
  it('should bind current scope `this`', function() {
    exprEqual(
      `function() {
        eff(1);
        this.eff(2);
        eff3(this);
      }`,
      `function () {
        return M(eff(1)).mbind(() => this.eff(2)).mbind(() => eff3(this));
      }`);
  });
});
