M.option({coerce:"none"});

function a1() {
    eff(1) || eff(2);
}

function a2() {
    eff(1) && eff(2);
}

function a3() {
    eff(1) || eff(2) || eff(3);
}

function a4() {
    eff(1) && eff(2) && eff(3);
}

function a5() {
    1 || eff(2);
}

function a6() {
    eff(2) || 1;
}

function a7() {
    1 + 1 || eff(2);
}

function a8() {
    eff(2) || 1 + 1;
}

function a9() {
    1 && eff(2);
}

function a10() {
    eff(2) && 1;
}

function a11() {
    1 + 1 && eff(2);
}

function a12() {
    eff(2) && 1 + 1;
}

function a13() {
    eff(1) ? eff(2) : eff(3);
}

function a14() {
    eff(1) ? 2 : eff(3);
}

function a15() {
    eff(1) ? eff(2) : 3;
}

function a16() {
    1 ? eff(2) : eff(3);
}

function a17() {
    eff(1) ? 2 : 3;
}

function b() {
    eff(1) || eff(2);
    eff(1) && eff(2);
    1 || eff(2);
    eff(2) || 1;
    1 + 1 || eff(2);
    eff(2) || 1 + 1;
    1 && eff(2);
    eff(2) && 1;
    1 + 1 && eff(2);
    eff(2) && 1 + 1;
    eff(1) ? eff(2) : eff(3);
    eff(1) ? 2 : eff(3);
    eff(1) ? eff(2) : 3;
    1 ? eff(2) : eff(3);
    eff(1) ? 2 : 3;
}


