import * as Kit from "../kit"
import {flatten,prepareScopes,consumeScope} from "../transform"
import {parse} from "babylon"
import {doWhileStmt,forOfStmt} from "../loops"
import {removeEmptyBinds} from "../transform"
import * as assert from "assert"
import {restore,equal,print,transformExpr} from "./kit/core"
import * as Debug from "../debug"
import * as Dump from "../dump"
import * as State from "../state"
import * as Block from "../block"

const run = (src) => transformExpr(Kit.pipe(
  State.saveDecls,
  restore,
  State.restoreDecls,
  Debug.mark,
  consumeScope),src,{state:false,profile:"full"})

describe("var decls",function() {
  it("should be moved to start of the function", function() {
    equal(
      run(`function() {
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
      }`),
      print(`function () /*BS|B*/{
        var i, j, k, t;
        i = 0;
        /*ES|e*/ /*CE|B*/eff(1);
        j = 0;
        /*ES|e*/ /*CE|B*/eff(2);
        /*IS|E*/if (j) {} else /*BS|B*/{
          /*ES|e*/ /*CE|B*/eff(3);
        }
        
        /*ES|e*/ /*CE|B*/eff(4);
      }`))
  })
  context('in for init', function() {
    it("should be moved to start of the function", function() {
      equal(
        run(`function() {
          var i = 0
          eff(1);
          for(var j = 0; j < 10; j++)
            eff(2);
          for(var k; k < 10; k++)
            eff(3);
        }`),
        print(`function () /*BS|B*/{
          var i, j, k;
          i = 0;
          /*ES|e*/ /*CE|B*/eff(1);
          /*FS|E*/for (j = 0;j < 10; j++)
          /*ES|e*/ /*CE|B*/eff(2);
          /*FS|E*/for (;k < 10;k++) /*ES|e*/ /*CE|B*/
          eff(3);
        }`))
    })
  })
  context('with destrs', function() {
    it("should be moved to start of the function", function() {
      equal(
        run(`function() {
          const [a,b,...f] = some;
          const {c,a:e} = eff(a,b,f);
          for(const [a,b,c,...g] of eff(a,b,c,f,e))
            eff(a,b,c,f,e,g);
        }`),
        print(`function () /*BS|B*/{
          var a, b, f, c, e, _a, _b, _c, g;
          [a, b, ...f] = some;
          ({
            c,
            a: e
          } = /*CE|B*/eff(a, b, f));
          
          /*FOS|E*/for (
            [_a, _b, _c, ...g] of
            /*CE|B*/eff(_a, _b, _c, f, e))
          /*ES|e*/ /*CE|B*/ eff(_a, _b, _c,
             f, e, g);
        }`))
    })
  })
})
