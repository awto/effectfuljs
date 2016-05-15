M.option({coerce:"none",
          compile:false,
          compileM:{
              Function:{
                  match:{postfix:{M:true}},
                  select:"matchDeclName",
                  cases:{true:{sub:"minimal",compile:true}}}},
          minimal:{CallExpression:{match:{postfix:{M:true}}},
                   Function:{move:"compileM"}}});
M.profile("compileM");
function a() {
    eff(1);
    eff(2);
    effM(1);
    effM(2);
    function xM() {
        eff(1);
        effM(2);
        eff(3);
    };
    var yM = function() {
        eff(1);
        effM(2);
        eff(3);
    };

}
function aM() {
    eff(1);
    eff(2);
    effM(1);
    effM(2);
    function x() {
        eff(1);
        effM(2);
        eff(3);
    };
    var y = function() {
        eff(1);
        effM(2);
        eff(3);
    };

}
function bM() {
    eff(1);
    eff(2);
    effM(1);
    effM(2);
}
function c() {
    effM(1);
    effM(2);
}
var dM = function() {
    effM(1);
    effM(2);
},
e = function() {
    effM(1);
    effM(2);
};
c.prototype.fM = function () {
    effM(1);
    effM(2);
};
c.prototype.f = function () {
    effM(1);
    effM(2);
};
