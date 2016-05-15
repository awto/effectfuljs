
function a() {
    var k = eff(1);
    M.$(k).eff(2);
}

function b() {
    var k = eff(1);
    eff(2);
    console.log(M.$(k).eff(3) + M.$(1).eff(4));
    eff(5);
}


