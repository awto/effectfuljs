function a() {
    return M.scope(function (root) {
        return M(eff(1)).mbind(function (b) {
            if (b)
                return root(1);
            else
                return root(2);
        });
    });
}