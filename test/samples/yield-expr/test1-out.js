function a() {
    return M.scope(function (root) {
        return root(1).mopt().mbind(function () {
            return eff(2);
        });
    });
}
function b() {
    return M.scope(function (root) {
        return M(eff(1)).mbind(function () {
            return root(2);
        }).mopt().mbind(function () {
            return eff(3);
        });
    });
}
function b1() {
    return M.scope(function (root) {
        return M(eff(1)).mbind(function () {
            return root(2);
        }).mopt().mbind(function () {
            return eff(3);
        });
    });
}
function c() {
    var i;
    return M.scope(function (root) {
        return function () {
            i = 0;
            return M(eff(1)).mbind(function () {
                return function (i) {
                    i++;
                    return M(eff(i)).mconst(i);
                }(i);
            }).mbind(root);
        }().mopt().mbind(function () {
            return function (i) {
                i++;
                return eff(i);
            }(i);
        });
    });
}
function d() {
    return M.scope(function (root) {
        return root(1).mopt().mbind(function () {
            return root(2);
        }).mopt().mbind(function () {
            return root(3);
        }).mopt();
    });
}
function e() {
    return M.scope(function (root) {
        return root(1).mopt().mbind(function () {
            return root(2);
        }).mopt().mbind(function () {
            return root(3);
        }).mopt();
    });
}