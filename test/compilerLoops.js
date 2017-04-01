import * as assert from 'assert'
import {exprEqual, compiler} from './kit/core'

describe('`for` statement', function() {
  context('when all parts have no effect', function() {
    it('should be unchanged', function() {
      exprEqual(
        `function() {
          var i, j, len, ref1;
          ref1 = [1, 2, 3];
          for (j = 0, len = ref1.length; j < len; j++) {
            i = ref1[j];
            console.log(i);
          }
        }`,
        `function() {
          var i, j, len, ref1;
          ref1 = [1, 2, 3];
          for (j = 0, len = ref1.length; j < len; j++) {
            i = ref1[j];
            console.log(i);
          }
        }`);
    });
  });
});
