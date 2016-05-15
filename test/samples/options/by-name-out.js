function a() {
    eff(1);
    eff(2);
    effM(1);
    effM(2);
    function xM() {
        eff(1);
        return effM(2).mapply(function () {
            eff(3);
        });
    }
    var yM = function () {
        eff(1);
        return effM(2).mapply(function () {
            eff(3);
        });
    };
}
function aM() {
    function x() {
        eff(1);
        effM(2);
        eff(3);
    }
    var y;
    eff(1);
    eff(2);
    return effM(1).mbind(function () {
        return effM(2);
    }).mapply(function () {
        y = function () {
            eff(1);
            effM(2);
            eff(3);
        };
    });
}
function bM() {
    eff(1);
    eff(2);
    return effM(1).mbind(function () {
        return effM(2);
    });
}
function c() {
    effM(1);
    effM(2);
}
var dM = function () {
        return effM(1).mbind(function () {
            return effM(2);
        });
    }, e = function () {
        effM(1);
        effM(2);
    };
c.prototype.fM = function () {
    return effM(1).mbind(function () {
        return effM(2);
    });
};
c.prototype.f = function () {
    effM(1);
    effM(2);
};