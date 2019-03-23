M.option({ scopePrefix: true, passNewTarget: true });

function a1(a) {
  this.a = a;
}

function b() {
  a1();
}
