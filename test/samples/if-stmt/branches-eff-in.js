// *- when branches has effects and it is the last statement
function a() {
    if (true)
        return eff(1);
    else
        return eff(2);
};
function b() {
    if (true)
        return eff(1);
    else
        return eff(2);
    eff(3);
    eff(4);
}
function c() {
    if (true)
        eff(1);
    else
        eff(2);
    eff(3);
    eff(4);
}

function d() {
    eff('a');
    if (true)
        eff(1);
    else
       eff(2);
    eff(3);
    eff(4);
}

