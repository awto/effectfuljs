function ai() {
    var i;
    i += 1;
    return M(eff1(i)).mbind(function () {
        return function (i) {
            i += 2;
            return eff2(i);
        }(i);
    });
}
function aij() {
    var i, j, y;
    i++;
    return M(eff(i)).mbind(function () {
        return function (i) {
            j = 2;
            i++;
            return M(eff(j)).mconst(i);
        }(i);
    }).mbind(function (i) {
        return eff(i, j);
    }).mbind(function () {
        return eff(j);
    });
}
function aij1() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        return function (i) {
            i += j;
            return M(eff(i)).mconst(i);
        }(i);
    }).mbind(function (i) {
        return function (j) {
            j = 2;
            i++;
            return M(eff(j)).mconst([
                i,
                j
            ]);
        }(j);
    }).mbind(M.spread(function (i, j) {
        return M(eff(i, j)).mconst(j);
    })).mbind(eff);
}
function aij2() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        return function (i) {
            i += 2;
            return M(eff(i)).mconst(i);
        }(i);
    }).mbind(function (i) {
        j = 2;
        i++;
        return M(eff(j)).mconst(i);
    }).mbind(function (i) {
        return eff(i, j);
    }).mbind(function () {
        return eff(j);
    });
}
function ar() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return eff(i);
    }).mbind(function () {
        return function (i) {
            i++;
            return M(eff(i)).mconst(i);
        }(i);
    }).mbind(function (i) {
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        i++;
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        j = 2;
        i += 1;
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        return M(eff(3)).mconst(i);
    }).mbind(function (i) {
        i++;
        return M(eff(j)).mconst(i);
    }).mbind(function (i) {
        return M(eff(3)).mconst(i);
    }).mbind(function (i) {
        return function (j) {
            j = 1;
            return M(eff(i)).mconst([
                i,
                j
            ]);
        }(j);
    }).mbind(M.spread(eff));
}
function a() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return eff(i);
    }).mbind(function () {
        return function (i) {
            i++;
            return M(eff(i)).mconst(i);
        }(i);
    }).mbind(function (i) {
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        i++;
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        j = 2;
        i += 1;
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        return M(eff(i)).mconst(i);
    }).mbind(function (i) {
        return M(eff(3)).mconst(i);
    }).mbind(function (i) {
        i++;
        return M(eff(j)).mconst(i);
    }).mbind(function (i) {
        return M(eff(3)).mconst(i);
    }).mbind(function (i) {
        return function (j) {
            j = 1;
            return M(eff(i)).mconst(j);
        }(j);
    }).mbind(eff);
}
function al() {
    var i, j;
    i += 2;
    return M(eff1(i)).mbind(function () {
        return eff1(i);
    }).mbind(function () {
        return function (i) {
            i++;
            return M(eff2(i)).mconst(i);
        }(i);
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