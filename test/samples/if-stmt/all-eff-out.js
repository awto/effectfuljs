function a() {
  return M.scope(ret => M(eff(1)).mbind(b => {
    if (b) return M(eff(2)).mbind(c => ret(c));else return M(eff(3)).mbind(d => ret(d));
  }));
}