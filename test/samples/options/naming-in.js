M.option({naming:true});
function a() {
  eff(1);
  eff(2);
}

function b() {
  for(var i = 0; i < 10; i++) {
    eff(i);
    eff(i);
  }
  for(i = eff(1); i < eff(i++); eff(i)) {
    eff(i++);
  }
}

M.option({naming:{scope:true}});
function c() {
  if (eff(1))
    return eff(2);
  eff(3);
  return eff(4);
}

M.option({naming:{prefix:"m",all:true}});
function d() {
  eff(1);
  eff(2);
}


