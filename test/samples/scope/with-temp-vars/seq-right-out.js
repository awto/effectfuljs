function ai() {
    var i;
    i += 1;
    return M(eff1(i)).mbind(function () {
        var _i = i;
        _i += 2;
        return eff2(_i);
    });
}
function aij() {
    var i, j, y;
    i++;
    return M(eff(i)).mbind(function () {
        var _i = i, _j;
        _j = 2;
        _i++;
        return M(eff(_j)).mconst([
            _i,
            _j
        ]);
    }).mbind(M.spread(function (i, j) {
        return M(eff(i, j)).mconst(j);
    })).mbind(eff);
}
function aij1() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        var _i = i;
        _i += j;
        return M(eff(_i)).mconst(_i);
    }).mbind(function (i) {
        var _j = j;
        _j = 2;
        i++;
        return M(eff(_j)).mconst([
            i,
            _j
        ]);
    }).mbind(M.spread(function (i, j) {
        return M(eff(i, j)).mconst(j);
    })).mbind(eff);
}
function aij2() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        var _i = i;
        _i += 2;
        return M(eff(_i)).mconst(_i);
    }).mbind(function (i) {
        var _j;
        _j = 2;
        i++;
        return M(eff(_j)).mconst([
            i,
            _j
        ]);
    }).mbind(M.spread(function (i, j) {
        return M(eff(i, j)).mconst(j);
    })).mbind(eff);
}
function ar() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return eff(i);
    }).mbind(function () {
        var _i = i;
        _i++;
        return M(eff(_i)).mconst(_i);
    }).mbind(function (i) {
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        i++;
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        var _j;
        _j = 2;
        i += 1;
        return M(eff(i)).mconst([
            i,
            _j
        ]);
    }).mbind(M.spread(function (i, j) {
        return M(eff(3)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        i++;
        return M(eff(j)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        return M(eff(3)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        j = 1;
        return M(eff(i)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(eff));
}
function a() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return eff(i);
    }).mbind(function () {
        var _i = i;
        _i++;
        return M(eff(_i)).mconst(_i);
    }).mbind(function (i) {
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        i++;
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        var _j;
        _j = 2;
        i += 1;
        return M(eff(i)).mconst([
            i,
            _j
        ]);
    }).mbind(M.spread(function (i, j) {
        return M(eff(i)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        return M(eff(3)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        i++;
        return M(eff(j)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        return M(eff(3)).mconst([
            i,
            j
        ]);
    })).mbind(M.spread(function (i, j) {
        j = 1;
        return M(eff(i)).mconst(j);
    })).mbind(eff);
}
function al() {
    var i, j;
    i += 2;
    return M(eff1(i)).mbind(function () {
        return eff1(i);
    }).mbind(function () {
        var _i = i;
        _i++;
        return M(eff2(_i)).mconst(_i);
    }).mbind(function (i) {
        return M(eff2(i)).mconst(i);
    }).mbind(function (i) {
        i += 3;
        return M(eff3(i)).mconst(i);
    }).mbind(function (i) {
        return M(eff4(i)).mconst(i);
    }).mbind(function (i) {
        i++;
        return eff5(i);
    });
}
function b() {
    var i;
    i = new Something();
    return M(i.next()).mbind(function (b) {
        var _i1 = i;
        _i1 = b;
        return M(_i1.next()).mapply(function (b1) {
            var _i = i;
            _i = b1;
            return _i;
        });
    }).mbind(function (i) {
        return M(i.next()).mapply(function (b2) {
            var _i2 = i;
            _i2 = b2;
        });
    });
}