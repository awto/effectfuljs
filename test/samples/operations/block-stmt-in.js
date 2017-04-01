// *- SKIP
M.option({closure:false,state:false,persistence:true})

function a() {
  eff1(eff(2),eff(3));
}

function b() {
  eff1(eff(i++),eff(i++));
}

