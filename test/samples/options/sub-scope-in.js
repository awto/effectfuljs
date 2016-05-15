
M.profile("minimal")

function a() {
    M(eff(1));
    (function() {
        var k = M(eff(2));
        k + 1;
    })();
    M(eff(3));
}

M.option({subScope: false})

function b() {
    M(eff(1));
    (function() {
        var k = M(eff(2));
        k + 1;
    })();
    M(eff(3));
}

