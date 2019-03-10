function a() {
  for (var i of some) {
    eff(1);
  }
  eff(2);
}
function b() {
  for (var i of eff("d")) {
    eff(i);
  }
  eff(i);
}

function c() {
  for (var i of some) {
    for (var j of other) {
      eff(i, j);
    }
  }
  eff(i, j);
}

function d() {
  for (var i of some) {
    eff(1);
  }
  eff(2);
}

function p() {
  for (var i of some) {
    console.log(1);
  }
  console.log(2);
}
