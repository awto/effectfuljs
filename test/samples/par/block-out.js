function a$default() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(b => {
    let a;
    a = b;
    return M(eff2(2)).mbind(c => {
      let b;
      b = c;
      return eff3(3, a);
    }).mbind(b => {
      let c;
      c = b;
      return M(eff4(4, a)).mbind(a => {
        let d;
        d = a;
        return eff5(5);
      }).mapply(b => {
        let e;
        e = b;
        console.log(a + c);
      });
    });
  });
}

function a$par$all() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(b => {
    let a;
    a = b;
    return M(eff2(2)).mbind(c => {
      let b;
      b = c;
      return eff3(3, a);
    }).mbind(b => {
      let c;
      c = b;
      return M(eff4(4, a)).mbind(a => {
        let d;
        d = a;
        return eff5(5);
      }).mapply(b => {
        let e;
        e = b;
        console.log(a + c);
      });
    });
  });
}

function a$par$r$lhs$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(b => {
    let a;
    a = b;
    return M(eff2(2)).mbind(c => {
      let b;
      b = c;
      return eff3(3, a);
    }).mbind(b => {
      let c;
      c = b;
      return M(eff4(4, a)).mbind(a => {
        let d;
        d = a;
        return eff5(5);
      }).mapply(b => {
        let e;
        e = b;
        console.log(a + c);
      });
    });
  });
}

function a$par$r$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(b => {
    let a;
    a = b;
    return M(eff2(2)).mbind(c => {
      let b;
      b = c;
      return eff3(3, a);
    }).mbind(b => {
      let c;
      c = b;
      return M(eff4(4, a)).mbind(a => {
        let d;
        d = a;
        return eff5(5);
      }).mapply(b => {
        let e;
        e = b;
        console.log(a + c);
      });
    });
  });
}

function a$par$lhs$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(b => {
    let a;
    a = b;
    return M(eff2(2)).mbind(c => {
      let b;
      b = c;
      return eff3(3, a);
    }).mbind(b => {
      let c;
      c = b;
      return M(eff4(4, a)).mbind(a => {
        let d;
        d = a;
        return eff5(5);
      }).mapply(b => {
        let e;
        e = b;
        console.log(a + c);
      });
    });
  });
}

function a$par$usage() {
  var a, b, c, d, e;
  return M(eff1(1)).mbind(b => {
    let a;
    a = b;
    return M(eff2(2)).mbind(c => {
      let b;
      b = c;
      return eff3(3, a);
    }).mbind(b => {
      let c;
      c = b;
      return M(eff4(4, a)).mbind(a => {
        let d;
        d = a;
        return eff5(5);
      }).mapply(b => {
        let e;
        e = b;
        console.log(a + c);
      });
    });
  });
}