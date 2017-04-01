import * as assert from 'assert'
import {exprEqual, compiler} from './kit/core'

describe('`throw` statements compiler', function() {
  it('should convert `throw` with effectful argument into monadish value',
     function() {
       exprEqual(
         `function() {
           throw eff(1);
         }`,
         `function () {
           return M(eff(1)).mbind(a => M.raise(a));
         }`);
     });
  it('should ignore actions after monadish throw', function() {
    exprEqual(
      `function() {
        throw eff(1);
        eff(2);
      }`,
      `function () {
        return M(eff(1)).mbind(a => M.raise(a)).mbind(() => eff(2));
      }`);
  });
});

describe('`try` statements', function() {
  context("when inner block has effects", function() {
    context("when inner block has some pure prefix", function() {
      it.skip('should wrap whole `try` block', function() {
        exprEqual(
          `function () {
            var e, error;
            try {
              console.log('1');
              eff(1);
            } catch (error) {
              e = error;
              console.log('2');
            }
            eff(e)
          }`,
          `function () {
            var e, error;
            return M((() => {
              console.log('1');
              return eff(1);
            })()).mhandle(error => {
              e = error;
              console.log('2');
            });
           }`,{coerce:true,mode:"full",state:"all"});
      });
    });
    context("when `catch` block has no effects", function() {
      it('should be monadish block and `mhandle`', function() {
        exprEqual(
          `function() {
            try {
              eff(1);
            } catch(e) {
              console.log(e);
            }
          }`,
          `function () {
            return M(eff(1)).mhandle(e => {
              console.log(e);
            });
          }`);
      });
    });
    context("when `finally` block has no effects", function() {
      it('should be monadish block with `mhandle` and `mfinally`', function() {
        exprEqual(
          `function() {
            try {
              eff(1);
            } catch(e) {
              console.log(e);
            } finally {
              console.log("fin");
            }
          }`,
          `function () {
            return M(eff(1)).mhandle(e => {
              console.log(e);
            }).mfinally(() => {
              console.log('fin');
            });
          }`);
      });
    });
    context('when catch has effects', function() {
      it('should be converted into `mhandle` with effects', function() {
        exprEqual(
          `function() {
            try {
              eff(1);
            } catch(e) {
              console.log(e,1);
              eff(2);
              console.log(e,2);
            }
          }`,
          `function () {
            return M(eff(1)).mhandle(e => {
              console.log(e, 1);
              return M(eff(2)).mapply(() => {
                console.log(e, 2);
              });
            });
          }`);
      });
    });
    context('when finally has effects', function() {
      it('should be converted into `mfinally`', function() {
        exprEqual(
          `function() {
            try {
              eff(1);
            } finally {
              console.log(1);
              eff(2);
              console.log(2);
            }
          }`,
          `function () {
            return M(eff(1)).mfinally(() => {
              console.log(1);
              return M(eff(2)).mapply(() => {
                console.log(2);
              });
            });
          }`);
      });
    });
    context('when there is finally block without effects', function() {
      it('should be converted into monadish block and `mfinally`', function() {
        exprEqual(
          `function() {
            try {
              eff(1);
            } finally {
              console.log("fin");
            }
          }`,
          `function () {
            return M(eff(1)).mfinally(() => {
              console.log('fin');
            });
          }`);
      });
    });
  });
});
