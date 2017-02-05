import * as R from "ramda"
import * as Kit from "../src/kit/core"
import {flatten,prepareScopes,consumeScope} from "../src/transform"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import {doWhileStmt,forOfStmt} from "../src/loops"
import {removeEmptyBinds} from "../src/transform"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import * as Debug from "../src/debug"
import * as Dump from "../src/dump"
import * as State from "../src/state"
import * as Uniq from "../src/uniq"
import * as Block from "../src/block"

const run = transformExpr(R.pipe(
  State.saveDecls,
  State.restoreDecls,
  Debug.mark,
  consumeScope))

describe("var decls",function() {
  it("should be moved to start of the function", function() {
    equal(
      run(function() {
        var i = 0
        eff(1);
        var j = 0
        eff(2);
        if (j) {
          var k;
        } else
          eff(3);
        var t;
        eff(4);
      }),
      print(function () /*BS|E*/{
        var i;
        var j;
        var k;
        var t;
        i = 0;
        /*ES|e*/ /*CE|B*/eff(1);
        j = 0;
        /*ES|e*/ /*CE|B*/eff(2);
        /*IS|E*/if (j) {} else /*ES|e*/ /*CE|B*/eff(3);
        /*ES|e*/ /*CE|B*/eff(4);
      }))
  })
  context('in for init', function() {
    it("should be moved to start of the function", function() {
      equal(
        run(function() {
          var i = 0
          eff(1);
          for(var j = 0; j < 10; j++)
            eff(2);
          for(var k; k < 10; k++)
            eff(3);
        }),
        print(function () /*BS|E*/{
          var i;
          var j;
          var k;
          i = 0;
          /*ES|e*/ /*CE|B*/eff(1);
          /*FS|E*/for (j = 0; j < 10; j++) /*BS|E*/{
            /*ES|e*/ /*CE|B*/eff(2);
          }
          /*FS|E*/for (; k < 10; k++) /*BS|E*/{
            /*ES|e*/ /*CE|B*/eff(3);
          }
        }))
    })
  })
})
