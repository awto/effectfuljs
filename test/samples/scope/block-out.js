function a() {
    var i, j;
    return M.block(function (lab) {
        i++;
        return M(eff(i)).mbind(function () {
            return function (i, j) {
                return M(eff(i += 1, j += 1)).mconst(i);
            }(i, j);
        }).mbind(function (i) {
            i += 3;
            return M(eff(i)).mbind(function () {
                return function (i) {
                    return M(eff(i += 4)).mconst(i);
                }(i);
            }).mbind(function (i) {
                return M(function () {
                    if (false)
                        return lab(i);
                }()).mapply(function () {
                    return i;
                });
            });
        });
    }).mbind(eff);
}
function a1() {
    var i, j;
    return M(eff()).mbind(function () {
        return function (i) {
            return M.block(function (lab) {
                i++;
                return M(eff(i)).mbind(function () {
                    return function (i, j) {
                        return M(eff(i += 1, j += 1)).mconst(i);
                    }(i, j);
                }).mbind(function (i) {
                    i += 3;
                    return M(eff(i)).mbind(function () {
                        return function (i) {
                            return M(eff(i += 4)).mconst(i);
                        }(i);
                    }).mbind(function (i) {
                        return M(function () {
                            if (false)
                                return lab(i);
                        }()).mapply(function () {
                            return i;
                        });
                    });
                });
            });
        }(i);
    }).mbind(eff);
}
function b() {
    var i, j;
    return M.block(function (lab) {
        i++;
        return M(eff(i)).mbind(function () {
            return function (i, j) {
                return M(eff(i += 1, j += 1)).mconst(i);
            }(i, j);
        }).mbind(function (i) {
            i += 3;
            return M(eff(i)).mbind(function () {
                return function (i) {
                    return M(eff(i += 4)).mconst(i);
                }(i);
            }).mbind(lab);
        });
    }).mbind(eff);
}
function c() {
    var i, j;
    return M.scope(function (root) {
        return M.block(function (lab) {
            i++;
            return M(eff(i)).mbind(function () {
                return function (i, j) {
                    return M(eff(i += 1, j += 1)).mconst(i);
                }(i, j);
            }).mbind(function (i) {
                i += 3;
                return M(eff(i)).mbind(function () {
                    return function (i) {
                        return M(eff(i += 6)).mconst(i);
                    }(i);
                });
            }).mbind(function (i) {
                return root(i += 5);
            });
        }).mbind(function (i) {
            return M(eff(i)).mconst(i);
        }).mbind(function (i) {
            return eff(i += 7);
        });
    });
}
function c0() {
    var i, j;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            return M(eff(i += 1, j += 1)).mconst(i);
        }(i, j);
    }).mbind(function (i) {
        return M(eff(i)).mconst(i);
    }).mbind(eff);
}
function c1() {
    var i, j;
    return M.scope(function (root) {
        return M.block(function (lab) {
            i++;
            return M(eff(i)).mbind(function () {
                return function (i, j) {
                    return M(eff(i += 1, j += 1)).mconst(i);
                }(i, j);
            }).mbind(function (i) {
                return M.block(function (lab2) {
                    i += 3;
                    return M(eff(i)).mbind(function () {
                        return function (i) {
                            return M(eff(i += 6)).mconst(i);
                        }(i);
                    }).mbind(function (i) {
                        return M(function () {
                            if (true)
                                return lab2(i);
                        }()).mapply(function () {
                            return i;
                        });
                    }).mbind(function (i) {
                        return M(eff(i)).mconst(i);
                    }).mbind(function (i) {
                        return M(eff(i++)).mconst(i);
                    }).mbind(function (i) {
                        return M(function () {
                            if (true)
                                return lab(i);
                        }()).mapply(function () {
                            return i;
                        });
                    }).mbind(function (i) {
                        return M(eff(i)).mconst(i);
                    }).mbind(function (i) {
                        return M(eff(i++)).mconst(i);
                    });
                });
            }).mbind(function (i) {
                return root(i += 5);
            });
        }).mbind(function (i) {
            return M(eff(i)).mconst(i);
        }).mbind(function (i) {
            return eff(i += 7);
        });
    });
}
function c2() {
    var i, j;
    return M.scope(function (root) {
        return M(eff()).mbind(function () {
            return function (i) {
                return M.block(function (lab) {
                    i++;
                    return M(eff(i)).mbind(function () {
                        return function (i, j) {
                            return M(eff(i += 1, j += 1)).mconst([
                                i,
                                j
                            ]);
                        }(i, j);
                    }).mbind(M.spread(function (i, j) {
                        return M.block(function (lab2) {
                            i += 3;
                            return M(eff(i)).mbind(function () {
                                return function (i) {
                                    return M(eff(i += 4)).mconst(i);
                                }(i);
                            }).mbind(function (i) {
                                return M(function () {
                                    if (true)
                                        return lab2(i);
                                }()).mapply(function () {
                                    return i;
                                });
                            }).mbind(function (i) {
                                return M(eff(i)).mconst(i);
                            }).mbind(function (i) {
                                return M(eff(i++)).mconst(i);
                            }).mbind(function (i) {
                                return M(function () {
                                    if (true)
                                        return lab([
                                            i,
                                            j
                                        ]);
                                }()).mapply(function () {
                                    return i;
                                });
                            }).mbind(function (i) {
                                return M(eff(i)).mconst(i);
                            }).mbind(function (i) {
                                return M(eff(i++)).mconst(i);
                            });
                        }).mapply(function (i) {
                            return [
                                i,
                                j
                            ];
                        });
                    })).mbind(M.spread(function (i, j) {
                        return root(i += 5);
                    }));
                });
            }(i);
        }).mbind(M.spread(function (i, j) {
            return M(eff(i, j)).mconst(i);
        })).mbind(function (i) {
            return eff(i += 7);
        });
    });
}
function d() {
    var i, j;
    return M.scope(function (root) {
        return M(eff(i++)).mbind(function () {
            if (t1)
                return root(i += 5);
        }).mapply(function () {
            console.log(i);
        });
    });
}