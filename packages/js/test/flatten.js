import * as Kit from "../kit"
import {flatten,prepareScopes,consumeScope} from "../transform"
import generate from "babel-generator"
import {parse} from "babylon"
import {doWhileStmt,forOfStmt} from "../loops"
import {removeEmptyBinds} from "../transform"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import * as Prop from "../propagate"
import * as Branch from "../branch"
import * as Debug from "../debug"
import * as Dump from "../dump"
import * as Block from "../block"
import * as Bind from "../bind"

const run = transformExpr(Kit.pipe(
  Bind.flatten,
  Prop.recalcEff,
  Debug.mark,
  consumeScope))

describe('flatten expressions', function() {
  context('with logical sub expression', function() {
    it('should not let effect to escape 1', function() {
      equal(
        run(function() {
          eff(1) || (eff(2) + eff3());
        }),
        print(function () /*BS|..|B*/{
          /*VD|S|E*/var a = /*CE|B*/eff(1);
          /*IS|E*/if (!a) /*BS|..|E*/{
            /*VD|S|E*/var c = /*CE|B*/eff(2);
            /*VD|S|E*/var d = /*CE|B*/eff3();
            /*VD|S*/var b = c + d;
          } else /*BS|..|E*/{
            /*VD|S|E*/var b = /*CE|..|B*/pure(a);
          }
        }))
    })
    context('with js side effects', function() {
      it('should order all effects accordingly', function() {
        equal(
          run(function() {
            i+=2;
            eff1(eff2(++i),i++,eff3(i));
          }),
          print(function () /*BS|..|B*/{
            i += 2;
            /*VD|S*/var c = ++i;
            /*VD|S|E*/var b = /*CE|B*/eff2(c);
            /*VD|S*/var d = i++;
            /*VD|S|E*/var e = /*CE|B*/eff3(i);
            /*VD|S|E*/var a = /*CE|B*/eff1(b, d, e);
          }))
      })
    })
  })
  context('with variable declaration', function() {
    it('should not let effect to escape 2', function() {
      equal(
        run(function() {
          var a = eff(1) || eff(2);
        }),
        print(function () /*BS|..|B*/{
          /*VD|S|E*/var b = /*CE|B*/eff(1);
          /*IS|E*/if (!b) /*BS|..|E*/{
            /*VD|S|E*/var c = /*CE|B*/eff(2);
          } else /*BS|..|E*/{
            /*VD|S|E*/var c = /*CE|..|B*/pure(b);
          }
          var a = c;
        }))
    })
  })
  it('should not let effect to escape 3', function() {
    equal(
      run(function() {
        eff(1) || eff(2);
      }),
      print(function () /*BS|..|B*/{
        /*VD|S|E*/var a = /*CE|B*/eff(1);
        /*IS|E*/if (!a) /*BS|..|E*/{
          /*VD|S|E*/var b = /*CE|B*/eff(2);
        } else /*BS|..|E*/{
          /*VD|S|E*/var b = /*CE|..|B*/pure(a);
        }
      }))
  })
  context('with sequence operator', function() {
    it.skip('should remove the sequence operator', function() {
      equal(
        run(function() {
          var i = 0;
          eff(i), i++, eff(i--), eff(i+=2);
        }),
        //TODO: clean the sequence
        print(`function () /*BS|E*/{
          var i = 0;
          /*ES|S|E*/ /*CE|B*/eff(i);
          /*ES|S*/i++;
          /*VD|S*/var a = i--;
          /*ES|S|E*/ /*CE|B*/eff(a);
          /*VD|S*/var b = i += 2;
          /*ES|S|E*/ /*CE|B*/eff(b);
        }`))
    })
  })
  context('with `if` statement', function() {
    context('with pure branch', function() {
      it('should keep effect in body', function() {
        equal(
          run(function() {
            var i = 0
            if (i) {
              eff(i)
            } else {
              i+=2
              e
            }
          }),
          print(function () /*BS|..|B*/{
            var i = 0;
            
            /*IS|E*/if (i) /*BS|..|B*/{
              /*VD|S|E*/var a = /*CE|B*/eff(i);
            } else {
              i += 2;
              e;
            }
          }))
      })
    })
  })
})

describe('flatten `for-of`', function() {
  context('with effect in body', function() {
    it('should keep effect in body', function() {
      equal(
        run(`function() {
          for(var i of s) {
            eff(1);
          }
        }`),
        print(function () /*BS|..|B*/{
          /*FOS|E*/for (var i of s) /*BS|..|B*/{
            /*VD|S|E*/var a = /*CE|B*/eff(1);
          }
        }))
      })
  })
  context('with effect on the right', function() {
    it('should extract the effect into former step',
       function() {
         equal(
           run(function() {
             for(var i of eff(1)) {
               2+2;
             }
           }),
           print(function () /*BS|..|B*/{
             /*VD|S|E*/var a = /*CE|B*/eff(1);
             
             for (var i of a) {
               2 + 2;
             }
           }))
       })
  })
})

describe('flatten `for`', function() {
  context('with non-block in body', function() {
    it('should keep effect in the body', function() {
      equal(
        run(function() {
          for(;;) {
            eff(1);
          }
        }),
        print(function () /*BS|..|B*/{
          /*FS|E*/for (;;) /*BS|..|B*/{
            /*VD|S|E*/var a = /*CE|B*/eff(1);
          }
        }))
    })
  })
  context('with effects in init', function() {
    it('should extract effect', function() {
      equal(
        run(`function() {
          for(var i = init();;) {
            b;
          }
        }`),
        print(function () /*BS|..|B*/{
          /*VD|S|E*/var a = /*CE|B*/init();
          
          for (var i = a;;) {
            b;
          }
        }))
    })
  })
})


