import * as R from "ramda"
import {equal,runExpr as runImpl,pretty} from "./kit/core"
import * as Trace from "../src/kit/trace"
import * as Debug from "../src/debug"

describe("full transform", function() {
  context("start with profile full", function() {
    const run = runImpl({ns:"M",profile:"full"})
    it("converts to monadic by default", function() {
      equal(run(function() {
        eff(1);
        eff(2);
      }),pretty(function() {
        return M(eff(1)).mbind(() => eff(2));
      }))
    })
    it("injects coerce if specified", function() {
      equal(
        run(function() {
          M.option({coerce:true})
          eff1()
          eff2()
        })
        ,pretty(function () {
        return M(eff1()).mbind(() => eff2());
      }))
    })
  })
  context("start with profile minimal", function() {
    const run = runImpl({ns:"M",profile:"minimal"})
    it("converts only marked parts", function() {
      equal(run(function() {
        p1();
        p2();
        M(e1());
        M(e(2));
      }),pretty(function () {
        p1();
        p2();
        return M(e1()).mbind(() => e(2));
      }))
    })
  })
  context("switching profiles", function() {
    const run = runImpl({ns:"M",profile:"full"})
    it("converts statements accordingly 1", function() {
      equal(run(function() {
        console.log("hi")
        e1()
        e2()
        M.profile("minimal");
        p1();
        p2();
        M(e1());
        M(e(2));
      }),pretty(function () {
        console.log("hi")
        return M(e1()).mbind(() => e2()).mbind(() => {
          p1();
          p2();
          return e1();
        }).mbind(() => e(2));
      }))
    })
    it("converts statements accordingly 2", function() {
      const run = runImpl({ns:"M",profile:"minimal"})
      equal(run(function() {
        M.profile("defaultFull");
        p1();
        p2();
        function a() {
          console.log('hi')
          e1()
          e2()
        }
        M.profile("defaultMinimal");
        p2();
        p3();
        function b() {
          p4();
          p5();
          M(e1());
          M(e(2));
        }
      }),pretty(function () {
        p1();
        p2();
        function a() {
          console.log('hi');
          return M(e1()).mbind(() => e2());
        }
        p2();
        p3();
        function b() {
          p4();
          p5();
          return M(e1()).mbind(() => e(2));
        }
      }))
    })    
  })
})

