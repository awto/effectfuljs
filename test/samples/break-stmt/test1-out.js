(function () {
    return M(eff(1)).mbind(function () {
        return M.block(function (lab) {
            return M(eff(2)).mbind(function (b) {
                if (b)
                    return lab();
                else
                    return eff(3);
            });
        });
    }).mbind(function () {
        return eff(4);
    }).mbind(function () {
        return eff(5);
    });
});
(function () {
    return M(eff(1)).mbind(function () {
        return M.block(function (lab) {
            return M(eff(2)).mbind(function (b) {
                if (b)
                    return M(eff('a')).mbind(lab);
                else
                    return eff(3);
            });
        });
    }).mbind(function () {
        return eff(4);
    }).mbind(function () {
        return eff(5);
    });
});
(function () {
    return M.scope(function (root) {
        return M(eff(1)).mbind(function () {
            return M(eff(2)).mbind(function (b) {
                if (b)
                    return M(eff('a')).mbind(function () {
                        return M(eff('b')).mbind(root);
                    });
            });
        }).mbind(function () {
            return eff(4);
        }).mbind(function () {
            return eff(5);
        });
    });
});