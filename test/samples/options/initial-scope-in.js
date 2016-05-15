// *- DEFAULT
function a() {
    eff(1);
    eff(2);
    $(eff(3));
    $(eff(4));
}
$ = require("./mfjscore");
$.profile("defaultFull");

function b() {
    eff(1);
    eff(2);
    $(eff(3));
    $(eff(4));
}

$.profile("defaultMinimal");

function c() {
    eff(1);
    eff(2);
    $(eff(3));
    $(eff(4));
}

