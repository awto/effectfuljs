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
                var _i = i;
                _i++;
                return M(eff(_i)).mconst(_i);
            }).mbind(root);
        }().mopt().mbind(function () {
            var _i1 = i;
            _i1++;
            return eff(_i1);
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
function f() {
    return M.scope(function (root) {
        return root(1).mopt().mbind(root).mopt().mbind(function () {
            return root(3);
        }).mopt();
    });
}