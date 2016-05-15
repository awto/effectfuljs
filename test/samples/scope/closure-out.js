function a() {
    var i, j;
    var k;
    return M(eff(i, j)).mbind(function () {
        return function (j) {
            return M(eff(i++, j++)).mconst(j);
        }(j);
    }).mbind(function (j) {
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
    }).mbind(M.spread(function (i, j) {
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
    })).mbind(M.spread(function (i, j) {
        return M(eff(i++, j++)).mconst([
            i,
            j
        ]);
    })).mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
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
    }).mbind(M.spread(function (i, j) {
        return M(k(i)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        return M(eff(i++, j++)).mconst([
            i,
            j
        ]);
    })).mapply(M.spread(function (i, j) {
        console.log(i, j);
    }));
}