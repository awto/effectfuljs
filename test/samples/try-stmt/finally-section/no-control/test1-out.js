function a() {
    return M.coerce(function () {
        return eff('in body');
    }).mfinally(function () {
        return eff('in `finally`');
    }).mbind(function () {
        return eff('after `finally`');
    });
}
function b() {
    return M.coerce(function () {
        return eff('in body');
    }).mhandle(function (e) {
        return eff('in `catch`', e);
    }).mfinally(function () {
        return eff('in `finally`');
    }).mbind(function () {
        return eff('after `finally`');
    });
}
function c() {
    return M.coerce(function () {
        return eff('in body');
    }).mfinally(function () {
        console.log('in `finally`');
    }).mbind(function () {
        return eff('after `finally`');
    });
}
function d() {
    return M.coerce(function () {
        console.log('in body');
    }).mfinally(function () {
        return eff('in `finally`');
    }).mbind(function () {
        return eff('after `finally`');
    });
}
function e() {
    console.log('before');
    return M(eff('before')).mbind(function () {
        return M.coerce(function () {
            console.log('in body');
            return eff('in body');
        }).mhandle(function (e) {
            console.log('catch', e);
            return M(eff('catch', e)).mapply(function () {
                console.log('catch', e);
            });
        }).mfinally(function () {
            console.log('in finally');
            return M(eff('in `finally`')).mapply(function () {
                console.log('in finally 2');
            });
        });
    }).mbind(function () {
        console.log('after `finally`');
        return eff('after `finally`');
    });
}
function f() {
    return M.coerce(function () {
        return eff('in body');
    }).mhandle(function (e) {
        return eff('in `catch`');
    }).mfinally(function () {
        console.log('in `finally`');
    }).mbind(function () {
        return eff('after `finally`');
    });
}
function g() {
    return M.coerce(function () {
        return eff('in body');
    }).mhandle(function (e) {
        console.log('in `catch`');
    }).mfinally(function () {
        console.log('in `finally`');
    }).mbind(function () {
        return eff('after `finally`');
    });
}