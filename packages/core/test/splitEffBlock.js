import * as Kit from "../kit"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import {recalcEff} from "../propagate"
import * as Block from "../block"
import * as Scope from "../scope"
import * as Branch from "../branch"
import * as Bind from "../bind"
import * as Debug from "../debug"

const runImpl = (pass) =>
      transformExpr(Kit.pipe(
        recalcEff,
        Array.from,
        Bind.flatten,
        recalcEff,
        Block.splitEffBlock,
        pass,
        Array.from,
        // Bind.propagateBindVars,
        Debug.mark,
        Kit.consume))

describe('split block', function() {
  const run = runImpl(v => v)
  it('split block simple 1', function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
        i++;
        eff(2);
      }),
      print(function () /*BS|..|B*/{
        /*BS|#|E*/{
          var i = 0;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
        }
        /*BS|#|E*/{
          i++;
          /*VD|S|E*/var b = /*CE|B*/eff(2);
        }
      }))
  })
  it('split block simple 2', function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
      }),
      print(function () /*BS|..|B*/{
        /*BS|#|E*/{
          var i = 0;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
        }
      }))
  })
  it('split block simple 3', function() {
    equal(
      run(function() {
        eff(1);
      }),
      print(function () /*BS|..|B*/{
        /*BS|#|E*/{
          /*VD|S|E*/var a = /*CE|B*/eff(1);
        }
      }))
  })
  context('with assignments', function() {
    it('should move assignment to the next block', function() {
      equal(
        run(function() {
          var i;
          i = eff(1);
          i = eff(2);
        }),
        print(function () /*BS|..|B*/{
          /*BS|#|E*/{
            var i;
            /*VD|S|E*/var b = /*CE|B*/eff(1);
          }
          /*BS|#|E*/{
            /*VD|S*/var a = i = b;
            /*VD|S|E*/var d = /*CE|B*/eff(2);
          }
          /*BS|#*/{
            /*VD|S*/var c = i = d;
          }
        }))
    })
  })
  context('with effectful sub-expression', function() {
    it('should have only 1 effect in a block', function() {
      equal(
        run(function() {
          eff1(eff2(1));
        }),
        print(function () /*BS|..|B*/{
          /*BS|#|E*/{
            /*VD|S|E*/var b = /*CE|B*/eff2(1);
          }
          /*BS|#|E*/{
            /*VD|S|E*/var a = /*CE|B*/eff1(b);
          }
        }))
    })
  })
  context('with `if` statement', function() {
    it('should have only 1 effectful statement in a block 1', function() {
      equal(
        run(`function() {
          eff1(1);
          if (eff(2)) {
            b;
            eff(3);
            c;
            eff(4);
          } else 
            eff(5);
          eff(6);
        }`),
        print(function () /*BS|..|B*/{
          /*BS|#|E*/{
            /*VD|S|E*/var a = /*CE|B*/eff1(1);
          }
          /*BS|#|E*/{
            /*VD|S|E*/var d = /*CE|B*/eff(2);
          }
          /*BS|#|E*/{
            /*IS|E*/if (d) /*BS|..|B*/{
              /*BS|#|E*/{
                b;
                /*VD|S|E*/var e = /*CE|B*/eff(3);
              }
              /*BS|#|E*/{
                c;
                /*VD|S|E*/var f = /*CE|B*/eff(4);
              }
            } else /*BS|..|B*/{
              /*BS|#|E*/{
                /*VD|S|E*/var g = /*CE|B*/eff(5);
              }
            }
          }
          /*BS|#|E*/{
            /*VD|S|E*/var h = /*CE|B*/eff(6);
          }
        }))
    })
    it('should have only 1 effectful statement in a block 2', function() {
      equal(
        run(`function() {
          eff1(1);
          a;
          if (test) {
            b;
            eff(3);
            c;
            eff(4);
          } else 
            eff(5);
          eff(6);
        }`),
        print(function () /*BS|..|B*/{
          /*BS|#|E*/{
            /*VD|S|E*/var d = /*CE|B*/eff1(1);
          }
          /*BS|#|E*/{
            a;
            /*IS|E*/if (test) /*BS|..|B*/{
              /*BS|#|E*/{
                b;
                /*VD|S|E*/var e = /*CE|B*/eff(3);
              }
              /*BS|#|E*/{
                c;
                /*VD|S|E*/var f = /*CE|B*/eff(4);
              }
            } else /*BS|..|B*/{
              /*BS|#|E*/{
                /*VD|S|E*/var g = /*CE|B*/eff(5);
              }
            }
          }
          /*BS|#|E*/{
            /*VD|S|E*/var h = /*CE|B*/eff(6);
          }
        }))
    })
  })
})

