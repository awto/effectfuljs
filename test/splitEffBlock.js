import * as R from "ramda"
import * as Kit from "../src/kit"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import {recalcEff} from "../src/propagate"
import * as Trace from "../src/kit/trace"
import * as Block from "../src/block"
import * as Debug from "../src/debug"
import * as Scope from "../src/scope"
import * as Branch from "../src/branch"
import * as Bind from "../src/bind"

const runImpl = (pass) =>
      transformExpr(R.pipe(
        Scope.topCastToBody,
        Branch.toBlocks,
        recalcEff,
        Array.from,
        Bind.flatten,
        recalcEff,
        Block.splitEffBlock,
        pass,
        Array.from,
        Bind.propagateBindVars,
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
      print(function () /*BS|..|E*/{
        /*BS|#|E*/{
          var i = 0;
          /*ES|S|E*/ /*CE|B*/eff(1);
        }
        /*BS|#|E*/{
          i++;
          /*ES|S|E*/ /*CE|B*/eff(2);
        }
      }))
  })
  it('split block simple 2', function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
      }),
      print(function () /*BS|..|E*/{
        /*BS|#|E*/{
          var i = 0;
          /*ES|S|E*/ /*CE|B*/eff(1);
        }
      }))
  })
  it('split block simple 3', function() {
    equal(
      run(function() {
        eff(1);
      }),
      print(function () /*BS|..|E*/{
        /*BS|#|E*/{
          /*ES|S|E*/ /*CE|B*/eff(1);
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
        print(function () /*BS|..|E*/{
          /*BS|#1|E*/{
            var i;
            /*VD|S|E*/var a = /*CE|B*/eff(1);
          }
          /*BS|#1|E*/{
            /*ES|S*/i = a;
            /*VD|S|E*/var b = /*CE|B*/eff(2);
          }
          /*BS|#*/{
            /*ES|S*/i = b;
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
        print(function () /*BS|..|E*/{
          /*BS|#1|E*/{
            /*VD|S|E*/var a = /*CE|B*/eff2(1);
          }
          /*BS|#|E*/{
            /*ES|S|E*/ /*CE|B*/eff1(a);
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
        print(function () /*BS|..|E*/{
          /*BS|#|E*/{
            /*ES|S|E*/ /*CE|B*/eff1(1);
          }
          /*BS|#1|E*/{
            /*VD|S|E*/var a = /*CE|B*/eff(2);
          }
          /*BS|#|E*/{
            /*IS|E*/if (a) /*BS|..|E*/{
              /*BS|#|E*/{
                b;
                /*ES|S|E*/ /*CE|B*/eff(3);
              }
              /*BS|#|E*/{
                c;
                /*ES|S|E*/ /*CE|B*/eff(4);
              }
            } else /*BS|..|E*/{
              /*BS|#|E*/{
                /*ES|S|E*/ /*CE|B*/eff(5);
              }
            }
          }
          /*BS|#|E*/{
            /*ES|S|E*/ /*CE|B*/eff(6);
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
        print(function () /*BS|..|E*/{
          /*BS|#|E*/{
            /*ES|S|E*/ /*CE|B*/eff1(1);
          }
          /*BS|#|E*/{
            a;
            /*IS|E*/if (test) /*BS|..|E*/{
              /*BS|#|E*/{
                b;
                /*ES|S|E*/ /*CE|B*/eff(3);
              }
              /*BS|#|E*/{
                c;
                /*ES|S|E*/ /*CE|B*/eff(4);
              }
            } else /*BS|..|E*/{
              /*BS|#|E*/{
                /*ES|S|E*/ /*CE|B*/eff(5);
              }
            }
          }
          /*BS|#|E*/{
            /*ES|S|E*/ /*CE|B*/eff(6);
          }
        }))
    })
  })
})

