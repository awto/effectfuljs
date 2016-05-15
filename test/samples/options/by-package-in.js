M = require("../../src/lib");
M.option({minimal:{CallExpression:{match:{package:{CC:true}}}}});
M.profile("defaultMinimal");
CC = require("../../src/cont1");

function a() {
  var CC, M, run;
  var ti = function() {
      return (CC.pushSubCont(k, false) + CC.pushSubCont(k, true) ? 3 : 4) + 2;
  };
}
M.option({coerce:"none"});

var run = function () {
    console.log(M.run(CC,function () {
        return CC.reset(function (p) {
            return CC.pushPrompt(p, function () {
                return (CC.withSubCont(p, function (k) {
                        return CC.pushSubCont(k, false) + CC.pushSubCont(k, true);
                })) ? 3 : 4;
            });
        }) + 2;
    }));
};
