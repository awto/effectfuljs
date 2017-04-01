function a1() {
  var i, j;

  if (true) {
    const a = i += 1;
    return efft(a);
  } else {
    const a = j += 2;
    return effe(a);
  }
}

function a2() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i, j;

    if (true) {
      const a = i += 1;
      return efft(a);
    } else {
      const a = j += 2;
      return effe(a);
    }
  });
}

function a2a() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i;

    if (true) {
      const a = i += 1;
      return efft(a);
    } else return effe(j);
  });
}

function a2b() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i, j;

    if (true) {
      const a = i += 1;
      return efft(a);
    } else j += 2;
  });
}

function a3() {
  var i, j;
  return M((() => {
    if (true) {
      const a = i += 1;
      return M.set({
        i,
        j
      }).mseq(efft(a));
    } else {
      const a = j += 2;
      return M.set({
        i,
        j
      }).mseq(effe(a));
    }
  })()).mbind(() => M.get()).mbind(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a3a() {
  var i, j;
  return M((() => {
    if (true) {
      const a = i += 1;
      return M.set({
        i,
        j
      }).mseq(efft(a));
    } else {
      const a = j += 2;
      return M.set({
        i,
        j
      }).mseq(effe(a));
    }
  })()).mbind(() => M.get()).mbind(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a3b() {
  var i, j;
  return M((() => {
    if (true) {
      const a = i += 1;
      return M.set({
        i
      }).mseq(efft(a));
    } else return M.set({
      i
    }).mseq(eff(j));
  })()).mbind(() => M.get()).mbind(({
    i
  }) => {
    console.log(i, j);
  });
}

function a3c() {
  var i, j;
  return M((() => {
    if (true) {
      const a = i += 1;
      return M.set({
        i,
        j
      }).mseq(efft(a));
    } else {
      j += 2;
      return M.set({
        i,
        j
      });
    }
  })()).mbind(() => M.get()).mbind(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a4() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i, j;

    if (true) {
      const a = i += 1;
      return M.set({
        i,
        j
      }).mseq(efft(a));
    } else {
      const a = j += 2;
      return M.set({
        i,
        j
      }).mseq(effe(a));
    }
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a4a() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i;

    if (true) {
      const a = i += 1;
      return M.set({
        i
      }).mseq(efft(a));
    } else return M.set({
      i
    }).mseq(effe(j));
  }).mbind(() => M.get()).mbind(({
    i
  }) => {
    console.log(i, j);
  });
}

function a4b() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i, j;

    if (true) {
      const a = i += 1;
      return M.set({
        i,
        j
      }).mseq(efft(a));
    } else {
      j += 2;
      return M.set({
        i,
        j
      });
    }
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a5() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i, j;

    if (true) {
      const a = i += 1;
      return M.set({
        i,
        j
      }).mseq(efft(a));
    } else {
      const a = j += 2;
      return M.set({
        i,
        j
      }).mseq(effe(a));
    }
  }).mbind(() => M.get().mbind(({
    i,
    j
  }) => {
    console.log(i, j);
    return M(eff(i, j)).mbind(() => eff(i, j));
  }));
}

function a6() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i;
    const a = i++;
    return M.set({
      i
    }).mseq(eff(a)).mbind(a => {
      let _i = i,
          j;

      if (a) {
        const a = _i += 1;
        return M.set({
          i: _i,
          j
        }).mseq(efft(a));
      } else {
        const a = j += 2;
        return M.set({
          i: _i,
          j
        }).mseq(effe(a));
      }
    });
  }).mbind(() => M.get().mbind(({
    i,
    j
  }) => {
    console.log(i, j);
    return M(eff(i, j)).mbind(() => eff(i, j));
  }));
}

function a7() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i;
    const a = i++;
    return M.set({
      i
    }).mseq(eff(a)).mbind(a => {
      let j;

      if (a) {
        const a = j++;
        return M.modify(s => ({
          i: s.i,
          j
        })).mseq(eff(a)).mbind(() => {
          let _i = i;
          const a = _i += 1;
          return M.modify(s => ({
            i: _i,
            j: s.j
          })).mseq(efft(a));
        });
      } else {
        const a = j += 2;
        return M.modify(s => ({
          i: s.i,
          j
        })).mseq(effe(a));
      }
    });
  }).mbind(() => M.get().mbind(({
    i,
    j
  }) => {
    console.log(i, j);
    return M(eff(i, j)).mbind(() => eff(i, j));
  }));
}

function drawM() {
  var start, end, c;
  return M.scope(ret => M(event('mousedown')).mbind(a => {
    let start;
    start = a;
    console.log('s', start);
    if (!start) return M.set({
      start
    }).mseq(ret(def));else return M.set({
      start
    });
  }).mbind(() => event('mouseup')).mbind(a => {
    let end, c;
    end = a;
    console.log('e', end);
    c = '.box';

    if (!end) {
      c = '.draw';
      return M.modify(s => ({
        start: s.start,
        end
      })).mseq(event('mousemove')).mbind(a => M.get().mbind(({
        start
      }) => {
        let end;
        end = a;
        console.log('m', start, end);
        return M.modify(s => ({
          start: s.start,
          end
        }));
      }));
    } else return M.modify(s => ({
      start: s.start,
      end
    }));
  }).mbind(() => M.get()).mbind(({
    start,
    end
  }) => {
    console.log('s:', start);
    console.log('e:', end);
    return {
      s: start,
      e: end
    };
  }));
}