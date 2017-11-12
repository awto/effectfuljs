function forOfBlockScope() {
  var a, b, funs, i, j, _i, k, _k, k1, k2;

  return M.scope(_1, _48);

  function _1() {
    var _i, i1, loop7;

    a = [1, 2, 3, 4, 5, 6, 7, 8];
    b = [10, 11, 12, 13, 14, 15, 16];
    funs = [];

    for (_i of a) {
      (i => {
        let j = 0;
        funs.push(function iter() {
          return M.scope(_1, _3);

          function _1() {
            return M.yldStar(M.yld(`fo1: ${i} ${j++}`), _2, _3);
          }

          function _2() {
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        });
      })(_i);
    }

    for (i of a) {
      j = 0;
      funs.push(function iter() {
        return M.scope(_1, _3);

        function _1() {
          return M.yldStar(M.yld(`fo2: ${i} ${j++}`), _2, _3);
        }

        function _2() {
          return M.pure();
        }

        function _3(e) {
          return M.raise(e);
        }
      });
    }

    for (i1 of a) {
      (i => {
        for (let j of b) {
          (j => {
            funs.push(function iter() {
              return M.scope(_1, _3);

              function _1() {
                return M.yldStar(M.yld(`fo3: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
          })(j);
        }
      })(i1);
    }

    loop7 = M.iterator(a);
    return M.jump(_2, _48, loop7);
  }

  function _2(loop7) {
    var i, loop8;

    if (!(loop7 = loop7.step()).done) {
      i = loop7.value;
      return M.jump(_3, _49, i, loop7);
    } else {
      loop8 = M.iterator(a);
      return M.jump(_5, _48, loop8);
    }
  }

  function _3(i, loop7) {
    return M.repeat((i => {
      return M.scope(_1, _5);

      function _1() {
        var loop;
        loop = M.iterator(b);
        return M.jump(_2, _5, loop);
      }

      function _2(loop) {
        var j;

        if (!(loop = loop.step()).done) {
          j = loop.value;
          return M.jump(_3, _6, j, loop);
        } else {
          return M.pure();
        }
      }

      function _3(j, loop) {
        return M.repeat((j => {
          return M.scope(_1, _3);

          function _1() {
            return M.yldStar(M.yld(`fo4: ${j}`), _2, _3);
          }

          function _2() {
            funs.push(function iter() {
              return M.scope(_1, _3);

              function _1() {
                return M.yldStar(M.yld(`fo5: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j), _2, _5, loop);
      }

      function _4(ex) {
        var e;
        e = ex;

        if (loop.exit) {
          loop.exit();
        }

        throw e;
      }

      function _5(e) {
        return M.raise(e);
      }

      function _6(a) {
        return M.jump(_4, _5, a);
      }
    })(i), _2, _48, loop7);
  }

  function _4(ex) {
    var e;
    e = ex;

    if (loop7.exit) {
      loop7.exit();
    }

    throw e;
  }

  function _5(loop8) {
    var i, loop9;

    if (!(loop8 = loop8.step()).done) {
      i = loop8.value;
      return M.jump(_6, _50, i, loop8);
    } else {
      loop9 = M.iterator(a);
      return M.jump(_8, _48, loop9);
    }
  }

  function _6(i, loop8) {
    return M.repeat((i => {
      return M.scope(_1, _3);

      function _1() {
        return M.yldStar(M.yld(`fo6: ${i}`), _2, _3);
      }

      function _2() {
        var j;

        for (j of b) {
          (j => {
            funs.push(function iter() {
              return M.scope(_1, _3);

              function _1() {
                return M.yldStar(M.yld(`fo7: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
          })(j);
        }

        return M.pure();
      }

      function _3(e) {
        return M.raise(e);
      }
    })(i), _5, _48, loop8);
  }

  function _7(ex) {
    var e;
    e = ex;

    if (loop8.exit) {
      loop8.exit();
    }

    throw e;
  }

  function _8(loop9) {
    var i, loop10;

    if (!(loop9 = loop9.step()).done) {
      i = loop9.value;
      return M.jump(_9, _51, i, loop9);
    } else {
      loop10 = M.iterator(funs);
      return M.jump(_11, _48, loop10);
    }
  }

  function _9(i, loop9) {
    return M.repeat((i => {
      return M.scope(_1, _6);

      function _1() {
        return M.yldStar(M.yld(`fo8 ${i}`), _2, _6);
      }

      function _2() {
        var _loop;

        _loop = M.iterator(b);
        return M.jump(_3, _6, _loop);
      }

      function _3(_loop) {
        var j;

        if (!(_loop = _loop.step()).done) {
          j = _loop.value;
          return M.jump(_4, _7, j, _loop);
        } else {
          return M.pure();
        }
      }

      function _4(j, _loop) {
        return M.repeat((j => {
          return M.scope(_1, _3);

          function _1() {
            return M.yldStar(M.yld(`fo9: ${i}`), _2, _3);
          }

          function _2() {
            funs.push(function iter() {
              return M.scope(_1, _3);

              function _1() {
                return M.yldStar(M.yld(`fo10: ${i} ${j++}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j), _3, _6, _loop);
      }

      function _5(ex) {
        var e;
        e = ex;

        if (_loop.exit) {
          _loop.exit();
        }

        throw e;
      }

      function _6(e) {
        return M.raise(e);
      }

      function _7(a) {
        return M.jump(_5, _6, a);
      }
    })(i), _8, _48, loop9);
  }

  function _10(ex) {
    var e;
    e = ex;

    if (loop9.exit) {
      loop9.exit();
    }

    throw e;
  }

  function _11(loop10) {
    var i, loop11;

    if (!(loop10 = loop10.step()).done) {
      _i = loop10.value;
      return M.jump(_12, _52, loop10);
    } else {
      funs.length = 0;

      for (i of a) {
        (i => {
          funs.push(function iter() {
            return M.scope(_1, _3);

            function _1() {
              return M.yldStar(M.yld(`fo11: ${i}`), _2, _3);
            }

            function _2() {
              return M.pure();
            }

            function _3(e) {
              return M.raise(e);
            }
          });
        })(i);
      }

      loop11 = M.iterator(a);
      return M.jump(_14, _48, loop11);
    }
  }

  function _12(loop10) {
    var a;
    a = _i();
    return M.repeat(M.yldStar(a), _11, _48, loop10);
  }

  function _13(ex) {
    var e;
    e = ex;

    if (loop10.exit) {
      loop10.exit();
    }

    throw e;
  }

  function _14(loop11) {
    var i, loop12;

    if (!(loop11 = loop11.step()).done) {
      i = loop11.value;
      return M.jump(_15, _53, i, loop11);
    } else {
      k = 0;
      loop12 = M.iterator(a);
      return M.jump(_17, _48, loop12);
    }
  }

  function _15(i, loop11) {
    return M.repeat((i => {
      return M.scope(_1, _3);

      function _1() {
        return M.yldStar(M.yld(`fo12 ${i}`), _2, _3);
      }

      function _2() {
        funs.push(function iter() {
          return M.scope(_1, _3);

          function _1() {
            return M.yldStar(M.yld(`fo13 ${i}`), _2, _3);
          }

          function _2() {
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        });
        return M.pure();
      }

      function _3(e) {
        return M.raise(e);
      }
    })(i), _14, _48, loop11);
  }

  function _16(ex) {
    var e;
    e = ex;

    if (loop11.exit) {
      loop11.exit();
    }

    throw e;
  }

  function _17(loop12) {
    var i;

    if (!(loop12 = loop12.step()).done) {
      i = loop12.value;
      return M.jump(_18, _54, i, loop12);
    } else {
      return M.jump(_21, _48);
    }
  }

  function _18(i, loop12) {
    return M.yldStar((i => {
      var m;
      return M.scope(_1, _3);

      function _1() {
        return M.yldStar(M.yld(`fo14 ${i} ${k} {m}`), _2, _3);
      }

      function _2() {
        var r;
        m = k;
        k++;

        if (k === 3) {
          return M.pure(0);
        } else {
          if (k === 5) {
            return M.pure(1);
          } else {
            funs.push(function iter() {
              return M.scope(_1, _3);

              function _1() {
                return M.yldStar(M.yld(`fo15 ${i} ${k} {m}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
            return M.pure(r);
          }
        }
      }

      function _3(e) {
        return M.raise(e);
      }
    })(i), _19, _54, loop12);
  }

  function _19(a, loop12) {
    switch (a) {
      case 0:
        return M.jump(_17, _48, loop12);

      case 1:
        return M.jump(_21, _48);

      default:
        return M.jump(_17, _48, loop12);
    }
  }

  function _20(ex) {
    var e;
    e = ex;

    if (loop12.exit) {
      loop12.exit();
    }

    throw e;
  }

  function _21() {
    var i, loop13;
    k = 0;

    up1: for (i of a) {
      switch ((i => {
        let m = k;
        k++;

        for (const j of b) {
          switch ((j => {
            let n = m;
            m++;
            if (k === 3) return 0;
            if (k === 5) return 1;
            if (n === 3) return 2;
            if (n === 5) return 3;
            funs.push(function iter() {
              return M.scope(_1, _3);

              function _1() {
                n++;
                return M.yldStar(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
              }

              function _2() {
                return M.pure();
              }

              function _3(e) {
                return M.raise(e);
              }
            });
          })(j)) {
            case 0:
              return 0;

            case 1:
              return 1;

            case 2:
              continue;

            case 3:
              break;

            default:
              continue;
          }

          break;
        }
      })(i)) {
        case 0:
          {
            continue up1;
          }

        case 1:
          {
            break up1;
          }

        default:
          {
            continue;
          }
      }
    }

    k = 0;
    loop13 = M.iterator(a);
    return M.jump(_22, _48, loop13);
  }

  function _22(loop13) {
    var i;

    if (!(loop13 = loop13.step()).done) {
      i = loop13.value;
      return M.jump(_23, _55, i, loop13);
    } else {
      return M.jump(_26, _48);
    }
  }

  function _23(i, loop13) {
    return M.yldStar((i => {
      var m;
      return M.scope(_1, _7);

      function _1() {
        m = 0;
        k++;
        return M.yldStar(M.yld(`fo16: ${i} ${k} ${m}`), _2, _7);
      }

      function _2() {
        var loop1;
        loop1 = M.iterator(b);
        return M.jump(_3, _7, loop1);
      }

      function _3(loop1) {
        var j, r;

        if (!(loop1 = loop1.step()).done) {
          j = loop1.value;
          return M.jump(_4, _8, j, loop1, r);
        } else {
          return M.pure(r);
        }
      }

      function _4(j, loop1, r) {
        return M.yldStar((j => {
          var n;
          return M.scope(_1, _2);

          function _1() {
            var r;
            n = m;
            m++;

            if (k === 3) {
              return M.pure(0);
            } else {
              if (k === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scope(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStar(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _2(e) {
            return M.raise(e);
          }
        })(j), _5, _8, loop1, r);
      }

      function _5(a, loop1, r) {
        switch (a) {
          case 0:
            return M.pure(0);

          case 1:
            return M.pure(1);

          case 2:
            return M.jump(_3, _7, loop1);

          case 3:
            return M.pure(r);

          default:
            return M.jump(_3, _7, loop1);
        }
      }

      function _6(ex) {
        var e;
        e = ex;

        if (loop1.exit) {
          loop1.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        return M.jump(_6, _7, a);
      }
    })(i), _24, _55, loop13);
  }

  function _24(a, loop13) {
    switch (a) {
      case 0:
        return M.jump(_22, _48, loop13);

      case 1:
        return M.jump(_26, _48);

      default:
        return M.jump(_22, _48, loop13);
    }
  }

  function _25(ex) {
    var e;
    e = ex;

    if (loop13.exit) {
      loop13.exit();
    }

    throw e;
  }

  function _26() {
    var loop14;
    k = 0;
    loop14 = M.iterator(a);
    return M.jump(_27, _48, loop14);
  }

  function _27(loop14) {
    var i;

    if (!(loop14 = loop14.step()).done) {
      i = loop14.value;
      return M.jump(_28, _56, i, loop14);
    } else {
      return M.jump(_31, _48);
    }
  }

  function _28(i, loop14) {
    return M.yldStar((i => {
      var m;
      return M.scope(_1, _6);

      function _1() {
        var loop2;
        m = 0;
        k++;
        loop2 = M.iterator(b);
        return M.jump(_2, _6, loop2);
      }

      function _2(loop2) {
        var j, r;

        if (!(loop2 = loop2.step()).done) {
          j = loop2.value;
          return M.jump(_3, _7, j, loop2, r);
        } else {
          return M.pure(r);
        }
      }

      function _3(j, loop2, r) {
        return M.yldStar((j => {
          var n;
          return M.scope(_1, _3);

          function _1() {
            n = m;
            m++;
            return M.yldStar(M.yld(`fo19 ${i} ${j} ${k} ${m} ${n}`), _2, _3);
          }

          function _2() {
            var r;

            if (k === 3) {
              return M.pure(0);
            } else {
              if (k === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scope(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStar(M.yld(`fo20: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j), _4, _7, loop2, r);
      }

      function _4(a, loop2, r) {
        switch (a) {
          case 0:
            return M.pure(0);

          case 1:
            return M.pure(1);

          case 2:
            return M.jump(_2, _6, loop2);

          case 3:
            return M.pure(r);

          default:
            return M.jump(_2, _6, loop2);
        }
      }

      function _5(ex) {
        var e;
        e = ex;

        if (loop2.exit) {
          loop2.exit();
        }

        throw e;
      }

      function _6(e) {
        return M.raise(e);
      }

      function _7(a) {
        return M.jump(_5, _6, a);
      }
    })(i), _29, _56, loop14);
  }

  function _29(a, loop14) {
    switch (a) {
      case 0:
        return M.jump(_27, _48, loop14);

      case 1:
        return M.jump(_31, _48);

      default:
        return M.jump(_27, _48, loop14);
    }
  }

  function _30(ex) {
    var e;
    e = ex;

    if (loop14.exit) {
      loop14.exit();
    }

    throw e;
  }

  function _31() {
    _k = 0;
    return M.yldStar(M.yld(`fo21: ${i} ${_k}`), _32, _48);
  }

  function _32() {
    var loop15;
    loop15 = M.iterator(a);
    return M.jump(_33, _48, loop15);
  }

  function _33(loop15) {
    var i;

    if (!(loop15 = loop15.step()).done) {
      i = loop15.value;
      return M.jump(_34, _57, i, loop15);
    } else {
      return M.jump(_37, _48);
    }
  }

  function _34(i, loop15) {
    return M.yldStar((i => {
      var m;
      return M.scope(_1, _7);

      function _1() {
        m = 0;
        _k++;
        return M.yldStar(M.yld(`fo22: ${i} ${_k} ${m}`), _2, _7);
      }

      function _2() {
        var loop3;
        loop3 = M.iterator(b);
        return M.jump(_3, _7, loop3);
      }

      function _3(loop3) {
        var j, r;

        if (!(loop3 = loop3.step()).done) {
          j = loop3.value;
          return M.jump(_4, _8, j, loop3, r);
        } else {
          return M.pure(r);
        }
      }

      function _4(j, loop3, r) {
        return M.yldStar((j => {
          var n;
          return M.scope(_1, _3);

          function _1() {
            n = m;
            m++;
            return M.yldStar(M.yld(`fo23 ${i} ${j} ${_k} ${m} ${n}`), _2, _3);
          }

          function _2() {
            var r;

            if (_k === 3) {
              return M.pure(0);
            } else {
              if (_k === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scope(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStar(M.yld(`fo24: ${i} ${j} ${_k} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j), _5, _8, loop3, r);
      }

      function _5(a, loop3, r) {
        switch (a) {
          case 1:
            return M.pure(0);

          case 0:
            return M.pure(1);

          case 2:
            return M.jump(_3, _7, loop3);

          case 3:
            return M.pure(r);

          default:
            return M.jump(_3, _7, loop3);
        }
      }

      function _6(ex) {
        var e;
        e = ex;

        if (loop3.exit) {
          loop3.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        return M.jump(_6, _7, a);
      }
    })(i), _35, _57, loop15);
  }

  function _35(a, loop15) {
    switch (a) {
      case 0:
        return M.jump(_37, _48);

      case 1:
        return M.jump(_33, _48, loop15);

      default:
        return M.jump(_33, _48, loop15);
    }
  }

  function _36(ex) {
    var e;
    e = ex;

    if (loop15.exit) {
      loop15.exit();
    }

    throw e;
  }

  function _37() {
    k1 = 0;
    return M.yldStar(M.yld(`fo25`), _38, _48);
  }

  function _38() {
    var loop16;
    loop16 = M.iterator(a);
    return M.jump(_39, _48, loop16);
  }

  function _39(loop16) {
    var i;

    if (!(loop16 = loop16.step()).done) {
      i = loop16.value;
      return M.jump(_40, _58, i, loop16);
    } else {
      return M.jump(_43, _48);
    }
  }

  function _40(i, loop16) {
    return M.yldStar((i => {
      var m;
      return M.scope(_1, _7);

      function _1() {
        m = 0;
        k1++;
        return M.yldStar(M.yld(`fo26: ${i} ${k1} ${m}`), _2, _7);
      }

      function _2() {
        var loop4;
        loop4 = M.iterator(b);
        return M.jump(_3, _7, loop4);
      }

      function _3(loop4) {
        var j, r;

        if (!(loop4 = loop4.step()).done) {
          j = loop4.value;
          return M.jump(_4, _8, j, loop4, r);
        } else {
          return M.pure(r);
        }
      }

      function _4(j, loop4, r) {
        return M.yldStar((j => {
          var n;
          return M.scope(_1, _3);

          function _1() {
            n = m;
            m++;
            return M.yldStar(M.yld(`fo27 ${i} ${j} ${k1} ${m} ${n}`), _2, _3);
          }

          function _2() {
            var r;

            if (k1 === 3) {
              return M.pure(0);
            } else {
              if (k1 === 5) {
                return M.pure(1);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scope(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStar(M.yld(`fo28: ${i} ${j} ${k1} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3(e) {
            return M.raise(e);
          }
        })(j), _5, _8, loop4, r);
      }

      function _5(a, loop4, r) {
        switch (a) {
          case 1:
            return M.pure(0);

          case 0:
            return M.pure(1);

          case 2:
            return M.jump(_3, _7, loop4);

          case 3:
            return M.pure(r);

          default:
            return M.jump(_3, _7, loop4);
        }
      }

      function _6(ex) {
        var e;
        e = ex;

        if (loop4.exit) {
          loop4.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        return M.jump(_6, _7, a);
      }
    })(i), _41, _58, loop16);
  }

  function _41(a, loop16) {
    switch (a) {
      case 0:
        return M.jump(_43, _48);

      case 1:
        return M.jump(_39, _48, loop16);

      default:
        return M.jump(_39, _48, loop16);
    }
  }

  function _42(ex) {
    var e;
    e = ex;

    if (loop16.exit) {
      loop16.exit();
    }

    throw e;
  }

  function _43() {
    var loop17;
    k2 = 0;
    loop17 = M.iterator(a);
    return M.jump(_44, _48, loop17);
  }

  function _44(loop17) {
    var i, r;

    if (!(loop17 = loop17.step()).done) {
      i = loop17.value;
      return M.jump(_45, _59, i, loop17);
    } else {
      return M.pure(r);
    }
  }

  function _45(i, loop17) {
    return M.yldStar((i => {
      var m;
      return M.scope(_1, _7);

      function _1() {
        m = 0;
        k2++;
        return M.yldStar(M.yld(`fo29: ${i} ${k2} ${m}`), _2, _7);
      }

      function _2() {
        var loop6;
        loop6 = M.iterator(b);
        return M.jump(_3, _7, loop6);
      }

      function _3(loop6) {
        var j, r;

        if (!(loop6 = loop6.step()).done) {
          j = loop6.value;
          return M.jump(_4, _8, j, loop6, r);
        } else {
          return M.pure(r);
        }
      }

      function _4(j, loop6, r) {
        return M.yldStar((j => {
          var n, _i;

          return M.scope(_1, _6);

          function _1() {
            n = m;
            m++;
            return M.yldStar(M.yld(`fo30 ${i} ${j} ${k2} ${m} ${n}`), _2, _6);
          }

          function _2() {
            var loop5, r;

            if (k2 === 3) {
              return M.pure(0);
            } else {
              if (k2 === 5) {
                loop5 = M.iterator(funs);
                return M.jump(_3, _6, loop5);
              } else {
                if (n === 3) {
                  return M.pure(2);
                } else {
                  if (n === 5) {
                    return M.pure(3);
                  } else {
                    funs.push(function iter() {
                      return M.scope(_1, _3);

                      function _1() {
                        n++;
                        return M.yldStar(M.yld(`fo31: ${i} ${j} ${k2} ${m} ${n}`), _2, _3);
                      }

                      function _2() {
                        return M.pure();
                      }

                      function _3(e) {
                        return M.raise(e);
                      }
                    });
                    return M.pure(r);
                  }
                }
              }
            }
          }

          function _3(loop5) {
            if (!(loop5 = loop5.step()).done) {
              _i = loop5.value;
              return M.jump(_4, _7, loop5);
            } else {
              return M.pure((br = `r: ${i} ${j} ${k2} ${m} ${n}`, 1));
            }
          }

          function _4(loop5) {
            var a;
            a = _i();
            return M.repeat(M.yldStar(a), _3, _6, loop5);
          }

          function _5(ex) {
            var e;
            e = ex;

            if (loop5.exit) {
              loop5.exit();
            }

            throw e;
          }

          function _6(e) {
            return M.raise(e);
          }

          function _7(a) {
            return M.jump(_5, _6, a);
          }
        })(j), _5, _8, loop6, r);
      }

      function _5(a, loop6, r) {
        switch (a) {
          case 1:
            return M.pure(0);

          case 0:
            return M.pure(1);

          case 2:
            return M.jump(_3, _7, loop6);

          case 3:
            return M.pure(r);

          default:
            return M.jump(_3, _7, loop6);
        }
      }

      function _6(ex) {
        var e;
        e = ex;

        if (loop6.exit) {
          loop6.exit();
        }

        throw e;
      }

      function _7(e) {
        return M.raise(e);
      }

      function _8(a) {
        return M.jump(_6, _7, a);
      }
    })(i), _46, _59, loop17);
  }

  function _46(a, loop17) {
    var br;

    switch (a) {
      case 0:
        return M.pure(br);

      case 1:
        return M.jump(_44, _48, loop17);

      default:
        return M.jump(_44, _48, loop17);
    }
  }

  function _47(ex) {
    var e;
    e = ex;

    if (loop17.exit) {
      loop17.exit();
    }

    throw e;
  }

  function _48(e) {
    return M.raise(e);
  }

  function _49(a) {
    return M.jump(_4, _48, a);
  }

  function _50(a) {
    return M.jump(_7, _48, a);
  }

  function _51(a) {
    return M.jump(_10, _48, a);
  }

  function _52(a) {
    return M.jump(_13, _48, a);
  }

  function _53(a) {
    return M.jump(_16, _48, a);
  }

  function _54(a) {
    return M.jump(_20, _48, a);
  }

  function _55(a) {
    return M.jump(_25, _48, a);
  }

  function _56(a) {
    return M.jump(_30, _48, a);
  }

  function _57(a) {
    return M.jump(_36, _48, a);
  }

  function _58(a) {
    return M.jump(_42, _48, a);
  }

  function _59(a) {
    return M.jump(_47, _48, a);
  }
}