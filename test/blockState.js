import * as Kit from "../src/kit"
import {consumeScope,
        debDumbBindStmt,
        removeEmptyBinds} from "../src/transform"
import {Tag,produce,consume} from "estransducers"
import dump from "estransducers/dump"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import {recalcEff} from "../src/propagate"
import * as Trace from "../src/kit/trace"
import * as Block from "../src/block"
import * as Bind from "../src/bind"
import * as Debug from "../src/debug"
import * as State from "../src/state"
import * as Scope from "../src/scope"
import * as Branch from "../src/branch"
import * as Coerce from "../src/coerce"
import * as Policy from "../src/policy"

const runImpl = (pass) => transformExpr(Kit.pipe(
  Branch.toBlocks,
  recalcEff,
  Bind.flatten,
  Block.splitEffBlock,
  State.prepare,
  Debug.mark,
  consumeScope
))

const runInterp = (opts = {}) =>
      (t) => transformExpr(Kit.pipe(
        Branch.toBlocks,
        recalcEff,
        Coerce.lift,
        State.saveDecls,
        Block.flatten,
        Array.from,
        Block.splitEffBlock,
        Block.calcVarDeps(false),
        State.prepare,
        opts.clos ? State.closureReGroup : Block.groupDeps,
        recalcEff,
        Block.calcVarDeps(true),
        Block.groupBindDeps,
        recalcEff,
        State.calcFrameStateVars,
        Block.factorEffSeq,
        recalcEff,
        opts.clos ? State.closure : State.calcFrameHierPath,
        // Block.propagateBindVars,
        State.inject,
        recalcEff,
        Block.lassoc,
        Block.cleanPureFrames,
        // Block.propagateBindVars,
        State.interpret,
        recalcEff,
        Block.cleanupEffSeq,
        Block.interpretParEffSeq,
        Block.interpretBinEffSeq,
        Coerce.inject,
        Coerce.liftFuncs,
        Block.interpretPure,
        Block.interpretApp,
        Block.interpretBindFrame,
        Coerce.interpret,
        Block.interpretCasts,
        State.restoreDecls,
        Branch.clean,
        Kit.scope.resolve,
        consumeScope
      ),t,{ns:"M",coerce:opts.coerce,state:true,closure:true})

describe.skip("mark state operations", function() {
  const run = runImpl(v => v)
  it("should inject reads/writes accordingly", function() {
    equal(
      run(`function() {
        var i = 0
        eff(i);
        i++;
        eff();
        eff(i);
        i = i + 1;
        eff(i);
        eff()
        ccc = i;
        i = 10;
        eff();
        ccc = i;
        i = 10;
        eff(i);
        i = 10;
        eff();
        i = 10;
        eff(i);
      }`),
      print(`function () /*BS|..|E*/{
        /*BS|#|r[i]|E*/{
          /*VD|r[i]*/var /*VD|r[i]*/ /*I|r[i]+*/i = /*NL|w[i]r[i]*/0;
          /*ES|S|w[i]W[i]r[i]|E*/ /*CE|r[i]|B*/ /*I|r[i]*/eff( /*I|r[i]-*/i);
        }
        /*BS|#|w[i]R[i]r[i]|E*/{
          /*ES|r[i]*/ /*UE|r[i]*/ /*I|r[i]+-*/i++;
          /*ES|S|w[i]W[i]r[i]|E*/ /*CE|r[i]|B*/ /*I|r[i]*/eff();
        }
        /*BS|#|w[i]R[i]|E*/{
          /*ES|S|E*/ /*CE|B*/ /*I|r[i]*/eff( /*I|-*/i);
        }
        /*BS|#|w[i]r[i]|E*/{
          /*ES|r[i]*/ /*AE|r[i]*/ /*I|r[i]+*/i = /*BE|w[i]r[i]*/ /*I|r[i]-*/i + /*NL|r[i]*/1;
          /*ES|S|w[i]W[i]r[i]|E*/ /*CE|r[i]|B*/ /*I|r[i]*/eff( /*I|r[i]-*/i);
        }
        /*BS|#|w[i]r[i]|E*/{
          /*ES|S|r[i]|E*/ /*CE|r[i]|B*/ /*I|r[i]*/eff();
        }
        /*BS|#|w[i]R[i]r[i]|E*/{
          /*I|r[i]*/ccc = /*I|-*/i;
          /*ES|r[i]*/ /*AE|r[i]*/ /*I|r[i]+*/i = /*NL|w[i]r[i]*/10;
          /*ES|S|w[i]W[i]r[i]|E*/ /*CE|r[i]|B*/ /*I|r[i]*/eff();
        }
        /*BS|#|w[i]R[i]|E*/{
          /*I|r[i]*/ccc = /*I|-*/i;
          /*ES|r[i]*/ /*AE|r[i]*/ /*I|r[i]+*/i = /*NL|w[i]r[i]*/10;
          /*ES|S|w[i]W[i]|E*/ /*CE|B*/ /*I|r[i]*/eff( /*I|-*/i);
        }
        /*BS|#|w[i]|E*/{
          /*I|+*/i = /*NL|w[i]*/10;
          /*ES|S|w[i]W[i]|E*/ /*CE|B*/eff();
        }
        /*BS|#|w[i]|E*/{
          /*ES|r[i]*/ /*AE|r[i]*/ /*I|r[i]+*/i = /*NL|w[i]r[i]*/10;
          /*ES|S|w[i]W[i]|E*/ /*CE|B*/ /*I|r[i]*/eff( /*I|-*/i);
        }
      }`))
  })
  context("with `if` statement",function() {
    context("with pure blocks", function() {
      it("injects write", function() {
        equal(
          run(`function() {
            var i = 0, j = 1, k = 2
            eff(i)
            i++
            j++
            if (j) {
              i = 10
              eff(i++)
              eff(j)
            } else {
              i = 11
              i+=1
              k+=1
            }
            eff(i,k)
          }`),
          print(`function () /*BS|..|E*/{
            /*BS|#|L[i,j,k]|E*/{
              var /*VD|i:W*/i = 0,
                  /*VD|j:W*/j = 1,
                  /*VD|k:W*/k = 2;
              /*ES|S|W[i,j,k]U[i,j,k]|E*/ /*CE|B*/eff( /*I|i:R*/i);
            }
            /*BS|#|R[i,j,k]L[i,j,k]U[i,j,k]|E*/{
              /*UE|i:WR*/i++;
              /*UE|j:WR*/j++;
              /*IS|E*/if ( /*I|j:R*/j) /*BS|..|E*/{
                /*BS|#|U[i,j,k]|E*/{
                  /*AE|i:W*/i = 10;
                  /*VD|S*/const a = /*UE|i:WR*/i++;
                  /*ES|S|W[i,j]C[k]U[i,j,k]|E*/ /*CE|B*/eff(a);
                }
                /*BS|#|R[j]U[i,j,k]|E*/{
                  /*ES|S|U[i,j,k]|E*/ /*CE|B*/eff( /*I|j:R*/j);
                }
              } else /*BS|..*/{
                /*BS|#|s[i,k]U[i,j,k]*/{
                  /*AE|i:W*/i = 11;
                  /*AE|i:WR*/i += 1;
                  /*AE|k:WR*/k += 1;
                }
              }
            }
            /*BS|#|R[i,k]U[i,j,k]|E*/{
              /*ES|S|U[i,j,k]|E*/ /*CE|B*/eff( /*I|i:R*/i, /*I|k:R*/k);
            }
          }`))
      })
    })
    context("in the last statement", function() {
      it("should not write anything in any branch", function() {
        equal(
          run(`function() {
            var i = 0
            eff(i)
            i++
            if (i) {
              eff(i)
            } else {
              eff()
              i+=1
              eff(i)
            }
          }`),
          print(`function () /*BS|..|E*/{
            /*BS|#|L[i]|E*/{
              var /*VD|i:W*/i = 0;
              /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
            }
            /*BS|#|R[i]L[i]U[i]|E*/{
              /*UE|i:WR*/i++;
              /*IS|E*/if ( /*I|i:R*/i) /*BS|..|E*/{
                /*BS|#|U[i]|E*/{
                  /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
                }
              } else /*BS|..|E*/{
                /*BS|#|U[i]|E*/{
                  /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff();
                }
                /*BS|#|R[i]L[i]U[i]|E*/{
                  /*AE|i:WR*/i += 1;
                  /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
                }
              }
            }
          }`))
      })
    })
    it("should have write on each branch", function() {
      equal(
        run(`function() {
          var i = 0
          eff(i)
          i++
          if (i) {
            eff(i)
          } else {
            eff()
            i+=1
            eff(i)
          }
          eff(i)
        }`),
        print(`function () /*BS|..|E*/{
          /*BS|#|L[i]|E*/{
            var /*VD|i:W*/i = 0;
            /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
          }
          /*BS|#|R[i]L[i]U[i]|E*/{
            /*UE|i:WR*/i++;
            /*IS|E*/if ( /*I|i:R*/i) /*BS|..|E*/{
              /*BS|#|U[i]|E*/{
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
              }
            } else /*BS|..|E*/{
              /*BS|#|U[i]|E*/{
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff();
              }
              /*BS|#|R[i]L[i]U[i]|E*/{
                /*AE|i:WR*/i += 1;
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
              }
            }
          }
          /*BS|#|R[i]U[i]|E*/{
            /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
          }
        }`))
    })
  })
  context("with `for` statement", function() {
    context("in the last statement", function() {
      it("should still have writes in the end of the body", function() {
        equal(
          run(`function() {
            var i = 0;
            for(;;) {
              i++
              eff(i)
            }
          }`),
          print(`function () /*BS|..|E*/{
            /*BS|#|L[i]|E*/{
              var /*VD|i:W*/i = 0;
              /*FS|E*/for (;;) /*BS|..|E*/{
                /*BS|#|U[i]|E*/{
                  /*UE|i:WR*/i++;
                  /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
                }
              }
            }
          }`))
      })
    })
    it("should read initial value in body", function() {
      equal(
        run(`function() {
          var i = 0;
          for(;;) {
            i++
            eff(i)
          }
          eff(i)
        }`),
        print(`function () /*BS|..|E*/{
          /*BS|#|L[i]|E*/{
            var /*VD|i:W*/i = 0;
            /*FS|E*/for (;;) /*BS|..|E*/{
              /*BS|#|U[i]|E*/{
                /*UE|i:WR*/i++;
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
              }
            }
          }
          /*BS|#|R[i]U[i]|E*/{
            /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
          }
        }`))
    })
    
  })
})

