// *- when there is a mix of pure and effectful branches
M.option({coerce:"none"});
function a() {
    if (true)
        return eff(1);
    else
        return 3;
};
function b() {
    if (true)
        eff(1);
    else
        console.log(3);
    eff(3);
    eff(4);
};
function c() {
    if (true)
        eff(1);
    else {
        console.log(3);
        return 3;
    }
    eff(3);
    eff(4);
};
function d() {
    eff('a');
    if (true)
        eff(1);
    else {
        console.log(3);
    }
    eff(3);
    eff(4);
};
function e() {
    if (eff("1"))
        return;
    eff("2");
};
function f() {
    if (eff("1"))
        return eff("i");
    eff("2");
};
function g() {
    if (eff("1"))
        return;
    console.log("2");
};
function h() {
    if (eff("1"))
        return;
    console.log("2");
    eff("2");
};
function i() {
    if (eff("1"))
        return;
    console.log("2");
    eff(2);
};
function j() {
    if (eff("1"))
        return;
    console.log("2");
    eff(2);
    console.log("3");
};
