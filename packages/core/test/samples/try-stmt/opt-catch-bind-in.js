function a1(a, b) {
  try {
    eff(a);
  } catch {
    eff(b);
  }
}

function a2(a, b) {
  try {
    eff(a);
  } catch {
    return b;
  }
}
