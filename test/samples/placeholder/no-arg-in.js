function a() {
    M.$.eff(1);
}

function b() {
    eff(1);
    M.$.eff(2);
    M.$.eff(3);
}

function c() {
    eff(1);
    eff(2);
    M.$.eff(3);
    eff(4);
}

function d() {
    eff(1);
    eff(2);
    M.$.eff(3);
    eff(4);
    M.$.eff(5);
    eff(6);
}

function e() {
    eff(1);
    eff(2);
    var k = M.$.eff(3) + M.$.eff(4);
    eff(5);
}

function f() {
    eff(1);
    {
        eff(2);
        eff(3);
        M.$.eff(4);
    }
    eff(5);
    M.$.eff(6);
}

// variables changed inside captured block are treated as references
function g() {
  var i; 
  eff1(i);
  i++;
  eff2(i);
  M.$.eff3(i);
  i++;
  eff4(i);
  M.$.eff5(i);
  eff6(i);
}

function g1() {
  var i,j; 
  eff1(i,j);
  j++;
  {
    eff(i,j);
    i++;
    eff2(i,j);
    M.$.eff3(i,j);
    i++;
    eff4(i,j);
    M.$.eff5(i,j);
    j++;
    eff(i,j)
  }
  eff6(i,j);
}
