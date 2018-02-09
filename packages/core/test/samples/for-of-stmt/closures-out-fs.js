function forOfBlockScope() {
  var a, b, funs, i, j, _i, k, _k, k1, k2;

  return M.scopeH(_1, _43);

  function _1() {
    var _i, i1, loop7;

    a = [1, 2, 3, 4, 5, 6, 7, 8];
    b = [10, 11, 12, 13, 14, 15, 16];
    funs = [];

    for (_i of a) {
      (i => {
        let j = 0;
        funs.push(function iter() {
          return M.scopeH(_1, _3);

          function _1() {
            return M.yldStarBH(M.yld(`fo1: ${i} ${j++}`), _2, _3);
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
        return M.scopeH(_1, _3);

        function _1() {
          return M.yldStarBH(M.yld(`fo2: ${i} ${j++}`), _2, _3);
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
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo3: ${i} ${j++}`), _2, _3);
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
    return M.jumpH(_2, _55, loop7);
  }

  function _2(loop7) {
    var i, a;

    if (!(loop7 = loop7.step()).done) {
      i = loop7.value;

      a = (i => {
        return M.scopeH(_1, _5);

        function _1() {
          var loop;
          loop = M.iterator(b);
          return M.jumpH(_2, _7, loop);
        }

        function _2(loop) {
          var j, a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo4: ${j}`), _2, _3);
              }

              function _2() {
                funs.push(function iter() {
                  return M.scopeH(_1, _3);

                  function _1() {
                    return M.yldStarBH(M.yld(`fo5: ${i} ${j++}`), _2, _3);
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
            })(j);

            return M.yldStarBH(M.yldStar(a), _2, _7, loop);
          } else {
            return M.jumpH(_3, _5, _4, _5);
          }
        }

        function _3(fc, fe, err) {
          if (loop.exit) {
            loop.exit();
          }

          return M.jumpH(fc, fe, err);
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
          return M.jumpH(_3, _5, _6, _5, a);
        }
      })(i);

      return M.yldStarBH(M.yldStar(a), _2, _55, loop7);
    } else {
      return M.jumpH(_3, _43, _4, _43);
    }
  }

  function _3(fc, fe, err) {
    if (loop7.exit) {
      loop7.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _4() {
    var loop8;
    loop8 = M.iterator(a);
    return M.jumpH(_5, _56, loop8);
  }

  function _5(loop8) {
    var i, a;

    if (!(loop8 = loop8.step()).done) {
      i = loop8.value;

      a = (i => {
        return M.scopeH(_1, _3);

        function _1() {
          return M.yldStarBH(M.yld(`fo6: ${i}`), _2, _3);
        }

        function _2() {
          var j;

          for (j of b) {
            (j => {
              funs.push(function iter() {
                return M.scopeH(_1, _3);

                function _1() {
                  return M.yldStarBH(M.yld(`fo7: ${i} ${j++}`), _2, _3);
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
      })(i);

      return M.yldStarBH(M.yldStar(a), _5, _56, loop8);
    } else {
      return M.jumpH(_6, _43, _7, _43);
    }
  }

  function _6(fc, fe, err) {
    if (loop8.exit) {
      loop8.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _7() {
    var loop9;
    loop9 = M.iterator(a);
    return M.jumpH(_8, _57, loop9);
  }

  function _8(loop9) {
    var i, a;

    if (!(loop9 = loop9.step()).done) {
      i = loop9.value;

      a = (i => {
        return M.scopeH(_1, _6);

        function _1() {
          return M.yldStarBH(M.yld(`fo8 ${i}`), _2, _6);
        }

        function _2() {
          var _loop;

          _loop = M.iterator(b);
          return M.jumpH(_3, _8, _loop);
        }

        function _3(_loop) {
          var j, a;

          if (!(_loop = _loop.step()).done) {
            j = _loop.value;

            a = (j => {
              return M.scopeH(_1, _3);

              function _1() {
                return M.yldStarBH(M.yld(`fo9: ${i}`), _2, _3);
              }

              function _2() {
                funs.push(function iter() {
                  return M.scopeH(_1, _3);

                  function _1() {
                    return M.yldStarBH(M.yld(`fo10: ${i} ${j++}`), _2, _3);
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
            })(j);

            return M.yldStarBH(M.yldStar(a), _3, _8, _loop);
          } else {
            return M.jumpH(_4, _6, _5, _6);
          }
        }

        function _4(fc, fe, err) {
          if (_loop.exit) {
            _loop.exit();
          }

          return M.jumpH(fc, fe, err);
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
          return M.jumpH(_4, _6, _7, _6, a);
        }
      })(i);

      return M.yldStarBH(M.yldStar(a), _8, _57, loop9);
    } else {
      return M.jumpH(_9, _43, _10, _43);
    }
  }

  function _9(fc, fe, err) {
    if (loop9.exit) {
      loop9.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _10() {
    var loop10;
    loop10 = M.iterator(funs);
    return M.jumpH(_11, _58, loop10);
  }

  function _11(loop10) {
    var a;

    if (!(loop10 = loop10.step()).done) {
      _i = loop10.value;
      a = _i();
      return M.yldStarBH(M.yldStar(a), _11, _58, loop10);
    } else {
      return M.jumpH(_12, _43, _13, _43);
    }
  }

  function _12(fc, fe, err) {
    if (loop10.exit) {
      loop10.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _13() {
    var i, loop11;
    funs.length = 0;

    for (i of a) {
      (i => {
        funs.push(function iter() {
          return M.scopeH(_1, _3);

          function _1() {
            return M.yldStarBH(M.yld(`fo11: ${i}`), _2, _3);
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
    return M.jumpH(_14, _59, loop11);
  }

  function _14(loop11) {
    var i, a;

    if (!(loop11 = loop11.step()).done) {
      i = loop11.value;

      a = (i => {
        return M.scopeH(_1, _3);

        function _1() {
          return M.yldStarBH(M.yld(`fo12 ${i}`), _2, _3);
        }

        function _2() {
          funs.push(function iter() {
            return M.scopeH(_1, _3);

            function _1() {
              return M.yldStarBH(M.yld(`fo13 ${i}`), _2, _3);
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
      })(i);

      return M.yldStarBH(M.yldStar(a), _14, _59, loop11);
    } else {
      return M.jumpH(_15, _43, _16, _43);
    }
  }

  function _15(fc, fe, err) {
    if (loop11.exit) {
      loop11.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _16() {
    var loop12;
    k = 0;
    loop12 = M.iterator(a);
    return M.jumpH(_17, _60, loop12);
  }

  function _17(loop12) {
    var i, a;

    if (!(loop12 = loop12.step()).done) {
      i = loop12.value;

      a = (i => {
        var m;
        return M.scopeH(_1, _3);

        function _1() {
          return M.yldStarBH(M.yld(`fo14 ${i} ${k} {m}`), _2, _3);
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
                return M.scopeH(_1, _3);

                function _1() {
                  return M.yldStarBH(M.yld(`fo15 ${i} ${k} {m}`), _2, _3);
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
      })(i);

      return M.yldStarBH(M.yldStar(a), _18, _60, loop12);
    } else {
      return M.jumpH(_19, _43, _20, _43);
    }
  }

  function _18(a, loop12) {
    switch (a) {
      case 0:
        return M.jumpRH(_17, _60, loop12);

      case 1:
        return M.jumpH(_19, _43, _20, _43);

      default:
        return M.jumpRH(_17, _60, loop12);
    }
  }

  function _19(fc, fe, err) {
    if (loop12.exit) {
      loop12.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _20() {
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
              return M.scopeH(_1, _3);

              function _1() {
                n++;
                return M.yldStarBH(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
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
    return M.jumpH(_21, _61, loop13);
  }

  function _21(loop13) {
    var i, a;

    if (!(loop13 = loop13.step()).done) {
      i = loop13.value;

      a = (i => {
        var m;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          k++;
          return M.yldStarBH(M.yld(`fo16: ${i} ${k} ${m}`), _2, _7);
        }

        function _2() {
          var loop1;
          loop1 = M.iterator(b);
          return M.jumpH(_3, _9, loop1);
        }

        function _3(loop1) {
          var j, a;

          if (!(loop1 = loop1.step()).done) {
            j = loop1.value;

            a = (j => {
              var n;
              return M.scopeH(_1, _2);

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
                          return M.scopeH(_1, _3);

                          function _1() {
                            n++;
                            return M.yldStarBH(M.yld(`fo18: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
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
            })(j);

            return M.yldStarBH(M.yldStar(a), _4, _9, loop1);
          } else {
            return M.jumpH(_5, _7, _6, _7);
          }
        }

        function _4(a, loop1) {
          switch (a) {
            case 0:
              return M.jumpBH(0, _5, _7, _6, _7);

            case 1:
              return M.jumpBH(1, _5, _7, _6, _7);

            case 2:
              return M.jumpRH(_3, _9, loop1);

            case 3:
              return M.jumpH(_5, _7, _6, _7);

            default:
              return M.jumpRH(_3, _9, loop1);
          }
        }

        function _5(fc, fe, r, err) {
          if (loop1.exit) {
            loop1.exit();
          }

          return M.jumpH(fc, fe, r, err);
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
          return M.jumpH(_5, _7, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStarBH(M.yldStar(a), _22, _61, loop13);
    } else {
      return M.jumpH(_23, _43, _24, _43);
    }
  }

  function _22(a, loop13) {
    switch (a) {
      case 0:
        return M.jumpRH(_21, _61, loop13);

      case 1:
        return M.jumpH(_23, _43, _24, _43);

      default:
        return M.jumpRH(_21, _61, loop13);
    }
  }

  function _23(fc, fe, err) {
    if (loop13.exit) {
      loop13.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _24() {
    var loop14;
    k = 0;
    loop14 = M.iterator(a);
    return M.jumpH(_25, _62, loop14);
  }

  function _25(loop14) {
    var i, a;

    if (!(loop14 = loop14.step()).done) {
      i = loop14.value;

      a = (i => {
        var m;
        return M.scopeH(_1, _6);

        function _1() {
          var loop2;
          m = 0;
          k++;
          loop2 = M.iterator(b);
          return M.jumpH(_2, _8, loop2);
        }

        function _2(loop2) {
          var j, a;

          if (!(loop2 = loop2.step()).done) {
            j = loop2.value;

            a = (j => {
              var n;
              return M.scopeH(_1, _3);

              function _1() {
                n = m;
                m++;
                return M.yldStarBH(M.yld(`fo19 ${i} ${j} ${k} ${m} ${n}`), _2, _3);
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
                          return M.scopeH(_1, _3);

                          function _1() {
                            n++;
                            return M.yldStarBH(M.yld(`fo20: ${i} ${j} ${k} ${m} ${n}`), _2, _3);
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
            })(j);

            return M.yldStarBH(M.yldStar(a), _3, _8, loop2);
          } else {
            return M.jumpH(_4, _6, _5, _6);
          }
        }

        function _3(a, loop2) {
          switch (a) {
            case 0:
              return M.jumpBH(0, _4, _6, _5, _6);

            case 1:
              return M.jumpBH(1, _4, _6, _5, _6);

            case 2:
              return M.jumpRH(_2, _8, loop2);

            case 3:
              return M.jumpH(_4, _6, _5, _6);

            default:
              return M.jumpRH(_2, _8, loop2);
          }
        }

        function _4(fc, fe, r, err) {
          if (loop2.exit) {
            loop2.exit();
          }

          return M.jumpH(fc, fe, r, err);
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
          return M.jumpH(_4, _6, _7, _6, void 0, a);
        }
      })(i);

      return M.yldStarBH(M.yldStar(a), _26, _62, loop14);
    } else {
      return M.jumpH(_27, _43, _28, _43);
    }
  }

  function _26(a, loop14) {
    switch (a) {
      case 0:
        return M.jumpRH(_25, _62, loop14);

      case 1:
        return M.jumpH(_27, _43, _28, _43);

      default:
        return M.jumpRH(_25, _62, loop14);
    }
  }

  function _27(fc, fe, err) {
    if (loop14.exit) {
      loop14.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _28() {
    _k = 0;
    return M.yldStarBH(M.yld(`fo21: ${i} ${_k}`), _29, _43);
  }

  function _29() {
    var loop15;
    loop15 = M.iterator(a);
    return M.jumpH(_30, _63, loop15);
  }

  function _30(loop15) {
    var i, a;

    if (!(loop15 = loop15.step()).done) {
      i = loop15.value;

      a = (i => {
        var m;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          _k++;
          return M.yldStarBH(M.yld(`fo22: ${i} ${_k} ${m}`), _2, _7);
        }

        function _2() {
          var loop3;
          loop3 = M.iterator(b);
          return M.jumpH(_3, _9, loop3);
        }

        function _3(loop3) {
          var j, a;

          if (!(loop3 = loop3.step()).done) {
            j = loop3.value;

            a = (j => {
              var n;
              return M.scopeH(_1, _3);

              function _1() {
                n = m;
                m++;
                return M.yldStarBH(M.yld(`fo23 ${i} ${j} ${_k} ${m} ${n}`), _2, _3);
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
                          return M.scopeH(_1, _3);

                          function _1() {
                            n++;
                            return M.yldStarBH(M.yld(`fo24: ${i} ${j} ${_k} ${m} ${n}`), _2, _3);
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
            })(j);

            return M.yldStarBH(M.yldStar(a), _4, _9, loop3);
          } else {
            return M.jumpH(_5, _7, _6, _7);
          }
        }

        function _4(a, loop3) {
          switch (a) {
            case 1:
              return M.jumpBH(0, _5, _7, _6, _7);

            case 0:
              return M.jumpBH(1, _5, _7, _6, _7);

            case 2:
              return M.jumpRH(_3, _9, loop3);

            case 3:
              return M.jumpH(_5, _7, _6, _7);

            default:
              return M.jumpRH(_3, _9, loop3);
          }
        }

        function _5(fc, fe, r, err) {
          if (loop3.exit) {
            loop3.exit();
          }

          return M.jumpH(fc, fe, r, err);
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
          return M.jumpH(_5, _7, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStarBH(M.yldStar(a), _31, _63, loop15);
    } else {
      return M.jumpH(_32, _43, _33, _43);
    }
  }

  function _31(a, loop15) {
    switch (a) {
      case 0:
        return M.jumpH(_32, _43, _33, _43);

      case 1:
        return M.jumpRH(_30, _63, loop15);

      default:
        return M.jumpRH(_30, _63, loop15);
    }
  }

  function _32(fc, fe, err) {
    if (loop15.exit) {
      loop15.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _33() {
    k1 = 0;
    return M.yldStarBH(M.yld(`fo25`), _34, _43);
  }

  function _34() {
    var loop16;
    loop16 = M.iterator(a);
    return M.jumpH(_35, _64, loop16);
  }

  function _35(loop16) {
    var i, a;

    if (!(loop16 = loop16.step()).done) {
      i = loop16.value;

      a = (i => {
        var m;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          k1++;
          return M.yldStarBH(M.yld(`fo26: ${i} ${k1} ${m}`), _2, _7);
        }

        function _2() {
          var loop4;
          loop4 = M.iterator(b);
          return M.jumpH(_3, _9, loop4);
        }

        function _3(loop4) {
          var j, a;

          if (!(loop4 = loop4.step()).done) {
            j = loop4.value;

            a = (j => {
              var n;
              return M.scopeH(_1, _3);

              function _1() {
                n = m;
                m++;
                return M.yldStarBH(M.yld(`fo27 ${i} ${j} ${k1} ${m} ${n}`), _2, _3);
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
                          return M.scopeH(_1, _3);

                          function _1() {
                            n++;
                            return M.yldStarBH(M.yld(`fo28: ${i} ${j} ${k1} ${m} ${n}`), _2, _3);
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
            })(j);

            return M.yldStarBH(M.yldStar(a), _4, _9, loop4);
          } else {
            return M.jumpH(_5, _7, _6, _7);
          }
        }

        function _4(a, loop4) {
          switch (a) {
            case 1:
              return M.jumpBH(0, _5, _7, _6, _7);

            case 0:
              return M.jumpBH(1, _5, _7, _6, _7);

            case 2:
              return M.jumpRH(_3, _9, loop4);

            case 3:
              return M.jumpH(_5, _7, _6, _7);

            default:
              return M.jumpRH(_3, _9, loop4);
          }
        }

        function _5(fc, fe, r, err) {
          if (loop4.exit) {
            loop4.exit();
          }

          return M.jumpH(fc, fe, r, err);
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
          return M.jumpH(_5, _7, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStarBH(M.yldStar(a), _36, _64, loop16);
    } else {
      return M.jumpH(_37, _43, _38, _43);
    }
  }

  function _36(a, loop16) {
    switch (a) {
      case 0:
        return M.jumpH(_37, _43, _38, _43);

      case 1:
        return M.jumpRH(_35, _64, loop16);

      default:
        return M.jumpRH(_35, _64, loop16);
    }
  }

  function _37(fc, fe, err) {
    if (loop16.exit) {
      loop16.exit();
    }

    return M.jumpH(fc, fe, err);
  }

  function _38() {
    var loop17;
    k2 = 0;
    loop17 = M.iterator(a);
    return M.jumpH(_39, _65, loop17);
  }

  function _39(loop17) {
    var i, a;

    if (!(loop17 = loop17.step()).done) {
      i = loop17.value;

      a = (i => {
        var m;
        return M.scopeH(_1, _7);

        function _1() {
          m = 0;
          k2++;
          return M.yldStarBH(M.yld(`fo29: ${i} ${k2} ${m}`), _2, _7);
        }

        function _2() {
          var loop6;
          loop6 = M.iterator(b);
          return M.jumpH(_3, _9, loop6);
        }

        function _3(loop6) {
          var j, a;

          if (!(loop6 = loop6.step()).done) {
            j = loop6.value;

            a = (j => {
              var n, _i;

              return M.scopeH(_1, _6);

              function _1() {
                n = m;
                m++;
                return M.yldStarBH(M.yld(`fo30 ${i} ${j} ${k2} ${m} ${n}`), _2, _6);
              }

              function _2() {
                var loop5, r;

                if (k2 === 3) {
                  return M.pure(0);
                } else {
                  if (k2 === 5) {
                    loop5 = M.iterator(funs);
                    return M.jumpH(_3, _8, loop5);
                  } else {
                    if (n === 3) {
                      return M.pure(2);
                    } else {
                      if (n === 5) {
                        return M.pure(3);
                      } else {
                        funs.push(function iter() {
                          return M.scopeH(_1, _3);

                          function _1() {
                            n++;
                            return M.yldStarBH(M.yld(`fo31: ${i} ${j} ${k2} ${m} ${n}`), _2, _3);
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
                var a;

                if (!(loop5 = loop5.step()).done) {
                  _i = loop5.value;
                  a = _i();
                  return M.yldStarBH(M.yldStar(a), _3, _8, loop5);
                } else {
                  return M.jumpH(_4, _6, _5, _6);
                }
              }

              function _4(fc, fe, err) {
                if (loop5.exit) {
                  loop5.exit();
                }

                return M.jumpH(fc, fe, err);
              }

              function _5() {
                return M.pure((br = `r: ${i} ${j} ${k2} ${m} ${n}`, 1));
              }

              function _6(e) {
                return M.raise(e);
              }

              function _7(err) {
                return M.raise(err);
              }

              function _8(a) {
                return M.jumpH(_4, _6, _7, _6, a);
              }
            })(j);

            return M.yldStarBH(M.yldStar(a), _4, _9, loop6);
          } else {
            return M.jumpH(_5, _7, _6, _7);
          }
        }

        function _4(a, loop6) {
          switch (a) {
            case 1:
              return M.jumpBH(0, _5, _7, _6, _7);

            case 0:
              return M.jumpBH(1, _5, _7, _6, _7);

            case 2:
              return M.jumpRH(_3, _9, loop6);

            case 3:
              return M.jumpH(_5, _7, _6, _7);

            default:
              return M.jumpRH(_3, _9, loop6);
          }
        }

        function _5(fc, fe, r, err) {
          if (loop6.exit) {
            loop6.exit();
          }

          return M.jumpH(fc, fe, r, err);
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
          return M.jumpH(_5, _7, _8, _7, void 0, a);
        }
      })(i);

      return M.yldStarBH(M.yldStar(a), _40, _65, loop17);
    } else {
      return M.jumpH(_41, _43, _42, _43);
    }
  }

  function _40(a, loop17) {
    var br;

    switch (a) {
      case 0:
        return M.jumpBH(br, _41, _43, _42, _43);

      case 1:
        return M.jumpRH(_39, _65, loop17);

      default:
        return M.jumpRH(_39, _65, loop17);
    }
  }

  function _41(fc, fe, r, err) {
    if (loop17.exit) {
      loop17.exit();
    }

    return M.jumpH(fc, fe, r, err);
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
    return M.jumpH(_3, _43, _44, _43, a);
  }

  function _56(a) {
    return M.jumpH(_6, _43, _45, _43, a);
  }

  function _57(a) {
    return M.jumpH(_9, _43, _46, _43, a);
  }

  function _58(a) {
    return M.jumpH(_12, _43, _47, _43, a);
  }

  function _59(a) {
    return M.jumpH(_15, _43, _48, _43, a);
  }

  function _60(a) {
    return M.jumpH(_19, _43, _49, _43, a);
  }

  function _61(a) {
    return M.jumpH(_23, _43, _50, _43, a);
  }

  function _62(a) {
    return M.jumpH(_27, _43, _51, _43, a);
  }

  function _63(a) {
    return M.jumpH(_32, _43, _52, _43, a);
  }

  function _64(a) {
    return M.jumpH(_37, _43, _53, _43, a);
  }

  function _65(a) {
    return M.jumpH(_41, _43, _54, _43, void 0, a);
  }
}