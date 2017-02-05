function a() {
  return M(eff()).mbind(b => M(effC(1)).mbind(c => M(effC(2)).mbind(d => {
    switch (b) {
      case c:
        return M(effR(1)).mbind(() => effR(2)).mbind(() => effR('default'));

      case d:
        return M(effR(2)).mbind(() => effR('default'));

      default:
        return effR('default');
    }
  })));
}