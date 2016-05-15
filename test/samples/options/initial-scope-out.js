
function a() {
    eff(1);
    eff(2);
    $(eff(3));
    $(eff(4));
}
$ = require('./mfjscore');
function b() {
    return $(eff(1)).mbind(function () {
        return eff(2);
    }).mbind(function () {
        return eff(3);
    }).mbind(function () {
        return eff(4);
    });
}
function c() {
    eff(1);
    eff(2);
    return $(eff(3)).mbind(function () {
        return eff(4);
    });
}

