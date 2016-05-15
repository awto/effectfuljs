function a() {
    console.log("in");
    try {
        console.log("inner");
    } catch (e) {
        console.log("exception", e)
    }
    console.log("out");
};

function b() {
    console.log("in");
    try {
        console.log("inner");
    } catch (e) {
        console.log("exception", e)
    } finally {
        console.log("fin");
    }
    console.log("out");
};


function c() {
    console.log("in");
    try {
        console.log("inner");
    } finally {
        console.log("fin");
    }
    console.log("out");
};
