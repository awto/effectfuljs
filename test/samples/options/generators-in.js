// *- SKIP
M.profile("compileGenerators");

function *a() {
    eff(1);
    eff(2);
};

function b() {
    eff(1);
    eff(2);
}

M.profile("generators");

function *v() {
    console.log(yield* z);
}

function *c() {
    yield* z;
};

function *d() {
    yield* z;
    yield* x;
};

function *e() {
    eff(1);
    eff(2);
    console.log((yield* eff(3)) + eff(3));
    yield* eff(eff(4));
};

