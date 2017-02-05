function a$def() {
  return M(eff(1)).mbind(a => M(eff(2)).mapply(b => {
    a + b;
  }));
}

function a$seq() {
  return M(eff(1)).mbind(a => M(eff(2)).mapply(b => {
    a + b;
  }));
}