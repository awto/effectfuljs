import * as R from "ramda"
import * as Kit from "../src/kit"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import {recalcEff} from "../src/propagate"
import * as Trace from "../src/kit/trace"
import * as Uniq from "../src/uniq"
import * as Block from "../src/block"
import * as Debug from "../src/debug"
import * as State from "../src/state"
import {Tag,produce,consume} from "estransducers"
import {prepareScopes,consumeScope} from "../src/transform"
import * as Scope from "../src/scope"
import * as Branch from "../src/branch"
import dump from "estransducers/dump"

const runImpl = (opts = {}) =>
      transformExpr(R.pipe(
        Scope.topCastToBody,
        Branch.toBlocks,
        State.saveDecls,
        recalcEff,
        Block.flatten,
        Uniq.collect,
        recalcEff,
        Block.splitEffBlock,
        opts.group ?
          R.pipe(
            Block.calcVarDeps(false),
            Block.groupDeps,
            Block.calcVarDeps(true),
            Block.groupBindDeps,
            Block.factorEffSeq,
            Block.lassoc)
          : R.pipe(Block.rassoc,Block.factorEffSeq),
        recalcEff,
        Block.propagateBindVars,
        Block.cleanupEffSeq,
        Block.interpretBinEffSeq,
        Block.interpretBindFrame,
        Block.interpretApp,
        Block.interpretCasts,
        State.restoreDecls,
        Uniq.subst,
        consumeScope
      ))

describe('interpret block', function() {
  const run = runImpl({})
  it('interpret block 1', function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
        i++;
        eff(2);
      }),
      print(function () {
        var i ;
        i = 0;
        return eff(1).mbind(() => {
          i++;
          return eff(2);
        });
      }))
  })
  it('interpret block 2', function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
      }),
      print(function () {
        var i;
        i = 0;
        return eff(1);
      }))
  })
  it('interpret block 3', function() {
    equal(
      run(function() {
        eff(1);
      }),
      print(function () {
        return eff(1);
      }))
  })
  it('interpret block 4', function() {
    equal(
      run(`function() {
        if (test(1)) {
          eff(3);
        } else 
          eff(5);
      }`),
      print(function () {
        return test(1).mbind((a) => {
          if (a)
            return eff(3);
          else
            return eff(5);
        });
      }))
    })
  it('interpret block 5', function() {
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
      print(function () {
        return eff1(1).mbind(() => (() => {
            a;
            if (test) {
              b;
              return eff(3).mbind(() => {
                c;
                return eff(4);
              });
            } else
              return eff(5);
          })().mbind(() => eff(6)));
      }))
  })
  it('interpret block 6', function() {
    equal(
      run(`function() {
        eff1(1);
        a;
        if (test(1)) {
          b;
          eff(3);
          c;
          eff(4);
        } else 
          eff(5);
        eff(6);
      }`),
      print(function () {
        return eff1(1).mbind(() => {
          a;
          return test(1).mbind((d) => (() => {
              if (d) {
                b;
                return eff(3).mbind(() => {
                  c;
                  return eff(4);
                });
              } else
                return eff(5);
            })().mbind(() => eff(6)));
        });
      }))
  })
  it('interpret block 7', function() {
    equal(
      run(function() {
        var i = 0
        eff1(eff2(2));
      }),
      print(function () {
        var i;
        i = 0;
        return eff2(2).mbind((a) => eff1(a));
      }))
  })
})

describe('interpret block with pure prefix', function() {
  const run = runImpl({group:true})
  it('interpret block 1', function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
        i++;
        eff(2);
      }),
      print(function () {
        var i;
        i = 0;
        return eff(1).mbind(() => {
          i++;
          return eff(2);
        });
      }))
  })
  it('interpret block 2', function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
      }),
      print(function () {
        var i;
        i = 0;
        return eff(1);
      }))
  })
  it('interpret block 3', function() {
    equal(
      run(function() {
        eff(1);
      }),
      print(function () {
        return eff(1);
      }))
  })
  it('interpret block 4', function() {
    equal(
      run(`function() {
        if (test(1)) {
          eff(3);
        } else 
          eff(5);
      }`),
      print(function () {
        return test(1).mbind((a) => {
          if (a)
            return eff(3);
          else
            return eff(5);
        });
      }))
    })
  it('interpret block 5', function() {
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
      print(function () {
        return eff1(1).mbind(() => {
          a;
          if (test) {
            b;
            return eff(3).mbind(() => {
              c;
              return eff(4);
            });
          } else
            return eff(5);
        }).mbind(() => eff(6));
      }))
    })
  it('interpret block 6', function() {
    equal(
      run(`function() {
        eff1(1);
        a;
        if (test(1)) {
          b;
          eff(3);
          c;
          eff(4);
        } else 
          eff(5);
        eff(6);
      }`),
      print(function () {
        return eff1(1).mbind(() => {
          a;
          return test(1);
        }).mbind((d) => {
          if (d) {
            b;
            return eff(3).mbind(() => {
              c;
              return eff(4);
            });
          } else
            return eff(5);
        }).mbind(() => eff(6));
      }))
  })
  it('interpret block 7', function() {
    equal(
      run(function() {
        var i = 0
        eff1(eff2(2));
      }),
      print(function () {
        var i;
        i = 0;
        return eff2(2).mbind((a) => eff1(a));
      }))
  })
  //TODO: dependencies!!
  //      eff1(effI1(effJ(i)),effI2(i));
  it('interpret block 8', function() {
    equal(
      run(function() {
        var i = 0
        eff0();
        i+=2;
        effM();
        effN();
        eff1(eff2(effI1(++i)),i++,eff3(i));
        effM(effI(effN()));
        eff4(effI(),effJ());
        eff5();
      }),
      print(function () {
        var i;
        i = 0;
        return eff0()
          .mbind(() => {
            i += 2;
            return effM();
          })
          .mbind(() => effN())
          .mbind(() => {
            var a = ++i;
            return effI1(a);
          })
          .mbind((b) => eff2(b))
          .mbind((c) => {
            var d = i++;
            return eff3(i).mbind((e) => eff1(c, d, e));
          })
          .mbind(() => effN())
          .mbind((f) => effI(f))
          .mbind((g) => effM(g))
          .mbind(() => effI())
          .mbind((h) => effJ().mbind((k) => eff4(h, k)))
          .mbind(() => eff5());
      }))
  })
  context('with assignments', function() {
    it('should keep dependency binding in scope', function() {
      equal(
        run(function() {
          var i = 0
          i = read1() 
          eff(i)
          write(i)
        }),
        print(function () {
          var i;
          i = 0;
          return read1().mbind((a) => {
            i = a;
            return eff(i);
          }).mbind(() => write(i));
        }))
    })
  })
  context('with var decls init', function() {
    it('should keep dependency binding in scope', function() {
      equal(
        run(function() {
          var i = read1() 
          eff(i)
          write(i)
        }),
        print(function () {
          var i;
          return read1().mbind((a) => {
            i = a;
            return eff(i)
          }).mbind(() => write(i));
        }))
    })
  })
})
