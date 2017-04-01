function a() {
  return M(eff()).mbind(a => M(effC(1)).mbind(b => M(effC(2)).mbind(c => {
    switch (a) {
      case b:
        return M(effR(1)).mbind(() => effR(2)).mbind(() => effR('default'));

      case c:
        return M(effR(2)).mbind(() => effR('default'));

      default:
        return effR('default');
    }
  })));
}