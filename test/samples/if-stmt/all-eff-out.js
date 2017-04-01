function a() {
  return M.scope(ret => M(eff(1)).mbind(a => {
    if (a) return M(eff(2)).mbind(a => ret(a));else return M(eff(3)).mbind(a => ret(a));
  }));
}