function aM(a) {
    console.log(a + 10);
    return M.pure();
}
function bM(a) {
    return M.pure(a + 10);
}
function bP(a) {
    return a + 10;
}
cM = function a(a) {
    return M.pure(a + 10);
};
cP = function aM(a) {
    return a + 10;
};
function aP(a) {
    eff(a + 10);
    eff(2);
}
bP = function () {
    eff(a + 10);
    eff(2);
};