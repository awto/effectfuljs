(function () {
  return M.block(lab => M(eff(2)).mbind(() => lab())).mbind(() => eff(4));
});