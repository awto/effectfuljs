function a() {
  var i = 0,
    k = 0;
  eff(1, i, k);
  k++;
  function b() {
    var j = i;
    eff(2, j);
    eff(3, i);
  }
  eff(4, i, k);
  eff(5, i, k);
}

function zzz(zz) {
  aaaa();
  function aaaa() {
    eff1();
  }
  function aaaa() {
    eff2();
  }
  var aaaa = function bbbb() {
    eff3();
  };
  aaaa();
}
