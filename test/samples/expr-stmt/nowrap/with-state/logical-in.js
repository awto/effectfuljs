M.option({coerce:false});

function t1() {
  var i = 0
  eff(i++) ? eff1(i) : eff2(i);
  eff(i);
}

function t2() {
  var i = 0
  eff(i)
  eff(i++) ? eff1(i) : eff2(i);
  eff(i);
}

function t2a() {
  var i = 0
  eff(i);
  i++ ? eff1(i) : eff2(i);
  eff(i);
}

function t2b() {
  var i = 0
  eff(i);
  i ? eff1(i++) : eff2(i);
  eff(i);
}

function t2c() {
  var i = 0
  eff(i);
  i++ ? eff1(i++) : eff2(i);
  eff(i);
}

function t2e() {
  var i = 0
  eff(i);
  i++ ? eff1(i++) : console.log(i);
  eff(i);
}

function t2f() {
  var i = 0
  eff(i);
  i++ ? console.log(i++) : eff(i);
  eff(i);
}

function t2g() {
  var i = 0
  eff(i);
  i++ ? console.log(i++) : console.log(i);
  eff(i);
}

function t2h() {
  var i = 0
  eff(i);
  eff(i++) ? console.log(i++) : console.log(i);
  eff(i);
}

function t3() {
  var i = 0, j = 0
  eff(i,j)
  eff(i++,j++) ? eff2(i++,j) : eff2(i,j++);
  eff(i);
}

function t4() {
  var i = 0, j = 0, k = 0
  eff(i,j,k)
  eff(i++,j++,k) ? eff2(i++,j,k++) : eff2(i,j++,k++);
  eff(i,j);
}

function t5() {
  var i = 0
  eff(i++) && eff1(i);
  eff(i);
}

function t6() {
  var i = 0
  eff(i)
  eff(i++) && eff1(i);
  eff(i);
}

function t7() {
  var i = 0
  eff(i)
  eff(i++) && eff1(i++);
  eff(i);
}


function t8() {
  var i = 0
  eff(i)
  eff(i++) && eff1(i++) && eff(i++);
  eff(i);
}


function t9() {
  var i = 0
  eff(i++) || eff1(i);
  eff(i);
}

function t10() {
  var i = 0
  eff(i)
  eff(i++) || eff1(i);
  eff(i);
}

function t11() {
  var i = 0
  eff(i)
  eff(i++) ||  eff1(i++);
  eff(i);
}


function t12() {
  var i = 0
  eff(i)
  eff(i++) || eff1(i++) || eff(i++);
  eff(i);
}
function t13() {
  var i = 0, j = 0
  eff(i,j)
  eff(i++,j++) && eff2(i++,j) && eff3(i,j++);
  eff(i);
}
function t14() {
  var i = 0, j = 0, k = 0
  eff(i,j,k)
  eff(i++,j++,k) && eff2(i++,j,k++) && eff3(i,j++,k++);
  eff(i,j);
}
