function a() {
    var i, j, k;
    return M(eff(k)).mbind(function () {
        var _k1 = k;
        _k1++;
        return M.coerce(function () {
            return M(eff(i)).mbind(function () {
                var _k = k;
                i++;
                _k++;
                j = i;
                return M(eff(i, j, _k)).mconst(_k);
            }).mbind(function (k) {
                return M(eff(i, j)).mconst(k);
            });
        }).mhandle(function (e) {
            console.log(i, j, e);
        }).mconst(_k1);
    }).mbind(function (k) {
        return M(eff(k += 1)).mconst(k);
    }).mapply(function (k) {
        console.log(k);
    });
}
function b() {
    var i, j, k;
    return M(eff(k)).mbind(function () {
        var _k = k;
        _k++;
        return M.coerce(function () {
            return M(eff(i)).mbind(function () {
                i++;
                j = i;
                return eff(i, j);
            });
        }).mhandle(function (e) {
            console.log(i, j, e);
        }).mconst(_k);
    }).mbind(function (k) {
        return M(eff(k += 1)).mconst(k);
    }).mapply(function (k) {
        console.log(k);
    });
}