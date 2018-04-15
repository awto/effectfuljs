import * as M from "@effectful/core";

function forOfBlockScope() {
  var a, b, funs, i, j, _i, k, _k, k1, k2;

  return M.scope(_1);

  function _1() {
    var _i, i1, loop;

    a = [1, 2, 3, 4, 5, 6, 7, 8];
    b = [10, 11, 12, 13, 14, 15, 16];
    funs = [];

    for (_i of a) {
      (i => {
        let j = 0;
        funs.push(function iter() {
          return M.scope(_1);

          function _1() {
            return M.yldStar(M.yld(`fo1: ${i} ${j++}`), _2);
          }

          function _2() {
            return M.pure();
          }
        });
      })(_i);
    }

    for (i of a) {
      j = 0;
      funs.push(function iter() {
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(`fo2: ${i} ${j++}`), _2);
        }

        function _2() {
          return M.pure();
        }
      });
    }

    for (i1 of a) {
      (i => {
        for (let j of b) {
          (j => {
            funs.push(function iter() {
              return M.scope(_1);

              function _1() {
                return M.yldStar(M.yld(`fo3: ${i} ${j++}`), _2);
              }

              function _2() {
                return M.pure();
              }
            });
          })(j);
        }
      })(i1);
    }

    loop = M.iterator(a);
    return M.jump(void 0, _2, _55, loop);
  }

  function _2(c, loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        return M.scope(_1);

        function _1() {
          var loop;
          loop = M.iterator(b);
          return M.jump(void 0, _2, _7, loop);
        }

        function _2(b, loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              return M.scope(_1);

              function _1() {
                return M.yldStar(M.yld(`fo4: ${j}`), _2);
              }

              function _2() {
                funs.push(function iter() {
                  return M.scope(_1);

                  function _1() {
                    return M.yldStar(M.yld(`fo5: ${i} ${j++}`), _2);
                  }

                  function _2() {
                    return M.pure();
                  }
                });
                return M.pure();
              }
            })(j);

            return M.yldStar(M.yldStar(a), _2, _7, loop);
          } else {
            return M.jump(void 0, _3, loop, _4, _5);
          }
        }

        function _3(loop, fc, fe, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe, err);
        }

        function _4() {
          return M.pure();
        }

        function _5(e) {
          return M.raise(e);
        }

        function _6(err) {
          return M.raise(err);
        }

        function _7(a) {
          return M.jump(void 0, _3, void 0, _6, _5, a);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _2, _55, loop);
    } else {
      return M.jump(void 0, _3, loop, _4, _43);
    }
  }

  function _3(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _4() {
    var loop;
    loop = M.iterator(a);
    return M.jump(void 0, _5, _56, loop);
  }

  function _5(c, loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(`fo6: ${i}`), _2);
        }

        function _2() {
          var j;

          for (j of b) {
            (j => {
              funs.push(function iter() {
                return M.scope(_1);

                function _1() {
                  return M.yldStar(M.yld(`fo7: ${i} ${j++}`), _2);
                }

                function _2() {
                  return M.pure();
                }
              });
            })(j);
          }

          return M.pure();
        }
      })(i);

      return M.yldStar(M.yldStar(a), _5, _56, loop);
    } else {
      return M.jump(void 0, _6, loop, _7, _43);
    }
  }

  function _6(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _7() {
    var loop;
    loop = M.iterator(a);
    return M.jump(void 0, _8, _57, loop);
  }

  function _8(c, loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(`fo8 ${i}`), _2);
        }

        function _2() {
          var loop;
          loop = M.iterator(b);
          return M.jump(void 0, _3, _8, loop);
        }

        function _3(b, loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              return M.scope(_1);

              function _1() {
                return M.yldStar(M.yld(`fo9: ${i}`), _2);
              }

              function _2() {
                funs.push(function iter() {
                  return M.scope(_1);

                  function _1() {
                    return M.yldStar(M.yld(`fo10: ${i} ${j++}`), _2);
                  }

                  function _2() {
                    return M.pure();
                  }
                });
                return M.pure();
              }
            })(j);

            return M.yldStar(M.yldStar(a), _3, _8, loop);
          } else {
            return M.jump(void 0, _4, loop, _5, _6);
          }
        }

        function _4(loop, fc, fe, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe, err);
        }

        function _5() {
          return M.pure();
        }

        function _6(e) {
          return M.raise(e);
        }

        function _7(err) {
          return M.raise(err);
        }

        function _8(a) {
          return M.jump(void 0, _4, void 0, _7, _6, a);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _8, _57, loop);
    } else {
      return M.jump(void 0, _9, loop, _10, _43);
    }
  }

  function _9(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _10() {
    var loop;
    loop = M.iterator(funs);
    return M.jump(void 0, _11, _58, loop);
  }

  function _11(b, loop) {
    var a;

    if (!(loop = loop.step()).done) {
      _i = loop.value;
      a = _i();
      return M.yldStar(M.yldStar(a), _11, _58, loop);
    } else {
      return M.jump(void 0, _12, loop, _13, _43);
    }
  }

  function _12(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _13() {
    var i, loop;
    funs.length = 0;

    for (i of a) {
      (i => {
        funs.push(function iter() {
          return M.scope(_1);

          function _1() {
            return M.yldStar(M.yld(`fo11: ${i}`), _2);
          }

          function _2() {
            return M.pure();
          }
        });
      })(i);
    }

    loop = M.iterator(a);
    return M.jump(void 0, _14, _59, loop);
  }

  function _14(b, loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(`fo12 ${i}`), _2);
        }

        function _2() {
          funs.push(function iter() {
            return M.scope(_1);

            function _1() {
              return M.yldStar(M.yld(`fo13 ${i}`), _2);
            }

            function _2() {
              return M.pure();
            }
          });
          return M.pure();
        }
      })(i);

      return M.yldStar(M.yldStar(a), _14, _59, loop);
    } else {
      return M.jump(void 0, _15, loop, _16, _43);
    }
  }

  function _15(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _16() {
    var loop;
    k = 0;
    loop = M.iterator(a);
    return M.jump(void 0, _17, _60, loop);
  }

  function _17(loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var m;
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(`fo14 ${i} ${k} {m}`), _2);
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
                return M.scope(_1);

                function _1() {
                  return M.yldStar(M.yld(`fo15 ${i} ${k} {m}`), _2);
                }

                function _2() {
                  return M.pure();
                }
              });
              return M.pure(r);
            }
          }
        }
      })(i);

      return M.yldStar(M.yldStar(a), _18, _60, loop);
    } else {
      return M.jump(void 0, _19, loop, _20, _43);
    }
  }

  function _18(a, loop) {
    switch (a) {
      case 0:
        return M.jump(void 0, _17, _60, loop);

      case 1:
        return M.jump(void 0, _19, loop, _20, _43);

      default:
        return M.jump(void 0, _17, _60, loop);
    }
  }

  function _19(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _20() {
    var i, loop;
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
              return M.scope(_1);

              function _1() {
                n++;
                return M.yldStar(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2);
              }

              function _2() {
                return M.pure();
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
    loop = M.iterator(a);
    return M.jump(void 0, _21, _61, loop);
  }

  function _21(loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var m;
        return M.scope(_1);

        function _1() {
          m = 0;
          k++;
          return M.yldStar(M.yld(`fo16: ${i} ${k} ${m}`), _2);
        }

        function _2() {
          var loop;
          loop = M.iterator(b);
          return M.jump(void 0, _3, _9, loop);
        }

        function _3(loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              var n;
              return M.scope(_1);

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
                          return M.scope(_1);

                          function _1() {
                            n++;
                            return M.yldStar(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2);
                          }

                          function _2() {
                            return M.pure();
                          }
                        });
                        return M.pure(r);
                      }
                    }
                  }
                }
              }
            })(j);

            return M.yldStar(M.yldStar(a), _4, _9, loop);
          } else {
            return M.jump(void 0, _5, loop, _6, _7);
          }
        }

        function _4(a, loop) {
          switch (a) {
            case 0:
              return M.jump(0, _5, loop, _6, _7);

            case 1:
              return M.jump(1, _5, loop, _6, _7);

            case 2:
              return M.jump(void 0, _3, _9, loop);

            case 3:
              return M.jump(void 0, _5, loop, _6, _7);

            default:
              return M.jump(void 0, _3, _9, loop);
          }
        }

        function _5(loop, fc, fe, r, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe, r, err);
        }

        function _6(r) {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8(r, err) {
          return M.raise(err);
        }

        function _9(a) {
          return M.jump(void 0, _5, void 0, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _22, _61, loop);
    } else {
      return M.jump(void 0, _23, loop, _24, _43);
    }
  }

  function _22(a, loop) {
    switch (a) {
      case 0:
        return M.jump(void 0, _21, _61, loop);

      case 1:
        return M.jump(void 0, _23, loop, _24, _43);

      default:
        return M.jump(void 0, _21, _61, loop);
    }
  }

  function _23(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _24() {
    var loop;
    k = 0;
    loop = M.iterator(a);
    return M.jump(void 0, _25, _62, loop);
  }

  function _25(loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var m;
        return M.scope(_1);

        function _1() {
          var loop;
          m = 0;
          k++;
          loop = M.iterator(b);
          return M.jump(void 0, _2, _8, loop);
        }

        function _2(loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              var n;
              return M.scope(_1);

              function _1() {
                n = m;
                m++;
                return M.yldStar(M.yld(`fo19 ${i} ${j} ${k} ${m} ${n}`), _2);
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
                          return M.scope(_1);

                          function _1() {
                            n++;
                            return M.yldStar(M.yld(`fo20: ${i} ${j} ${k} ${m} ${n}`), _2);
                          }

                          function _2() {
                            return M.pure();
                          }
                        });
                        return M.pure(r);
                      }
                    }
                  }
                }
              }
            })(j);

            return M.yldStar(M.yldStar(a), _3, _8, loop);
          } else {
            return M.jump(void 0, _4, loop, _5, _6);
          }
        }

        function _3(a, loop) {
          switch (a) {
            case 0:
              return M.jump(0, _4, loop, _5, _6);

            case 1:
              return M.jump(1, _4, loop, _5, _6);

            case 2:
              return M.jump(void 0, _2, _8, loop);

            case 3:
              return M.jump(void 0, _4, loop, _5, _6);

            default:
              return M.jump(void 0, _2, _8, loop);
          }
        }

        function _4(loop, fc, fe, r, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe, r, err);
        }

        function _5(r) {
          return M.pure(r);
        }

        function _6(e) {
          return M.raise(e);
        }

        function _7(r, err) {
          return M.raise(err);
        }

        function _8(a) {
          return M.jump(void 0, _4, void 0, _7, _6, void 0, a);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _26, _62, loop);
    } else {
      return M.jump(void 0, _27, loop, _28, _43);
    }
  }

  function _26(a, loop) {
    switch (a) {
      case 0:
        return M.jump(void 0, _25, _62, loop);

      case 1:
        return M.jump(void 0, _27, loop, _28, _43);

      default:
        return M.jump(void 0, _25, _62, loop);
    }
  }

  function _27(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _28() {
    _k = 0;
    return M.yldStar(M.yld(`fo21: ${i} ${_k}`), _29);
  }

  function _29() {
    var loop;
    loop = M.iterator(a);
    return M.jump(void 0, _30, _63, loop);
  }

  function _30(loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var m;
        return M.scope(_1);

        function _1() {
          m = 0;
          _k++;
          return M.yldStar(M.yld(`fo22: ${i} ${_k} ${m}`), _2);
        }

        function _2() {
          var loop;
          loop = M.iterator(b);
          return M.jump(void 0, _3, _9, loop);
        }

        function _3(loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              var n;
              return M.scope(_1);

              function _1() {
                n = m;
                m++;
                return M.yldStar(M.yld(`fo23 ${i} ${j} ${_k} ${m} ${n}`), _2);
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
                          return M.scope(_1);

                          function _1() {
                            n++;
                            return M.yldStar(M.yld(`fo24: ${i} ${j} ${_k} ${m} ${n}`), _2);
                          }

                          function _2() {
                            return M.pure();
                          }
                        });
                        return M.pure(r);
                      }
                    }
                  }
                }
              }
            })(j);

            return M.yldStar(M.yldStar(a), _4, _9, loop);
          } else {
            return M.jump(void 0, _5, loop, _6, _7);
          }
        }

        function _4(a, loop) {
          switch (a) {
            case 1:
              return M.jump(0, _5, loop, _6, _7);

            case 0:
              return M.jump(1, _5, loop, _6, _7);

            case 2:
              return M.jump(void 0, _3, _9, loop);

            case 3:
              return M.jump(void 0, _5, loop, _6, _7);

            default:
              return M.jump(void 0, _3, _9, loop);
          }
        }

        function _5(loop, fc, fe, r, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe, r, err);
        }

        function _6(r) {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8(r, err) {
          return M.raise(err);
        }

        function _9(a) {
          return M.jump(void 0, _5, void 0, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _31, _63, loop);
    } else {
      return M.jump(void 0, _32, loop, _33, _43);
    }
  }

  function _31(a, loop) {
    switch (a) {
      case 0:
        return M.jump(void 0, _32, loop, _33, _43);

      case 1:
        return M.jump(void 0, _30, _63, loop);

      default:
        return M.jump(void 0, _30, _63, loop);
    }
  }

  function _32(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _33() {
    k1 = 0;
    return M.yldStar(M.yld(`fo25`), _34);
  }

  function _34() {
    var loop;
    loop = M.iterator(a);
    return M.jump(void 0, _35, _64, loop);
  }

  function _35(loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var m;
        return M.scope(_1);

        function _1() {
          m = 0;
          k1++;
          return M.yldStar(M.yld(`fo26: ${i} ${k1} ${m}`), _2);
        }

        function _2() {
          var loop;
          loop = M.iterator(b);
          return M.jump(void 0, _3, _9, loop);
        }

        function _3(loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              var n;
              return M.scope(_1);

              function _1() {
                n = m;
                m++;
                return M.yldStar(M.yld(`fo27 ${i} ${j} ${k1} ${m} ${n}`), _2);
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
                          return M.scope(_1);

                          function _1() {
                            n++;
                            return M.yldStar(M.yld(`fo28: ${i} ${j} ${k1} ${m} ${n}`), _2);
                          }

                          function _2() {
                            return M.pure();
                          }
                        });
                        return M.pure(r);
                      }
                    }
                  }
                }
              }
            })(j);

            return M.yldStar(M.yldStar(a), _4, _9, loop);
          } else {
            return M.jump(void 0, _5, loop, _6, _7);
          }
        }

        function _4(a, loop) {
          switch (a) {
            case 1:
              return M.jump(0, _5, loop, _6, _7);

            case 0:
              return M.jump(1, _5, loop, _6, _7);

            case 2:
              return M.jump(void 0, _3, _9, loop);

            case 3:
              return M.jump(void 0, _5, loop, _6, _7);

            default:
              return M.jump(void 0, _3, _9, loop);
          }
        }

        function _5(loop, fc, fe, r, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe, r, err);
        }

        function _6(r) {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8(r, err) {
          return M.raise(err);
        }

        function _9(a) {
          return M.jump(void 0, _5, void 0, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _36, _64, loop);
    } else {
      return M.jump(void 0, _37, loop, _38, _43);
    }
  }

  function _36(a, loop) {
    switch (a) {
      case 0:
        return M.jump(void 0, _37, loop, _38, _43);

      case 1:
        return M.jump(void 0, _35, _64, loop);

      default:
        return M.jump(void 0, _35, _64, loop);
    }
  }

  function _37(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _38() {
    var loop;
    k2 = 0;
    loop = M.iterator(a);
    return M.jump(void 0, _39, _65, loop);
  }

  function _39(loop) {
    var i, a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var m;
        return M.scope(_1);

        function _1() {
          m = 0;
          k2++;
          return M.yldStar(M.yld(`fo29: ${i} ${k2} ${m}`), _2);
        }

        function _2() {
          var loop;
          loop = M.iterator(b);
          return M.jump(void 0, _3, _9, loop);
        }

        function _3(loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              var n, _i;

              return M.scope(_1);

              function _1() {
                n = m;
                m++;
                return M.yldStar(M.yld(`fo30 ${i} ${j} ${k2} ${m} ${n}`), _2);
              }

              function _2() {
                var loop, r;

                if (k2 === 3) {
                  return M.pure(0);
                } else {
                  if (k2 === 5) {
                    loop = M.iterator(funs);
                    return M.jump(void 0, _3, _8, loop);
                  } else {
                    if (n === 3) {
                      return M.pure(2);
                    } else {
                      if (n === 5) {
                        return M.pure(3);
                      } else {
                        funs.push(function iter() {
                          return M.scope(_1);

                          function _1() {
                            n++;
                            return M.yldStar(M.yld(`fo31: ${i} ${j} ${k2} ${m} ${n}`), _2);
                          }

                          function _2() {
                            return M.pure();
                          }
                        });
                        return M.pure(r);
                      }
                    }
                  }
                }
              }

              function _3(b, loop) {
                var a;

                if (!(loop = loop.step()).done) {
                  _i = loop.value;
                  a = _i();
                  return M.yldStar(M.yldStar(a), _3, _8, loop);
                } else {
                  return M.jump(void 0, _4, loop, _5, _6);
                }
              }

              function _4(loop, fc, fe, err) {
                if (loop.exit) {
                  loop.exit();
                }

                return M.jump(void 0, fc, fe, err);
              }

              function _5() {
                var br;
                return M.pure((br = `r: ${i} ${j} ${k2} ${m} ${n}`, 1));
              }

              function _6(e) {
                return M.raise(e);
              }

              function _7(err) {
                return M.raise(err);
              }

              function _8(a) {
                return M.jump(void 0, _4, void 0, _7, _6, a);
              }
            })(j);

            return M.yldStar(M.yldStar(a), _4, _9, loop);
          } else {
            return M.jump(void 0, _5, loop, _6, _7);
          }
        }

        function _4(a, loop) {
          switch (a) {
            case 1:
              return M.jump(0, _5, loop, _6, _7);

            case 0:
              return M.jump(1, _5, loop, _6, _7);

            case 2:
              return M.jump(void 0, _3, _9, loop);

            case 3:
              return M.jump(void 0, _5, loop, _6, _7);

            default:
              return M.jump(void 0, _3, _9, loop);
          }
        }

        function _5(loop, fc, fe, r, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe, r, err);
        }

        function _6(r) {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8(r, err) {
          return M.raise(err);
        }

        function _9(a) {
          return M.jump(void 0, _5, void 0, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _40, _65, loop);
    } else {
      return M.jump(void 0, _41, loop, _42, _43);
    }
  }

  function _40(a, loop) {
    var br;

    switch (a) {
      case 0:
        return M.jump(br, _41, loop, _42, _43);

      case 1:
        return M.jump(void 0, _39, _65, loop);

      default:
        return M.jump(void 0, _39, _65, loop);
    }
  }

  function _41(loop, fc, fe, r, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, r, err);
  }

  function _42(r) {
    return M.pure(r);
  }

  function _43(e) {
    return M.raise(e);
  }

  function _44(err) {
    return M.raise(err);
  }

  function _45(err) {
    return M.raise(err);
  }

  function _46(err) {
    return M.raise(err);
  }

  function _47(err) {
    return M.raise(err);
  }

  function _48(err) {
    return M.raise(err);
  }

  function _49(err) {
    return M.raise(err);
  }

  function _50(err) {
    return M.raise(err);
  }

  function _51(err) {
    return M.raise(err);
  }

  function _52(err) {
    return M.raise(err);
  }

  function _53(err) {
    return M.raise(err);
  }

  function _54(r, err) {
    return M.raise(err);
  }

  function _55(a) {
    return M.jump(void 0, _3, void 0, _44, _43, a);
  }

  function _56(a) {
    return M.jump(void 0, _6, void 0, _45, _43, a);
  }

  function _57(a) {
    return M.jump(void 0, _9, void 0, _46, _43, a);
  }

  function _58(a) {
    return M.jump(void 0, _12, void 0, _47, _43, a);
  }

  function _59(a) {
    return M.jump(void 0, _15, void 0, _48, _43, a);
  }

  function _60(a) {
    return M.jump(void 0, _19, void 0, _49, _43, a);
  }

  function _61(a) {
    return M.jump(void 0, _23, void 0, _50, _43, a);
  }

  function _62(a) {
    return M.jump(void 0, _27, void 0, _51, _43, a);
  }

  function _63(a) {
    return M.jump(void 0, _32, void 0, _52, _43, a);
  }

  function _64(a) {
    return M.jump(void 0, _37, void 0, _53, _43, a);
  }

  function _65(a) {
    return M.jump(void 0, _41, void 0, _54, _43, void 0, a);
  }
}