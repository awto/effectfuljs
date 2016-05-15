module.exports = function(M,it) {
  M.option({
    test:{
      CallExpression:{
        match:{
          name:{run:true}
        },
        select:'matchCallName',
        cases:{true:{
          sub:'run'
        }}
      },
      compile:true
    },
    run: {
      bind:'true',
      sub:'full'
    },
    full: {
      CallExpression:{
        match:{
          name:{check:true,expect:true,equal:true}
        }
      }
    }
  });
  M.profile('test');
  describe('js control without effects', function() {
    context('with `for` statement', function() {
      it('should have the same semantics as js', function(def) {
        def.run(function() {
          def.rec('b');
          for(var i = 0; i < 3; i++) {
            def.rec(i);
          }
          def.rec('a');
          def.check('b',0,1,2,'a');
        });
        def.done();
      });
    });
  });
};

