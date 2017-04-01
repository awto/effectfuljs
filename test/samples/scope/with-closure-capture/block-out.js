function a() {
  var i, j;
  return M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => {
      let _i = i,
          j;
      const a = _i += 1;
      const b = j += 1;
      return M(eff(a, b)).mbind(() => {
        let i = _i;
        {
          {
            i += 3;
          }
          return M(eff(i)).mbind(() => {
            let _i = i;
            const a = _i += 4;
            return M.set({
              i: _i
            }).mseq(eff(a));
          }).mbind(() => {
            if (false) return lab();
          });
        }
      });
    });
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function a1() {
  var i, j;
  return M(eff()).mbind(() => {
    let i;
    return M.block(lab => {
      i++;
      return M(eff(i)).mbind(() => {
        let _i = i,
            j;
        const a = _i += 1;
        const b = j += 1;
        return M(eff(a, b)).mbind(() => {
          let i = _i;
          {
            {
              i += 3;
            }
            return M(eff(i)).mbind(() => {
              let _i = i;
              const a = _i += 4;
              return M.set({
                i: _i
              }).mseq(eff(a));
            }).mbind(() => {
              if (false) return lab();
            });
          }
        });
      });
    });
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function b() {
  var i, j;
  return M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => {
      let _i = i,
          j;
      const a = _i += 1;
      const b = j += 1;
      return M(eff(a, b)).mbind(() => {
        let i = _i;
        {
          {
            i += 3;
          }
          return M(eff(i)).mbind(() => {
            let _i = i;
            const a = _i += 4;
            return M.set({
              i: _i
            }).mseq(eff(a));
          }).mbind(() => lab());
        }
      });
    });
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function c() {
  var i, j;
  return M.scope(ret => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => {
      let _i = i,
          j;
      const a = _i += 1;
      const b = j += 1;
      return M(eff(a, b)).mbind(() => {
        let i = _i;
        return M.block(lab2 => {
          i += 3;
          return M(eff(i)).mbind(() => {
            let _i = i;
            const a = _i += 6;
            return M(eff(a)).mbind(() => lab2()).mbind(() => eff(_i)).mbind(() => {
              let i = _i;
              const a = i++;
              return M(eff(a)).mbind(() => lab()).mbind(() => eff(i)).mbind(() => {
                let _i = i;
                const a = _i++;
                return M.set({
                  i: _i
                }).mseq(eff(a));
              });
            });
          });
        });
      });
    }).mbind(() => M.get().mbind(({
      i
    }) => {
      const a = i += 5;
      return ret(a).mbind(() => eff(i)).mbind(() => {
        let _i = i;
        const a = _i += 6;
        return M.set({
          i: _i
        }).mseq(eff(a));
      });
    }));
  }).mbind(() => M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => {
    let _i = i;
    const a = _i += 7;
    return eff(a);
  }))));
}

function c0() {
  var i, j;
  return M.block(lab => M(eff(i)).mbind(() => {
    let i, j;
    const a = i += 1;
    const b = j += 1;
    return M.set({
      i
    }).mseq(eff(a, b)).mbind(() => eff(i));
  }).mbind(() => lab())).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function c1() {
  var i, j;
  return M.scope(ret => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => {
      let _i = i,
          j;
      const a = _i += 1;
      const b = j += 1;
      return M(eff(a, b)).mbind(() => {
        let i = _i;
        return M.block(lab2 => {
          i += 3;
          return M(eff(i)).mbind(() => {
            let _i = i;
            const a = _i += 6;
            return M(eff(a)).mbind(() => {
              if (true) return lab2();
            }).mbind(() => eff(_i)).mbind(() => {
              let i = _i;
              const a = i++;
              return M(eff(a)).mbind(() => {
                if (true) return lab();
              }).mbind(() => eff(i)).mbind(() => {
                let _i = i;
                const a = _i++;
                return M.set({
                  i: _i
                }).mseq(eff(a));
              });
            });
          });
        });
      });
    }).mbind(() => M.get().mbind(({
      i
    }) => {
      const a = i += 5;
      return ret(a).mbind(() => eff(i)).mbind(() => {
        let _i = i;
        const a = _i += 6;
        return M.set({
          i: _i
        }).mseq(eff(a));
      });
    }));
  }).mbind(() => M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => {
    let _i = i;
    const a = _i += 7;
    return eff(a);
  }))));
}

function c2() {
  var i, j;
  return M.scope(ret => M(eff()).mbind(() => {
    let i;
    return M.block(lab => {
      i++;
      return M(eff(i)).mbind(() => {
        let _i = i,
            j;
        const a = _i += 1;
        const b = j += 1;
        return M.modify(s => ({
          i: s.i,
          j
        })).mseq(eff(a, b)).mbind(() => {
          let i = _i;
          return M.block(lab2 => {
            i += 3;
            return M(eff(i)).mbind(() => {
              let _i = i;
              const a = _i += 4;
              return M(eff(a)).mbind(() => {
                if (true) return lab2();
              }).mbind(() => eff(_i)).mbind(() => {
                let i = _i;
                const a = i++;
                return M(eff(a)).mbind(() => {
                  if (true) return lab();
                }).mbind(() => eff(i)).mbind(() => {
                  let _i = i;
                  const a = _i++;
                  return M.modify(s => ({
                    i: _i,
                    j: s.j
                  })).mseq(eff(a));
                });
              });
            });
          });
        });
      }).mbind(() => M.get().mbind(({
        i
      }) => {
        const a = i += 5;
        return ret(a).mbind(() => eff(i)).mbind(() => {
          let _i = i;
          const a = _i += 6;
          return M.modify(s => ({
            i: _i,
            j: s.j
          })).mseq(eff(a));
        });
      }));
    });
  }).mbind(() => M.get().mbind(({
    i,
    j
  }) => M(eff(i, j)).mbind(() => {
    let _i = i;
    const a = _i += 7;
    return eff(a);
  }))));
}

function d() {
  var i, j;
  return M.scope(ret => {
    const a = i++;
    return M.set({
      i
    }).mseq(eff(a)).mbind(() => {
      let _i = i;

      if (t1) {
        const a = _i += 5;
        return M.set({
          i: _i
        }).mseq(ret(a));
      } else return M.set({
        i: _i
      });
    }).mbind(() => M.get()).mbind(({
      i
    }) => {
      console.log(i);
    });
  });
}