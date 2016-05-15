var begin, end;
function a() {
    eff(1);
    eff(2);
    begin;
    return M(eff(3)).mbind(function () {
        return eff(4);
    });
}
function b() {
    eff(1);
    eff(2);
    begin;
    return M(eff(3)).mbind(function () {
        return eff(4);
    }).mapply(function () {
        end;
        eff(5);
        eff(6);
    });
}
function c() {
    eff(1);
    eff(2);
    begin;
    return M(eff(3)).mbind(function () {
        return eff(4);
    }).mapply(function () {
        eff(5);
        eff(6);
    });
}