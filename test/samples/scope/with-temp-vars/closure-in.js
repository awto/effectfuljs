function a() {
    var i, j;
    eff(i,j);
    eff(i++,j++);
    var k = function() {
        var j;
        eff(i,j);
        eff(i++,j++);
        eff(i,j);
    };
    k();
    eff(i++,j++);
    console.log(i,j);
};
function a1() {
    var i, j;
    eff(i,j);
    eff(i++,j++);
    var k = function(i) {
        var j;
        eff(i,j);
        eff(i++,j++);
        eff(i,j);
    };
    k();
    eff(i++,j++);
    console.log(i,j);
};

function b() {
    var i, j;
    eff(i,j);
    k();
    eff(i++,j++);
    function k() {
        var j;
        eff(i,j);
        eff(i++,j++);
        eff(i,j);
    };
    k();
    eff(i++,j++);
    console.log(i,j);
};

function b1() {
    var i, j;
    eff(i,j);
    k();
    eff(i++,j++);
    function k(i) {
        var j;
        eff(i,j);
        eff(i++,j++);
        eff(i,j);
    };
    k(i);
    eff(i++,j++);
    console.log(i,j);
};


