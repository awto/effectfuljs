function a() {
    var i, j, k, l;
    return M(eff(i, j, k, l)).mbind(function () {
        return function (k, l) {
            return M(eff(i++, j++, k++, l++)).mconst([
                k,
                l
            ]);
        }(k, l);
    }).mbind(M.spread(function (k, l) {
        return M(eff(i, j, k, l)).mconst([
            k,
            l
        ]);
    })).mbind(M.spread(function (k, l) {
        return M(eff(i++, j++, k++, l++)).mconst([
            k,
            l
        ]);
    })).mbind(M.spread(function (k, l) {
        return eff(i, j, k, l);
    }));
}