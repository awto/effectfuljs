function a() {
    var i, j, k, l;
    return M(eff(i, j, k, l)).mbind(function () {
        var _k = k, _l = l;
        return M(eff(i++, j++, _k++, _l++)).mconst([
            _k,
            _l
        ]);
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