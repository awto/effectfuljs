function a() {
    try {
        eff("in body");
    } finally {
        eff("in `finally`");
    }
    eff("after `finally`");
};

function b() {
    try {
        eff("in body");
    } catch(e) {
        eff("in `catch`",e);
    } finally {
        eff("in `finally`");
    }
    eff("after `finally`");
};

function c() {
    try {
        eff("in body");
    } finally {
        console.log("in `finally`");
    }
    eff("after `finally`");
};
function d() {
    try {
        console.log("in body");
    } finally {
        eff("in `finally`");
    }
    eff("after `finally`");
};
function e() {
    console.log("before");
    eff("before");
    try {
        console.log("in body");
        eff("in body");
    } catch(e) {
        console.log("catch", e);
        eff("catch", e);
        console.log("catch", e);
    } finally {
        console.log("in finally");
        eff("in `finally`");
        console.log("in finally 2");
    }
    console.log("after `finally`");
    eff("after `finally`");
};


function f() {
    try {
        eff("in body");
    } catch(e) {
        eff("in `catch`");
    } finally {
        console.log("in `finally`");
    }
    eff("after `finally`");
};


function g() {
    try {
        eff("in body");
    } catch(e) {
        console.log("in `catch`");
    } finally {
        console.log("in `finally`");
    }
    eff("after `finally`");
};
