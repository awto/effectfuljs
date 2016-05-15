function a(){
  var b1 = eff(1);
  eff("a");
  eff("b");
}

function a1(){
  var b1;
  b1 = eff(1);
  eff("a");
  eff("b");
}

function b(){
  var b1 = eff(1), b2 = eff(2);
  eff(b1);
  eff(b2);
}


function b1(){
  var b1, b2;
  b1 = eff(1), b2 = eff(2);
  eff(b1);
  eff(b2);
}

function c(){
    var a = eff(1), b = 2, c = eff(3);
    eff("a");
    eff("b");
    var d = eff(4), e = 5, f = eff(6), 
        g = eff(7), j = 8;
    var x = eff("x"), y = "y", z = eff("z");
    eff(9);
    eff(10);
}

function d() {
  eff1("a").some = eff(2);
  eff("b").some+=eff(3);
  eff("c").some++;
  some['d']--;
}

