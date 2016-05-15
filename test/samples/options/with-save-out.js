function a() {
    return M(function () {
        eff(0);
        return M(eff(1)).mbind(function () {
            return eff(2);
        }).mbind(function () {
            return function () {
                return M(eff(0)).mbind(function () {
                    return eff(1);
                }).mbind(function () {
                    return eff(2);
                }).mbind(function () {
                    return function () {
                        return M(eff(0)).mapply(function () {
                            eff(1);
                            eff(2);
                        });
                    }();
                });
            }();
        });
    }()).mapply(function () {
        eff(1);
        eff(2);
    });
}