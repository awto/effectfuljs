function t1() {
  var i;
  i = 0;
  const a = i++;
  return eff(a).mbind(a => a ? eff1(i) : eff2(i)).mbind(() => eff(i));
}

function t2() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return eff(a).mbind(a => a ? eff1(_i) : eff2(_i)).mbind(() => eff(_i));
  });
}

function t2a() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return (a ? eff1(_i) : eff2(_i)).mbind(() => eff(_i));
  });
}

function t2b() {
  var i;
  i = 0;
  return M.set({
    i
  }).mseq(eff(i)).mbind(() => {
    let _i = i;
    return (_i ? (() => {
      const a = _i++;
      return M.set({
        i: _i
      }).mseq(eff1(a));
    })() : M.set({
      i: _i
    }).mseq(eff2(_i))).mbind(() => eff(_i));
  });
}

function t2c() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return (a ? (() => {
      const a = _i++;
      return M.set({
        i: _i
      }).mseq(eff1(a));
    })() : M.set({
      i: _i
    }).mseq(eff2(_i))).mbind(() => eff(_i));
  });
}

function t2e() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return (a ? (() => {
      const a = _i++;
      return M.set({
        i: _i
      }).mseq(eff1(a));
    })() : (() => {
      let a = console.log(_i);
      return M.set({
        i: _i
      }).mapply(() => {
        return a;
      });
    })()).mbind(() => eff(_i));
  });
}

function t2f() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return (a ? (() => {
      let a = console.log(_i++);
      return M.set({
        i: _i
      }).mapply(() => {
        return a;
      });
    })() : M.set({
      i: _i
    }).mseq(eff(_i))).mbind(() => eff(_i));
  });
}

function t2g() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    _i++ ? console.log(_i++) : console.log(_i);
    return eff(_i);
  });
}

function t2h() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return eff(a).mbind(a => {
      let i = _i;
      const b = i++;
      const c = console.log(b);
      const d = console.log(i);
      a ? c : d;
      return eff(i);
    });
  });
}

function t3() {
  var i, j;
  i = 0;
  j = 0;
  return eff(i, j).mbind(() => {
    let _i = i,
        _j = j;
    const a = _i++;
    const b = _j++;
    return M.modify(s => ({
      i: _i,
      j: s.j
    })).mseq(eff(a, b)).mbind(a => {
      let i = _i,
          j = _j;
      return (a ? (() => {
        const a = i++;
        return M.set({
          i
        }).mseq(eff2(a, j));
      })() : (() => {
        const a = j++;
        return M.set({
          i
        }).mseq(eff2(i, a));
      })()).mbind(() => eff(i));
    });
  });
}

function t4() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return eff(i, j, k).mbind(() => {
    let _i = i,
        _j = j;
    const a = _i++;
    const b = _j++;
    return M.modify(s => ({
      i: _i,
      j: _j,
      k: s.k
    })).mseq(eff(a, b, k)).mbind(a => {
      let i = _i,
          j = _j,
          _k = k;
      return (a ? (() => {
        const a = i++;
        const b = _k++;
        return M.set({
          i,
          j
        }).mseq(eff2(a, j, b));
      })() : (() => {
        const a = j++;
        const b = _k++;
        return M.set({
          i,
          j
        }).mseq(eff2(i, a, b));
      })()).mbind(() => eff(i, j));
    });
  });
}

function t5() {
  var i;
  i = 0;
  const a = i++;
  return eff(a).mbind(a => a ? eff1(i) : M.pure(a)).mbind(() => eff(i));
}

function t6() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return eff(a).mbind(a => a ? eff1(_i) : M.pure(a)).mbind(() => eff(_i));
  });
}

function t7() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return M.set({
      i: _i
    }).mseq(eff(a)).mbind(a => {
      let i = _i;
      return (a ? (() => {
        const a = i++;
        return M.set({
          i
        }).mseq(eff1(a));
      })() : (() => {
        let b = a;
        return M.set({
          i
        }).mapply(() => {
          return b;
        });
      })()).mbind(() => eff(i));
    });
  });
}

function t8() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return M.set({
      i: _i
    }).mseq(eff(a)).mbind(a => {
      let i = _i;
      return (a ? (() => {
        const a = i++;
        return M.set({
          i
        }).mseq(eff1(a));
      })() : (() => {
        let b = a;
        return M.set({
          i
        }).mapply(() => {
          return b;
        });
      })()).mbind(a => {
        let _i = i;
        return (a ? (() => {
          const a = _i++;
          return M.set({
            i: _i
          }).mseq(eff(a));
        })() : (() => {
          let b = a;
          return M.set({
            i: _i
          }).mapply(() => {
            return b;
          });
        })()).mbind(() => eff(_i));
      });
    });
  });
}

function t9() {
  var i;
  i = 0;
  const a = i++;
  return eff(a).mbind(a => a ? M.pure(a) : eff1(i)).mbind(() => eff(i));
}

function t10() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return eff(a).mbind(a => a ? M.pure(a) : eff1(_i)).mbind(() => eff(_i));
  });
}

function t11() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return M.set({
      i: _i
    }).mseq(eff(a)).mbind(a => {
      let i = _i;
      return (a ? (() => {
        let b = a;
        return M.set({
          i
        }).mapply(() => {
          return b;
        });
      })() : (() => {
        const a = i++;
        return M.set({
          i
        }).mseq(eff1(a));
      })()).mbind(() => eff(i));
    });
  });
}

function t12() {
  var i;
  i = 0;
  return eff(i).mbind(() => {
    let _i = i;
    const a = _i++;
    return M.set({
      i: _i
    }).mseq(eff(a)).mbind(a => {
      let i = _i;
      return (a ? (() => {
        let b = a;
        return M.set({
          i
        }).mapply(() => {
          return b;
        });
      })() : (() => {
        const a = i++;
        return M.set({
          i
        }).mseq(eff1(a));
      })()).mbind(a => {
        let _i = i;
        return (a ? (() => {
          let b = a;
          return M.set({
            i: _i
          }).mapply(() => {
            return b;
          });
        })() : (() => {
          const a = _i++;
          return M.set({
            i: _i
          }).mseq(eff(a));
        })()).mbind(() => eff(_i));
      });
    });
  });
}

function t13() {
  var i, j;
  i = 0;
  j = 0;
  return eff(i, j).mbind(() => {
    let _i = i,
        _j = j;
    const a = _i++;
    const b = _j++;
    return M.modify(s => ({
      i: _i,
      j: s.j
    })).mseq(eff(a, b)).mbind(a => {
      let i = _i;
      return (a ? (() => {
        const a = i++;
        return M.modify(s => ({
          i,
          j: s.j
        })).mseq(eff2(a, _j));
      })() : (() => {
        let b = a;
        return M.modify(s => ({
          i,
          j: s.j
        })).mapply(() => {
          return b;
        });
      })()).mbind(a => {
        let j = _j;
        return a ? (() => {
          const a = j++;
          return eff3(i, a);
        })() : M.pure(a);
      }).mbind(() => eff(i));
    });
  });
}

function t14() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.modify(s => ({
    i: s.i,
    j: s.j,
    k
  })).mseq(eff(i, j, k)).mbind(() => {
    let _i = i,
        _j = j;
    const a = _i++;
    const b = _j++;
    return M.modify(s => ({
      i: _i,
      j: _j,
      k: s.k
    })).mseq(eff(a, b, k)).mbind(a => {
      let i = _i,
          _k = k;
      return (a ? (() => {
        const a = i++;
        const b = _k++;
        return M.modify(s => ({
          i,
          j: s.j,
          k: _k
        })).mseq(eff2(a, _j, b));
      })() : (() => {
        let b = a;
        return M.modify(s => ({
          i,
          j: s.j,
          k: _k
        })).mapply(() => {
          return b;
        });
      })()).mbind(a => {
        let j = _j,
            k = _k;
        return (a ? (() => {
          const a = j++;
          const b = k++;
          return M.modify(s => ({
            i: s.i,
            j
          })).mseq(eff3(i, a, b));
        })() : (() => {
          let b = a;
          return M.modify(s => ({
            i: s.i,
            j
          })).mapply(() => {
            return b;
          });
        })()).mbind(() => eff(i, j));
      });
    });
  });
}