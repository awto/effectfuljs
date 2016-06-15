function ai() {
    var i;
    i += 1;
    return M(eff1(i)).mbind(function () {
        i += 2;
        return eff2(i);
    });
}
function aij() {
    var i, j, y;
    i++;
    return M(eff(i)).mbind(function () {
        j = 2;
        i++;
        return eff(j);
    }).mbind(function () {
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
        i++;
        return eff(i);
    }).mbind(function () {
        return eff(i);
    }).mbind(function () {
        i++;
        return eff(i);
    }).mbind(function () {
        j = 2;
        i += 1;
        return eff(i);
    }).mbind(function () {
        return eff(3);
    }).mbind(function () {
        i++;
        return eff(j);
    }).mbind(function () {
        return eff(3);
    }).mbind(function () {
        j = 1;
        return eff(i);
    }).mbind(function () {
        return eff(i, j);
    });
}
function a() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return eff(i);
    }).mbind(function () {
        i++;
        return eff(i);
    }).mbind(function () {
        return eff(i);
    }).mbind(function () {
        i++;
        return eff(i);
    }).mbind(function () {
        j = 2;
        i += 1;
        return eff(i);
    }).mbind(function () {
        return eff(i);
    }).mbind(function () {
        return eff(3);
    }).mbind(function () {
        i++;
        return eff(j);
    }).mbind(function () {
        return eff(3);
    }).mbind(function () {
        j = 1;
        return eff(i);
    }).mbind(function () {
        return eff(j);
    });
}
function al() {
    var i, j;
    i += 2;
    return M(eff1(i)).mbind(function () {
        return eff1(i);
    }).mbind(function () {
        i++;
        return eff2(i);
    }).mbind(function () {
        return eff2(i);
    }).mbind(function () {
        i += 3;
        return eff3(i);
    }).mbind(function () {
        return eff4(i);
    }).mbind(function () {
        i++;
        return eff5(i);
    });
}