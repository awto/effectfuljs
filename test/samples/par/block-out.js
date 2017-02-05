function a$default() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(f => {
    a = f;
    return M(eff2(2)).mbind(g => {
      b = g;
      return eff3(3, a);
    }).mbind(h => {
      c = h;
      return M(eff4(4, a)).mbind(k => {
        d = k;
        return eff5(5);
      }).mapply(m => {
        e = m;
        console.log(a + c);
      });
    });
  });
}

function a$par$all() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(f => {
    a = f;
    return M(eff2(2)).mbind(g => {
      b = g;
      return eff3(3, a);
    }).mbind(h => {
      c = h;
      return M(eff4(4, a)).mbind(k => {
        d = k;
        return eff5(5);
      }).mapply(m => {
        e = m;
        console.log(a + c);
      });
    });
  });
}

function a$par$r$lhs$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(f => {
    a = f;
    return M(eff2(2)).mbind(g => {
      b = g;
      return eff3(3, a);
    }).mbind(h => {
      c = h;
      return M(eff4(4, a)).mbind(k => {
        d = k;
        return eff5(5);
      }).mapply(m => {
        e = m;
        console.log(a + c);
      });
    });
  });
}

function a$par$r$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(f => {
    a = f;
    return M(eff2(2)).mbind(g => {
      b = g;
      return eff3(3, a);
    }).mbind(h => {
      c = h;
      return M(eff4(4, a)).mbind(k => {
        d = k;
        return eff5(5);
      }).mapply(m => {
        e = m;
        console.log(a + c);
      });
    });
  });
}

function a$par$lhs$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(f => {
    a = f;
    return M(eff2(2)).mbind(g => {
      b = g;
      return eff3(3, a);
    }).mbind(h => {
      c = h;
      return M(eff4(4, a)).mbind(k => {
        d = k;
        return eff5(5);
      }).mapply(m => {
        e = m;
        console.log(a + c);
      });
    });
  });
}

function a$par$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(f => {
    a = f;
    return M(eff2(2)).mbind(g => {
      b = g;
      return eff3(3, a);
    }).mbind(h => {
      c = h;
      return M(eff4(4, a)).mbind(k => {
        d = k;
        return eff5(5);
      }).mapply(m => {
        e = m;
        console.log(a + c);
      });
    });
  });
}