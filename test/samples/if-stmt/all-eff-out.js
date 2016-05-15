function a() {
    return M.scope(function (root) {
        return M(eff(1)).mbind(function (b) {
            if (b)
                return eff(2).mbind(root);
            else
                return eff(3).mbind(root);
        });
    });
}