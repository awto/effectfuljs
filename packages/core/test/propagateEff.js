import * as Kit from "../kit"
import {prepareScopes,consumeScope} from "../transform"
import {parse} from "babylon"
import {equal,print,transformExpr} from "./kit/core"
import * as Debug from "../debug"
import * as Dump from "../dump"
import * as Block from "../block"
import * as Ctrl from "../control"

const run = transformExpr(
    Kit.pipe(
      Ctrl.removeLabeledStatement,
      Debug.mark,
      consumeScope
    ))

describe('propagate effect for `for-of`', function() {
  context('with effect in body', function() {
    it('should be effectful 1', function() {
      equal(
        run(`function() {
          for(const i of s) {
            eff(1);
          }
        }`),
        print(`function () /*BS|..|B*/{
          /*FOS|E*/for (const i of s) /*BS|..|B*/{
            /*ES|e*/ /*CE|B*/eff(1);
          }
        }`))
    })
  })
  context('with effect in `for` init', function() {
    context('with variable declarations', function() {
      it('should have shallow effect 1',function() {
        equal(
          run(`function() {
            for(const i = init(1);t1;t2) {
              something;
            }
          }`),
          print(`function () /*BS|..|B*/{
            /*FS|e*/for ( /*VD|E*/const /*VD|E*/i = /*CE|B*/init(1);
              t1; t2) {
              something;
            }
          }`))
      })
    })
  }),
  context('with no effects in body', function() {
    context('with `break`', function() {
      it('should not have effect 1',function() {
           equal(
             run(`function() {
               eff(1)
               for(var i of e) {
                 2+2;
                 if (a)
                   break
               }
             }`),
             print(`function () /*BS|..|B*/{
               /*ES|e*/ /*CE|B*/ eff(1);
               
               for (var i of e) {
                 2 + 2;
                 if (a) { break; }
               }
             }`))
      })
    })
    context('with `continue`', function() {
      it('should not have effect 2',function() {
           equal(
             run(`function() {
               eff(1)
               for(var i of e) {
                 2+2;
                 if (a)
                   continue
               }
             }`),
             print(`function () /*BS|..|B*/{
               /*ES|e*/ /*CE|B*/ eff(1);
               for (var i of e) {
                 2 + 2;
                 if (a) { continue; }
               }
             }`))
         })
    })
    context('with `break` to labels', function() {
      it ('should be effectful 2', function() {
        equal(
          run(`function() {
            lab: lab2: lab3: {
              eff(1)
              if (a)
                break lab
            }
          }`),
          print(`function () /*BS|..|B*/{
            lab: /*BS|..|B*/{
              /*ES|e*/ /*CE|B*/eff(1);
              /*IS|E*/if (a) /*BS|..|B*/{
                 /*CE|B*/jump();
              }
            }
          }`))
      })
    })
    context('with `break` to effectful block', function() {
      it('should be effecful 3', function() {
        equal(
          run(`function() {
            lab: {
              eff(1)
              for(var i of e) {
                2+2;
                if (a)
                  break lab
              }
            }
          }`),
          print(`function () /*BS|..|B*/{
            lab: /*BS|..|B*/{
              /*ES|e*/ /*CE|B*/eff(1);
              
              /*FOS|E*/for (var i of e) /*BS|..|B*/{
                2 + 2;
                /*IS|E*/if (a) /*BS|..|B*/{
                  /*CE|B*/jump();
                }
              }
            }
          }`))
      })
    })
    context('with `continue` to effectful block', function() {
      it('should be effecful 4',
         function() {
           equal(
             run(`function() {
               lab: for(;;) {
                 eff(1)
                 for(var i of e) {
                   2+2;
                   if (a)
                     continue lab
                 }
               }
             }`),
             print(`function () /*BS|..|B*/{
               lab: /*FS|E*/for (;;) /*BS|..|B*/{
                 /*ES|e*/ /*CE|B*/eff(1);
                 
                 /*FOS|E*/for (var i of e) /*BS|..|B*/{
                   2 + 2;
                   /*IS|E*/if (a) /*BS|..|B*/{
                     /*CS|E*/continue lab;
                   }
                 }
               }
             }`))
         })
    })
    context('with `return` in effectful function', function() {
      it('should be effecful 5',
         function() {
           equal(
             run(`function() {
               eff(1)
               for(var i of e) {
                 2+2;
                 if (a)
                   return
               }
             }`),
             print(`function () /*BS|..|B*/{
               /*ES|e*/ /*CE|B*/eff(1);
               
               /*FOS|E*/for (var i of e) /*BS|..|B*/{
                 2 + 2;
                 /*IS|E*/if (a) /*BS|..|B*/{
                   /*CE|B*/jump();
                 }
               }
             }`))
         })
    })
    context('with complex control deps', function() {
      it('should assign effects appropriately', function() {
        equal(
          run(`function() {
            l1: for(var i of e) {
              2+2;
              l2: for(var j of f) {
                3+3
                for(var k of j)  {
                  4+4
                  if (a)
                    break
                }
                for(var l of k) {
                  if (b)
                    break l2
                }
                if (c)
                  break l1
              }
              eff(z)
            }
          }`),
          print(`function () /*BS|..|B*/{
            l1: /*FOS|E*/for (var i of e) /*BS|..|B*/{
              2 + 2;
              l2: /*FOS|E*/for (var j of f) /*BS|..|B*/{
                3 + 3;
                for (var k of j) {
                  4 + 4;
                  if (a) {
                    break;
                  }
                }
                /*FOS|E*/for (var l of k) /*BS|..|B*/{
                  /*IS|E*/if (b) /*BS|..|B*/{
                    /*CE|B*/jump();
                  }
                }
                /*IS|E*/if (c) /*BS|..|B*/{
                  /*CE|B*/jump();
                }
              }
              /*ES|e*/ /*CE|B*/eff(z);
            }
          }`))
      })
    })
    context('with effect on the right', function() {
      it('should be effectful 6',
         function() {
           equal(
             run(`function() {
               for(var i of eff(1)) {
                 2+2;
               }
             }`),
             print(function () /*BS|..|B*/{
               /*FOS|e*/for (var i of /*CE|B*/ eff(1)) {
                 2 + 2;
               }
             }))
         })
    })
  })
})

