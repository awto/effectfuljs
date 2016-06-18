function a() {
    var i, j;
    var k;
    return M(eff(i, j)).mbind(function () {
        return function (j) {
            return M(eff(i++, j++)).mconst(j);
        }(j);
    }).mbind(function (j) {
        return function (k) {
            k = function () {
                var j;
                return M(eff(i, j)).mbind(function () {
                    return function (j) {
                        return M(eff(i++, j++)).mconst(j);
                    }(j);
                }).mbind(function (j) {
                    return eff(i, j);
                });
            };
            return M(k()).mconst(j);
        }(k);
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
        return function (i, j) {
            return M(eff(i++, j++)).mconst([
                i,
                j
            ]);
        }(i, j);
    }).mbind(function (a) {
        var i = a[0], j = a[1];
        return function (k) {
            k = function (i) {
                var j;
                return M(eff(i, j)).mbind(function () {
                    return function (i, j) {
                        return M(eff(i++, j++)).mconst([
                            i,
                            j
                        ]);
                    }(i, j);
                }).mbind(M.spread(eff));
            };
            return M(k()).mconst([
                i,
                j
            ]);
        }(k);
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
            return function (j) {
                return M(eff(i++, j++)).mconst(j);
            }(j);
        }).mbind(function (j) {
            return eff(i, j);
        });
    }
    return M(eff(i, j)).mbind(k).mbind(function () {
        return function (j) {
            return M(eff(i++, j++)).mconst(j);
        }(j);
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
            return function (i, j) {
                return M(eff(i++, j++)).mconst([
                    i,
                    j
                ]);
            }(i, j);
        }).mbind(M.spread(eff));
    }
    return M(eff(i, j)).mbind(k).mbind(function () {
        return function (i, j) {
            return M(eff(i++, j++)).mconst([
                i,
                j
            ]);
        }(i, j);
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