function a() {
  for(var i in eff(2)) {
      eff(i);
  }
};

function b() {
  var i;
  for(i in eff(2)) {
      eff(i);
  }
};

function c() {
  //TODO: maybe init() may have effects
  for(var i = init() in eff(2)) {
      eff(i);
  }
};

function d() {
  for(var i in eff(2)) {
      console.log(i);
  }
};


function e() {
  for(var i in obj) {
      eff(i);
  }
};

function f() {
  for(var i in obj) {
      console.log(i);
  }
};

function g() {
  eff("a");
  for(var i in eff(2)) {
      if (eff(i)) 
          continue;
      if (effB(i)) 
          break;
      eff("c");
  }
  eff("z");
};


function h() {
  eff("a");
  var j;
  lab: for (j in obj) {
      console.log("j");
      effA(j);
      for(var i in eff(j)) {
          console.log("b");
          eff("b");
          if (eff(i + j)) 
              continue lab;
          if (effB(i + j)) 
              break lab;
          if (eff(i)) 
              continue;
          if (effB(i)) 
              break;
          eff("c");
      }
      effB(j);
  }
  eff("z");
};

