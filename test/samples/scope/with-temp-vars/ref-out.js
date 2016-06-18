function a() {
    var i, j, k, l;
    return M(eff(i, j, k, l)).mbind(function () {
        var _k = k, _l = l;
        return M(eff(i++, j++, _k++, _l++)).mconst([
            _k,
            _l
        ]);
    }).mbind(function (a) {
        var k = a[0], l = a[1];
        return M(eff(i, j, k, l)).mconst([
            k,
            l
        ]);
    }).mbind(function (a) {
        var k = a[0], l = a[1];
        return M(eff(i++, j++, k++, l++)).mconst([
            k,
            l
        ]);
    }).mbind(function (a) {
        var k = a[0], l = a[1];
        return eff(i, j, k, l);
    });
}