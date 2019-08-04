M.option({ callProtocol: "apply" });

function a1(a, b) {
  a.eff(eff(a)).eff(d);
  M.option({ callName: "APPLY" });
  a.b.eff(d);
  [a.b].eff(d);
  ({ a }.eff(d));
  new A({ a }).eff(d);
}

M.option({ callProtocol: "call" });

function a2(a, b) {
  eff(a);
  a.eff(eff(a)).eff(d);
  M.option({ callName: "CALL" });
  a.b.eff(d);
  [a.b].eff(d);
  ({ a }.eff(d));
  new A({ a }).eff(d);
}

M.option({ callProtocol: false });

function a3(a, b) {
  eff(a);
  a.eff(eff(a)).eff(d);
  a.b.eff(d);
  [a.b].eff(d);
  ({ a }.eff(d));
  new A({ a }).eff(d);
}

M.option({ newProtocol: "method" });

function a4() {
  new B.B(new A(a));
  M.option({ newName: "NEW" });
  new (eff()).Z(b);
  new { a }.a();
}

M.option({ newProtocol: "op" });

function a5() {
  new B.B(new A(a));
  M.option({ newName: "NEW" });
  new (eff()).Z(b);
  new { a }.a();
}

M.option({ newProtocol: false });

function a6() {
  new B.B(new A(a));
  M.option({ newName: "NEW" });
  new (eff()).Z(b);
  new { a }.a();
}
