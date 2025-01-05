"use strict";

import _ctrl from "@effectful/js/macro";
import * as CC from "../main";
import * as assert from "node:assert";
import { wrappedIt } from "./kit/debugger";

describe("cc without debugger", function() { runTests(false) })
describe("cc with debugger", function() { runTests(true) })

const TRACE = false;

function runTests(withDebugger: boolean) {
  const test = withDebugger ? wrappedIt : it;
  const p: CC.Prompt<number> = CC.newPrompt();
  const _state: string[] = [];
  function trec(tag: string, v: number) {
    if (TRACE)
    console.log("trec", tag, v);
    _state.push(tag + ":" + String(v));
  }
  function check(...args: string[]) {
    assert.deepStrictEqual(_state, args);
    _state.length = 0;
  }
  test("simple control flow", function ItBody() {
    trec(
      "a",
      CC.pushPrompt(p, function pushPromptBody() {
        let c1 = 10;
        trec("b", c1);
        trec(
          "c",
          CC.withSubCont(
            p,
            function withSubContBody(cont: CC.SubCont<number, number>) {
              trec("d", c1);
              trec(
                "e",
                CC.pushSubCont(cont, function pushSubContBody1() {
                  return 3;
                }),
              );
              trec("f", c1);
              trec(
                "g",
                CC.pushSubCont(cont, () => 5),
              );
              trec("h", c1);
              return c1 * 10;
            },
          ),
        );
        trec("i", c1);
        return c1++;
      }),
    );
    check(
      "b:10",
      "d:10",
      "c:3",
      "i:10",
      "e:10",
      "f:11",
      "c:5",
      "i:11",
      "g:11",
      "h:12",
      "a:120",
    );
  });
  test("only pushPrompt", function () {
    const r = 4 + CC.pushPrompt(p, () => CC.pushPrompt(p, () => 5));
    assert.strictEqual(r, 9);
  });
  test("abort inner prompt", function () {
    const r: number =
      4 + CC.pushPrompt(p, () => CC.pushPrompt(p, () => 6 + CC.abort(p, 5)));
    assert.strictEqual(r, 9);
  });
  test("abort different prompts", function () {
    const r =
      20 +
      CC.pushPrompt(p, () => {
        const v1 = CC.pushPrompt(p, () => 6 + CC.abort(p, 5)),
          v2 = CC.abort(p, 7);
        return v1 + v2 + 10;
      });
    assert.strictEqual(r, 27);
    try {
      CC.pushPrompt(p, () => {
        const v1 = CC.pushPrompt(p, 6 + CC.abort(p, 5)),
          v2 = CC.abort(p, 7);
        return v1 + v2 + 10;
      });
      CC.abort(p, 9);
      assert.fail("should throw");
    } catch (e: any) {
      assert.strictEqual(e.message, `prompt "p" wasn't found`);
    }
  });
  test("withSubCont", function bodyTest4() {
    let r;
    r =
      20 +
      CC.pushPrompt(p, function pushPromptBody() {
        return (
          10 +
          CC.withSubCont(
            p,
            function withSubContBody(sk: CC.SubCont<number, number>) {
              return CC.pushPrompt(p, function pushPromptBody2() {
                return CC.pushSubCont(sk, function pushSubContBody2() {
                  return 5;
                });
              });
            },
          )
        );
      });
    assert.strictEqual(r, 35);
    const trace: string[] = [];
    r =
      20 +
      CC.pushPrompt(p, function pushPromptBody2() {
        trace.push("pushPromptBody2");
        const k = CC.withSubCont(
          p,
          function withSubContBody1(sk: CC.SubCont<number, number>) {
            trace.push("withSubContBody1");
            const k = CC.pushSubCont(sk, function pushSubContBody3() {
              trace.push("pushSubContBody3");
              const k = CC.pushPrompt(p, function pushPromptBody3() {
                trace.push("pushPromptBody3");
                const k = CC.pushSubCont(sk, function pushSubContBody4() {
                  trace.push("pushSubContBody4");
                  const k = CC.abort(p, 5);
                  trace.push(`pushSubContBody4 end: ${k}`);
                  return k;
                });
                trace.push(`pushPromptBody3 end: ${k}`);
                return k;
              });
              trace.push(`pushSubContBody3 end: ${k}`);
              return k;
            });
            trace.push(`withSubContBody1 end: ${k}`);
            return k;
          },
        );
        trace.push(`pushPromptBody2 end: ${k}`);
        return k + 10;
      });
    assert.strictEqual(r, 35);
    assert.deepStrictEqual(trace, [
      "pushPromptBody2",
      "withSubContBody1",
      "pushSubContBody3",
      "pushPromptBody3",
      "pushSubContBody4",
      "pushSubContBody3 end: 5",
      "pushPromptBody2 end: 5",
      "withSubContBody1 end: 15",
    ]);
  });
  test("shift push twice", function () {
    const r =
      10 +
      CC.pushPrompt(
        p,
        () =>
          2 +
          CC.shift(
            p,
            (sk: (t: () => number) => number) => 100 + sk(() => sk(() => 3)),
          ),
      );
    assert.strictEqual(r, 117);
  });
  test("shift with abort", function () {
    const p2L = CC.newPrompt<number>();
    const p2R = CC.newPrompt<number>();
    const r =
      10 +
      CC.pushPrompt(
        p2L,
        () =>
          2 +
          CC.shift(
            p2L,
            (sk: (v: () => number) => number) =>
              100 +
              sk(() =>
                CC.pushPrompt(p2R, () => sk(() => sk(() => CC.abort(p2R, 3)))),
              ),
          ),
      );
    assert.strictEqual(r, 115);
  });
  test("pushSubCont twice", function () {
    const p1 = CC.newPrompt<number>();
    const p2 = CC.newPrompt<number>();
    function pushtwiceTest6(sk: CC.SubCont<number, number>) {
      return CC.pushSubCont(sk, () => CC.pushSubCont(sk, () => 3));
    }
    const r =
      10 +
      CC.pushPrompt(p1, () => {
        const t = CC.pushPrompt(p2, () => {
          return CC.withSubCont(p1, pushtwiceTest6);
        });
        return t + 1;
      });
    assert.strictEqual(r, 15);
  });
  test("pushSubCont twice twice", function () {
    const p1 = CC.newPrompt<number>();
    const p2 = CC.newPrompt<number>();
    const p3 = CC.newPrompt<number>();
    const trace: string[] = [];
    function pushtwiceTest7(sk: CC.SubCont<number, number>) {
      trace.push(">>>>pushtwiceTest7");
      const k = CC.pushSubCont(sk, function pushSubContBody1() {
        trace.push(">>>>>pushSubContBody1");
        const k = CC.pushSubCont(sk, function pushSubContBody2() {
          trace.push(">>>>>>pushSubContBody2");
          const k = CC.withSubCont(
            p2,
            function withSubContBody1(sk2: CC.SubCont<number, number>) {
              trace.push(">>>>>>>withSubContBody1");
              const k = CC.pushSubCont(sk2, function pushSubContBody3() {
                trace.push(">>>>>>>>pushSubContBody3");
                const k = CC.pushSubCont(sk2, function pushSubContBody4() {
                  trace.push(".........pushSubContBody4");
                  return 3;
                });
                trace.push(`<<<<<<<<pushSubContBody3 end: ${k}`);
                return k;
              });
              trace.push(`<<<<<<<withSubContBody1 end: ${k}`);
              return k;
            },
          );
          trace.push(`<<<<<<pushSubContBody2 end: ${k}`);
          return k;
        });
        trace.push(`<<<<<pushSubContBody1 end: ${k}`);
        return k;
      });
      trace.push(`<<<<pushtwiceTest7 end: ${k}`);
      return k;
    }
    const r =
      100 +
      CC.pushPrompt(p1, function pushPromptBody1() {
        trace.push(">pushPromptBody1");
        const k =
          1 +
          CC.pushPrompt(p2, function pushPromptBody2() {
            trace.push(">>pushPromptBody2");
            const k =
              10 +
              CC.pushPrompt(p3, function pushPromptBody3() {
                trace.push(">>>pushPromptBody3");
                const k = CC.withSubCont(p1, pushtwiceTest7);
                trace.push(`<<<pushPromptBody3 end: ${k}`);
                return k;
              });
            trace.push(`<<pushPromptBody2 end: ${k}`);
            return k;
          });
        trace.push(`<pushPromptBody1 end: ${k}`);
        return k;
      });
    assert.strictEqual(r, 135);
    assert.deepStrictEqual(trace, [
      ">pushPromptBody1",
      ">>pushPromptBody2",
      ">>>pushPromptBody3",
      ">>>>pushtwiceTest7",
      ">>>>>pushSubContBody1",
      ">>>>>>pushSubContBody2",
      ">>>>>>>withSubContBody1",
      ">>>>>>>>pushSubContBody3",
      ".........pushSubContBody4",
      "<<<<<<pushSubContBody2 end: 3",
      "<<<pushPromptBody3 end: 3",
      "<<pushPromptBody2 end: 13",
      "<<<<<<<<pushSubContBody3 end: 13",
      "<<<<<<pushSubContBody2 end: 13",
      "<<<pushPromptBody3 end: 13",
      "<<pushPromptBody2 end: 23",
      "<<<<<<<withSubContBody1 end: 23",
      "<pushPromptBody1 end: 24",
      "<<<<<pushSubContBody1 end: 24",
      "<<<pushPromptBody3 end: 24",
      "<<pushPromptBody2 end: 34",
      "<pushPromptBody1 end: 35",
      "<<<<pushtwiceTest7 end: 35",
    ]);
  });
  test("shift twice twice", function testShiftTwice() {
    const p1 = CC.newPrompt<number>("p1");
    const p2 = CC.newPrompt<number>("p2");
    const p3 = CC.newPrompt<number>("p3");
    const trace: string[] = [];
    function shifttwice(skf: (v: () => number) => number) {
      trace.push(`>>>shifttwice`);
      const v = skf(function shiftPushBodyF11() {
        trace.push(`>>>>shiftPushBodyF11`);
        const v = skf(function shiftPushBodyF12() {
          trace.push(`>>>>>shiftPushBodyF12`);
          const v: number = CC.shift(p2, function shitBody(skf2) {
            trace.push(`>>>>>>shitBody`);
            const v = skf2(function shiftPushBodyF21() {
              trace.push(`>>>>>>>shiftPushBodyF21`);
              const v = skf2(function shiftPushBodyF21() {
                trace.push(`........shiftPushBodyF21`);
                return 3;
              });
              trace.push(`<<<<<<<shiftPushBodyF21`);
              return v;
            });
            trace.push(`<<<<<<shiftBody end: ${v}`);
            return v;
          });
          trace.push(`<<<<<shiftPushBodyF12 end: ${v}`);
          return v;
        });
        trace.push(`<<<<shiftPushBodyF11 end: ${v}`);
        return v;
      });
      trace.push(`<<<shifttwice end: ${v}`);
      return v;
    }
    const r =
      100 +
      CC.pushPrompt(p1, function pushPromptBody1() {
        trace.push(`>pushPromptBody1`);
        const v =
          1 +
          CC.pushPrompt(p2, function pushPromptBody2() {
            trace.push(`>>pushPromptBody2`);
            const v =
              10 +
              CC.pushPrompt(p3, function pushPromptBody3() {
                trace.push(`>>>pushPromptBody3`);
                const v = CC.shift(p1, shifttwice);
                trace.push(`>>>pushPromptBody3 end: ${v}`);
                return v;
              });
            trace.push(`<<pushPromptBody2 end: ${v}`);
            return v;
          });
        trace.push(`<pushPromptBody1 end: ${v}`);
        return v;
      });
    assert.strictEqual(r, 135);
    assert.deepStrictEqual(trace, [
      ">pushPromptBody1",
      ">>pushPromptBody2",
      ">>>pushPromptBody3",
      ">>>shifttwice",
      ">>>>shiftPushBodyF11",
      ">>>>>shiftPushBodyF12",
      ">>>>>>shitBody",
      ">>>>>>>shiftPushBodyF21",
      "........shiftPushBodyF21",
      "<<<<<shiftPushBodyF12 end: 3",
      ">>>pushPromptBody3 end: 3",
      "<<pushPromptBody2 end: 13",
      "<<<<<<<shiftPushBodyF21",
      "<<<<<shiftPushBodyF12 end: 13",
      ">>>pushPromptBody3 end: 13",
      "<<pushPromptBody2 end: 23",
      "<<<<<<shiftBody end: 23",
      "<pushPromptBody1 end: 24",
      "<<<<shiftPushBodyF11 end: 24",
      ">>>pushPromptBody3 end: 24",
      "<<pushPromptBody2 end: 34",
      "<pushPromptBody1 end: 35",
      "<<<shifttwice end: 35",
    ]);
  });
  test("shift0 twice", function () {
    const p1 = CC.newPrompt<number>("p1");
    const p2 = CC.newPrompt<number>("p2");
    const p3 = CC.newPrompt<number>("p3");
    const trace: string[] = [];
    function shift0twice(f: (v: () => number) => number) {
      trace.push(">>>>shift0twice");
      const v = f(function pushBody11() {
        trace.push(">>>>>pushBody11");
        const v = f(function pushBody12() {
          trace.push(">>>>>>pushBody12");
          const v: number = CC.shift0(p2, function shift0Body2(f2) {
            trace.push(">>>>>>>shift0Body2");
            const v = f2(function pushBody21() {
              trace.push(">>>>>>>>pushBody21");
              const v = f2(function pushBody22() {
                trace.push(".........pushBody22");
                return 3;
              });
              trace.push(`<<<<<<<<pushBody21 end: ${v}`);
              return v;
            });
            trace.push(`<<<<<<<shift0Body2 end: ${v}`);
            return v;
          });
          trace.push(`<<<<<<pushBody2 end: ${v}`);
          return v;
        });
        trace.push(`<<<<<pushBody1 end: ${v}`);
        return v;
      });
      trace.push(`<<<<<shift0twice end: ${v}`);
      return v;
    }
    const r =
      100 +
      CC.pushPrompt(p1, function pushPrompt1() {
        trace.push(">pushPrompt1");
        const v =
          1 +
          CC.pushPrompt(p2, function pushPrompt2() {
            trace.push(">>pushPrompt2");
            const v =
              10 +
              CC.pushPrompt(p3, function pushPrompt3() {
                trace.push(">>>pushPrompt3");
                const v = CC.shift0(p1, shift0twice);
                trace.push(`>>>pushPrompt3 end: ${v}`);
                return v;
              });
            trace.push(`<<pushPrompt2 end: ${v}`);
            return v;
          });
        trace.push(`<pushPrompt1 end: ${v}`);
        return v;
      });
    assert.strictEqual(r, 135);
    assert.deepStrictEqual(trace, [
      ">pushPrompt1",
      ">>pushPrompt2",
      ">>>pushPrompt3",
      ">>>>shift0twice",
      ">>>>>pushBody11",
      ">>>>>>pushBody12",
      ">>>>>>>shift0Body2",
      ">>>>>>>>pushBody21",
      ".........pushBody22",
      "<<<<<<pushBody2 end: 3",
      ">>>pushPrompt3 end: 3",
      "<<pushPrompt2 end: 13",
      "<<<<<<<<pushBody21 end: 13",
      "<<<<<<pushBody2 end: 13",
      ">>>pushPrompt3 end: 13",
      "<<pushPrompt2 end: 23",
      "<<<<<<<shift0Body2 end: 23",
      "<pushPrompt1 end: 24",
      "<<<<<pushBody1 end: 24",
      ">>>pushPrompt3 end: 24",
      "<<pushPrompt2 end: 34",
      "<pushPrompt1 end: 35",
      "<<<<<shift0twice end: 35",
    ]);
  });
  test("shift", function () {
    const p = CC.newPrompt<string>();
    const r = CC.pushPrompt(p, function () {
      return "-" + CC.shift(p, () => CC.shift(p, (f) => "a" + f(() => ".")));
    });
    assert.deepStrictEqual(r, "a.");
  });
  test("shift0", function () {
    const p = CC.newPrompt<string>();
    let r;
    r = CC.pushPrompt(
      p,
      () =>
        "a" +
        CC.pushPrompt(p, () => {
          return CC.shift0(p, () => {
            return CC.shift0(p, () => ".");
          });
        }),
    );
    assert.deepStrictEqual(r, ".");
    r = CC.pushPrompt(
      p,
      () =>
        "a" +
        CC.pushPrompt(p, () => {
          return CC.shift0(p, (f) => {
            return f(() =>
              CC.shift0(p, () => {
                return ".";
              }),
            );
          });
        }),
    );
    assert.deepStrictEqual(r, "a.");
  });
  test("control", function () {
    const p = CC.newPrompt<string>();
    const r = CC.pushPrompt(p, function () {
      return (
        "a" +
        CC.control(p, () => "b" + CC.control(p, (f) => "c" + f(() => ".")))
      );
    });
    assert.deepStrictEqual(r, "cb.");
  });
  test("control control flow", function () {
    const p = CC.newPrompt<string>();
    const trace: string[] = [];
    const ctrlr = CC.pushPrompt(p, function pushPromptBody() {
      trace.push(">pushPromptBody");
      const v =
        "a" +
        CC.control(p, function body1(g) {
          trace.push(">>body1");
          const v =
            "b" +
            g(function pushBody1() {
              trace.push(">>>pushBody1");
              const v =
                "c" +
                CC.control(p, function body2(f) {
                  trace.push(">>>>body2");
                  const v =
                    "a" +
                    f(function pushBody2() {
                      trace.push("......pushBody2");
                      return ".";
                    });
                  trace.push(`<<<<body2 end: ${v}`);
                  return v;
                });
              trace.push(`<<<pushBody1 end: ${v}`);
              return v;
            });
          trace.push(`<<<<body1 end: ${v}`);
          return v;
        });
      trace.push(`<pushPromptBody end: ${v}`);
      return v;
    });
    assert.deepStrictEqual(ctrlr, "abac.");
    assert.deepStrictEqual(trace, [
      ">pushPromptBody",
      ">>body1",
      ">>>pushBody1",
      ">>>>body2",
      "......pushBody2",
      "<<<pushBody1 end: c.",
      "<pushPromptBody end: ac.",
      "<<<<body1 end: bac.",
      "<<<<body2 end: abac.",
    ]);
  });
  test("shift control flow", function () {
    const p = CC.newPrompt<string>();
    const trace: string[] = [];
    const ctrlr = CC.pushPrompt(p, function pushPromptBody() {
      trace.push(">pushPromptBody");
      const v =
        "a" +
        CC.shift(p, function body1(g) {
          trace.push(">>body1");
          const v =
            "b" +
            g(function pushBody1() {
              trace.push(">>>pushBody1");
              const v =
                "c" +
                CC.shift(p, function body2(f) {
                  trace.push(">>>>body2");
                  const v =
                    "a" +
                    f(function pushBody2() {
                      trace.push("......pushBody2");
                      return ".";
                    });
                  trace.push(`<<<<body2 end: ${v}`);
                  return v;
                });
              trace.push(`<<<pushBody1 end: ${v}`);
              return v;
            });
          trace.push(`<<<<body1 end: ${v}`);
          return v;
        });
      trace.push(`<pushPromptBody end: ${v}`);
      return v;
    });
    assert.deepStrictEqual(trace, [
      ">pushPromptBody",
      ">>body1",
      ">>>pushBody1",
      ">>>>body2",
      "......pushBody2",
      "<<<pushBody1 end: c.",
      "<pushPromptBody end: ac.",
      "<<<<body2 end: aac.",
      "<<<<body1 end: baac.",
    ]);
    assert.deepStrictEqual(ctrlr, "baac.");
  });
  test("control0 no prompt", function () {
    const p = CC.newPrompt<string>();
    try {
      CC.pushPrompt(
        p,
        () =>
          "a" +
          CC.control0(
            p,
            (g) =>
              "b" + g(() => "c" + CC.control0(p, (f) => "a" + f(() => "."))),
          ),
      );
      assert.fail("should throw");
    } catch (e: any) {
      assert.strictEqual(e.message, 'prompt "p" wasn\'t found');
    }
  });
  test("control0", function () {
    const trace: string[] = [];
    const r = CC.pushPrompt(p, function pushPromptBody1() {
      trace.push("pushPromptBody1");
      CC.withSubCont(p, function withSubContBody(sk) {
        trace.push("withSubContBody");
        const v = CC.pushPrompt(p, function pushPromptBody2() {
          trace.push("pushPromptBody2");
          const v = CC.pushSubCont(sk, function pushSubContBody() {
            trace.push("pushSubContBody");
            return 1;
          });
          trace.push(`pushPromptBody2 end: ${v}`);
          return v;
        });
        trace.push(`withSubContBody end: ${v}`);
        return v;
      });
      return CC.control0(p, function controlBody(f) {
        trace.push("controlBody");
        const v = f(function controlPushBody() {
          trace.push("controlPushBody");
          return 2;
        });
        trace.push(`controlBody end: ${v}`);
        return v;
      });
    });
    assert.deepStrictEqual(r, 2);
    assert.deepStrictEqual(trace, [
      "pushPromptBody1",
      "withSubContBody",
      "pushPromptBody2",
      "pushSubContBody",
      "controlBody",
      "controlPushBody",
      "pushPromptBody2 end: 2",
      "controlBody end: 2",
      "withSubContBody end: 2",
    ]);
  });
}
