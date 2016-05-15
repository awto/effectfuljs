function a() {
    console.log("in");
    try {
        console.log("inner");
        eff("inner");
    } catch (e) {
        console.log("exception", e)
        eff("exception",e);
    }
    console.log("out");
    eff("out",e);
};

