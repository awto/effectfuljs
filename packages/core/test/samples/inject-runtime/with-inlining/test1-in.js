M.option({
  keepLastPure: true,
  keepLastRaise: true,
  coerce: false,
  static: true,
  injectOps: {
    chain: {
      init:
        "function $I(somevar1) { return $I.chainOperation($I,$I,somevar1) }",
      deps: ["somevar1", "somevar2"]
    },
    somevar1: {},
    somevar2: {
      init: "var $I = $I.somevar2($I,$I)",
      deps: ["pure", "somevar1"]
    },
    pure: {}
  },
  inlineOps: {
    raise: {
      inline: "*var somevar1 = $E; return something($1,$2,somevar1)",
      deps: ["somevar1"]
    }
  }
});

function a() {
  eff1();
  chain();
  var something = "vo";
  eff2(something);
}
