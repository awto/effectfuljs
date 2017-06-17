import * as R from "ramda"
import * as Kit from "../src/kit/core"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr,runExpr} from "./kit/core"
import * as Debug from "../src/debug"
import * as Trace from "../src/kit/trace"
import * as Block from "../src/block"
import * as Prop from "../src/propagate"
import * as Branch from "../src/branch"
import * as Bind from "../src/bind"

const run = transformExpr(R.pipe(
  Branch.switchRewrite,
  Prop.recalcEff,
  Bind.flatten,
  Debug.mark,
  consume))

describe('normilize `switch`', function() {
  context('with some branches continue', function() {
    context('with function definition', function() {
      it('should clone next branches', function() {
        equal(
          run(`function() {
            var i
            switch(eff(1)) {
            case check(1):
              i++
              effB(1)
            case check(2):
              function c() {
                effC()
              }
              effB(function d() { effD() })
              effB(2)
            default:
              effB(3)
            }
          }`),
          print(`function () /*BS|E*/{
            var i;
            /*VD|S|E*/var a = /*CE|B*/eff(1);
            /*VD|S|E*/var b = /*CE|B*/check(1);
            /*VD|S|E*/var c = /*CE|B*/check(2);
            /*SS|E*/switch (a) {
              /*SC|E*/case b:
              /*BS|E*/{
                i++;
                /*ES|S|E*/ /*CE|B*/effB(1);
                function c() /*BS|E*/{
                  /*ES|S|E*/ /*CE|B*/effC();
                }
                /*ES|S|E*/ /*CE|B*/effB(function d() /*BS|E*/{
                  /*ES|S|E*/ /*CE|B*/effD();
                });
                /*ES|S|E*/ /*CE|B*/effB(2);
                /*ES|S|E*/ /*CE|B*/effB(3);
              }
              /*SC|E*/case c:
              /*BS|E*/{
                function c() {
                  effC();
                }
                /*ES|S|E*/ /*CE|B*/effB(function d() {
                  effD();
                });
                /*ES|S|E*/ /*CE|B*/effB(2);
                /*ES|S|E*/ /*CE|B*/effB(3);
              }
              /*SC|E*/default:
              /*BS|E*/{
                /*ES|S|E*/ /*CE|B*/effB(3);
              }
            }
          }`))
      })
    })
    it('should clone next branches', function() {
      equal(
        run(`function() {
          var i
          switch(eff(1)) {
          case check(1):
            i++
            effB(1)
          case check(2):
            effB(2)
          case check(3):
            effB(3)
            break
          default:
            effB(3)
          }
        }`),
        print(`function () /*BS|E*/{
          var i;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
          /*VD|S|E*/var b = /*CE|B*/check(1);
          /*VD|S|E*/var c = /*CE|B*/check(2);
          /*VD|S|E*/var d = /*CE|B*/check(3);
          /*SS|E*/switch (a) {
            /*SC|E*/case b:
            /*BS|E*/{
              i++;
              /*ES|S|E*/ /*CE|B*/effB(1);
              /*ES|S|E*/ /*CE|B*/effB(2);
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
            /*SC|E*/case c:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(2);
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
            /*SC|E*/case d:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
            /*SC|E*/default:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
          }
        }`))
    })
  })
  context('without default option', function() {
    it('should create default option', function() {
      equal(
        run(`function() {
          var i
          switch(eff(1)) {
          case check(1):
            i++
            effB(1)
            break
          case check(2):
            effB(2)
            break
          }
        }`),
        print(`function () /*BS|E*/{
          var i;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
          /*VD|S|E*/var b = /*CE|B*/check(1);
          /*VD|S|E*/var c = /*CE|B*/check(2);
          /*SS|E*/switch (a) {
            /*SC|E*/case b:
            /*BS|E*/{
              i++;
              /*ES|S|E*/ /*CE|B*/effB(1);
            }
            /*SC|E*/case c:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(2);
            }
            default: {}
          }
        }`))
    })
  })
  context('with all branches exit', function() {
    it('should keep effectful statements inside branch', function() {
      equal(
        run(`function() {
          var i
          switch(eff(1)) {
          case check(1):
            i++
            effB(1)
            break
          case check(2):
            effB(2)
            break
          default:
            effB(3)
          }
        }`),
        print(`function () /*BS|E*/{
          var i;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
          /*VD|S|E*/var b = /*CE|B*/check(1);
          /*VD|S|E*/var c = /*CE|B*/check(2);
          /*SS|E*/switch (a) {
            /*SC|E*/case b:
            /*BS|E*/{
              i++;
              /*ES|S|E*/ /*CE|B*/effB(1);
            }
            /*SC|E*/case c:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(2);
            }
            /*SC|E*/default:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
          }
        }`))
    })
  })
})
