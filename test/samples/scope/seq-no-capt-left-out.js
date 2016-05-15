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
        return M(eff(j)).mbind(function () {
            return M(eff(i, j)).mbind(function () {
                return eff(j);
            });
        });
    });
}
function ar() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return M(eff(i)).mbind(function () {
            i++;
            return M(eff(i)).mbind(function () {
                return M(eff(i)).mbind(function () {
                    i++;
                    return M(eff(i)).mbind(function () {
                        j = 2;
                        i += 1;
                        return M(eff(i)).mbind(function () {
                            return M(eff(3)).mbind(function () {
                                i++;
                                return M(eff(j)).mbind(function () {
                                    return M(eff(3)).mbind(function () {
                                        j = 1;
                                        return M(eff(i)).mbind(function () {
                                            return eff(i, j);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function a() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return M(eff(i)).mbind(function () {
            i++;
            return M(eff(i)).mbind(function () {
                return M(eff(i)).mbind(function () {
                    i++;
                    return M(eff(i)).mbind(function () {
                        j = 2;
                        i += 1;
                        return M(eff(i)).mbind(function () {
                            return M(eff(i)).mbind(function () {
                                return M(eff(3)).mbind(function () {
                                    i++;
                                    return M(eff(j)).mbind(function () {
                                        return M(eff(3)).mbind(function () {
                                            j = 1;
                                            return M(eff(i)).mbind(function () {
                                                return eff(j);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function al() {
    var i, j;
    i += 2;
    return M(eff1(i)).mbind(function () {
        return M(eff1(i)).mbind(function () {
            i++;
            return M(eff2(i)).mbind(function () {
                return M(eff2(i)).mbind(function () {
                    i += 3;
                    return M(eff3(i)).mbind(function () {
                        return M(eff4(i)).mbind(function () {
                            i++;
                            return eff5(i);
                        });
                    });
                });
            });
        });
    });
}