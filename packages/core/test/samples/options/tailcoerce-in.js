// *- SKIP
M.option({
  defunct: true,
  contextState: true,
  storeCont: true,
  inlinePureJumps: "tail"
});

function a1(a, b, c, d) {
  bb();
  cc();
}

M.option({ inlineTailCoerce: "check" });

function a2(a, b, c, d) {
  bb();
  cc();
}

M.option({ inlineTailCoerce: true });

function a3(a, b, c, d) {
  bb();
  cc();
}

M.option({ inlineTailCoerce: { singelton: "token" } });

function a4(a, b, c, d) {
  bb();
  cc();
}

M.option({ inlineTailCoerce: { singelton: null, symbol: "sym" } });

function a5(a, b, c, d) {
  bb();
  cc();
}
