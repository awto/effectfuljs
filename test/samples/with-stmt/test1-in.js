function a(f) {
  with (f) {
    console.log(z);
  }
}

function a(f) {
  with (f) {
    console.log(z);
    eff(z);
    eff(z);
  }
}

function a(f) {
  eff(z);
  with (f) {
    console.log(z);
    eff(z);
    eff(z);
  }
}

function a(f) {
  eff(z);
  with (eff(f)) {
    console.log(z);
    eff(z);
    eff(z);
  }
}

function a(f) {
  eff(z);
  with (eff(f)) {
    console.log(z);
    z++;
    eff(z);
    z++;
    eff(z);
  }
}

function a(f) {
  var i;
  eff(i,z);
  i++;
  with (eff(f)) {
    console.log(z,i);
    z++;
    i++;    
    eff(z,i);
    eff(z,i);
    z++;
    i++;
    eff(z,i);
    eff(z,i);
  }
}




