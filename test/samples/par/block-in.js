// *- SKIP
function a$default() {
    var a, b, c, d, e;
    a = eff1(1);
    b = eff2(2);
    c = eff3(3,a);
    d = eff4(4,a);
    e = eff5(5);
    console.log(a + c);
}

M.option({block:{par:"all"}});

function a$par$all() {
    var a, b, c, d, e;
    a = eff1(1);
    b = eff2(2);
    c = eff3(3,a);
    d = eff4(4,a);
    e = eff5(5);
    console.log(a + c);
}
M.option({block:{par:"reorderByLhsUsage"}});

function a$par$r$lhs$usage() {
    var a, b, c, d, e;
    a = eff1(1);
    b = eff2(2);
    c = eff3(3,a);
    d = eff4(4,a);
    e = eff5(5);
    console.log(a + c);
}

M.option({block:{par:"reorderByUsage"}});

function a$par$r$usage() {
    var a, b, c, d, e;
    a = eff1(1);
    b = eff2(2);
    c = eff3(3,a);
    d = eff4(4,a);
    e = eff5(5);
    console.log(a + c);
}

M.option({block:{par:"byLhsUsage"}});

function a$par$lhs$usage() {
    var a, b, c, d, e;
    a = eff1(1);
    b = eff2(2);
    c = eff3(3,a);
    d = eff4(4,a);
    e = eff5(5);
    console.log(a + c);
}

M.option({block:{par:"byUsage"}});

function a$par$usage() {
    var a, b, c, d, e;
    a = eff1(1);
    b = eff2(2);
    c = eff3(3,a);
    d = eff4(4,a);
    e = eff5(5);
    console.log(a + c);
}
