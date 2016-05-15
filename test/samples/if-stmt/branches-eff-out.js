function a() {
    return M.scope(function (root) {
        if (true)
            return eff(1).mbind(root);
        else
            return eff(2).mbind(root);
    });
}
function b() {
    return M.scope(function (root) {
        return function () {
            if (true)
                return eff(1).mbind(root);
            else
                return eff(2).mbind(root);
        }().mbind(function () {
            return eff(3);
        }).mbind(function () {
            return eff(4);
        });
    });
}
function c() {
    return M(function () {
        if (true)
            return eff(1);
        else
            return eff(2);
    }()).mbind(function () {
        return eff(3);
    }).mbind(function () {
        return eff(4);
    });
}
function d() {
    return M(eff('a')).mbind(function () {
        if (true)
            return eff(1);
        else
            return eff(2);
    }).mbind(function () {
        return eff(3);
    }).mbind(function () {
        return eff(4);
    });
}