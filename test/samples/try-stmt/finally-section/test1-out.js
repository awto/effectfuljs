function a() {
    return M.scope(function (root) {
        return M.coerce(function () {
            return M(eff('in body')).mbind(function (b) {
                if (b)
                    return root();
            });
        }).mfinally(function () {
            return eff('in `finally`');
        }).mbind(function () {
            return eff('after `finally`');
        });
    });
}