function a() {
  return M(eff(1)).mbind(() => eff(2)).mapply(() => {
    eff(3);
    eff(4);
  });
}

function b() {
  return M(eff(1)).mbind(() => eff(2)).mbind(() => {
    eff(3);
    eff(4);
    return eff(5);
  }).mbind(() => eff(6)).mapply(() => {
    console.log('7');
  });
}

function c() {
  return M(eff(1)).mbind(() => eff(2)).mbind(() => {
    {
      eff(3);
      eff(4);
    }
    return eff(5);
  }).mbind(() => eff(6)).mapply(() => {
    console.log('7');
  });
}