function a() {
    var i, j, k, l;
    return M(eff(i, j, k, l)).mbind(function () {
        return function (k, l) {
            return M(eff(i++, j++, k++, l++)).mconst([
                k,
                l
            ]);
        }(k, l);
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