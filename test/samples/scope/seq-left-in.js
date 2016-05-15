M.option({bindAssoc:"left"});

function ai() {
    var i;
    i+=1;
    eff1(i);
    i+=2;
    eff2(i);
}

function aij() {
  var i, j, y;
  i++;
  eff(i);
  j = 2;
  i++;
  eff(j);
  eff(i,j);
  eff(j);
}

function aij1() {
  var i, j, y;
  eff(1);
  i+=j;
  eff(i);
  j = 2;
  i++;
  eff(j);
  eff(i,j);
  eff(j);
}

function aij2() {
  var i, j, y;
  eff(1);
  i+=2;
  eff(i);
  j = 2;
  i++;
  eff(j);
  eff(i,j);
  eff(j);
}

function aij3() {
  var i, j=0, y;
  i++;
  eff(i);
  j = 2;
  i++;
  eff(j);
  eff(i,j);
  eff(j);
}

function ar() {
  var i, j;
  i++;
  eff(i);
  eff(i);
  i++;
  eff(i);
  eff(i);
  i++;
  eff(i); 
  j = 2;
  i+=1;
  eff(i);
  eff(3);
  i++;
  eff(j);
  eff(3);
  j=1;
  eff(i);
  eff(i,j);
}

function a() {
  var i, j;
  i++;
  eff(i);
  eff(i);
  i++;
  eff(i);
  eff(i);
  i++;
  eff(i);
  j = 2;
  i+=1;
  eff(i);
  eff(i);
  eff(3);
  i++;
  eff(j);
  eff(3);
  j=1;
  eff(i);
  eff(j);
}

function al() {
  var i, j;
  i+=2;
  eff1(i);
  eff1(i);
  i++;
  eff2(i);
  eff2(i);
  i+=3;
  eff3(i);
  eff4(i);
  i++;
  eff5(i);
}
