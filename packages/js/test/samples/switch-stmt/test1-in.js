
function a() {
  switch(eff()) {
  case effC(1): 
    effR(1);
    break
  case effC(2): 
    effR(2);
  default: 
    effR("default");
  }
}


function c() {
  switch(eff(1)) {
  case (eff(2)):
    eff(3)
  case (eff(4)):
    eff(5)
    break
  case 6:
    eff(7)
  case 8:
    console.log(9)
  default:
    eff(10)
  }
}
