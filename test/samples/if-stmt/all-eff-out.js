function a() {
    return M.scope(function (root) {
        return M(eff(1)).mbind(function (b) {
            if (b)
                return M(eff(2)).mbind(root);
            else
                return M(eff(3)).mbind(root);
        });
    });
}