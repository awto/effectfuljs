function aa($$) {
  b() + c + a;
  M.option({ evalWrapArg: "preEval" });
  function cc(b) {
    return eval(b(c, a));
  }
  M.option({ evalWrapArg: false, replaceGlobals: { eval: true } });
  function cc2(c) {
    eval(c(b, a));
  }
  function bb($$) {
    b() + c + a;
    function cc(b) {
      if (a) {
        let a = something;
        eval(a);
      } else {
        eval(a);
      }
      return eval(b(c, a));
    }
  }
}
