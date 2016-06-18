function a() {
    var i, j;
    var k;
    return M(eff(i, j)).mbind(function () {
        var _j = j;
        return M(eff(i++, _j++)).mconst(_j);
    }).mbind(function (j) {
        var _k;
        _k = function () {
            var j;
            return M(eff(i, j)).mbind(function () {
                var _j = j;
                return M(eff(i++, _j++)).mconst(_j);
            }).mbind(function (j) {
                return eff(i, j);
            });
        };
        return M(_k()).mconst(j);
    }).mbind(function (j) {
        return M(eff(i++, j++)).mconst(j);
    }).mapply(function (j) {
        console.log(i, j);
    });
}
function a1() {
    var i, j;
    var k;
    return M(eff(i, j)).mbind(function () {
        var _i = i, _j = j;
        return M(eff(_i++, _j++)).mconst([
            _i,
            _j
        ]);
    }).mbind(function (a) {
        var i = a[0], j = a[1], _k;
        _k = function (i) {
            var j;
            return M(eff(i, j)).mbind(function () {
                var _i = i, _j = j;
                return M(eff(_i++, _j++)).mconst([
                    _i,
                    _j
                ]);
            }).mbind(M.spread(eff));
        };
        return M(_k()).mconst([
            i,
            j
        ]);
    }).mbind(function (a) {
        var i = a[0], j = a[1];
        return M(eff(i++, j++)).mconst([
            i,
            j
        ]);
    }).mapply(function (a) {
        var i = a[0], j = a[1];
        console.log(i, j);
    });
}
function b() {
    var i, j;
    function k() {
        var j;
        return M(eff(i, j)).mbind(function () {
            var _j = j;
            return M(eff(i++, _j++)).mconst(_j);
        }).mbind(function (j) {
            return eff(i, j);
        });
    }
    return M(eff(i, j)).mbind(k).mbind(function () {
        var _j = j;
        return M(eff(i++, _j++)).mconst(_j);
    }).mbind(function (j) {
        return M(k()).mconst(j);
    }).mbind(function (j) {
        return M(eff(i++, j++)).mconst(j);
    }).mapply(function (j) {
        console.log(i, j);
    });
}
function b1() {
    var i, j;
    function k(i) {
        var j;
        return M(eff(i, j)).mbind(function () {
            var _i = i, _j = j;
            return M(eff(_i++, _j++)).mconst([
                _i,
                _j
            ]);
        }).mbind(M.spread(eff));
    }
    return M(eff(i, j)).mbind(k).mbind(function () {
        var _i = i, _j = j;
        return M(eff(_i++, _j++)).mconst([
            _i,
            _j
        ]);
    }).mbind(function (a) {
        var i = a[0], j = a[1];
        return M(k(i)).mconst([
            i,
            j
        ]);
    }).mbind(function (a) {
        var i = a[0], j = a[1];
        return M(eff(i++, j++)).mconst([
            i,
            j
        ]);
    }).mapply(function (a) {
        var i = a[0], j = a[1];
        console.log(i, j);
    });
}