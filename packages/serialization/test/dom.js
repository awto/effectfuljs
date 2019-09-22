const Lib = require("../src/main");
const Dom = require("../src/dom");
const assert = require("assert");
Dom.track();

describe("DOM serialization", function() {
  it("should preserve Event's options", function() {
    const ev = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    const json = Lib.write(ev);
    const restored = Lib.read(json);
    assert.strictEqual(restored.constructor, MouseEvent, "correct constructor");
    assert.ok(restored.bubbles, "correct `bubbles` property");
    assert.ok(restored.cancelable, "correct `cancelable` property");
    assert.strictEqual(restored.view, window, "correct `view` property");
  });
  it("should preserve DOM elements", function() {
    const el = document.createElement("div");
    el.innerHTML = `<div id="root"><p>hello, world!</p></div>`;
    el.customProp = "CUSTOM DATA";
    el.customData = el;
    const json = Lib.write(el);
    const exp = {
      r: 0,
      x: [
        {
          tag: "DIV",
          c: [
            {
              tag: "DIV",
              c: [
                {
                  tag: "P",
                  c: [
                    {
                      text: "hello, world!",
                      $: "dom#Text"
                    }
                  ],
                  a: {},
                  $: "dom#Element"
                }
              ],
              a: {
                id: "root"
              },
              $: "dom#Element"
            }
          ],
          a: {},
          f: [
            ["customProp", "CUSTOM DATA"],
            [
              "customData",
              {
                r: 0
              }
            ]
          ],
          $: "dom#Element"
        }
      ]
    };
    assert.deepStrictEqual(json, exp, "correct JSON");
    const restored = Lib.read(exp);
    assert.notStrictEqual(restored, el, "refer another value");
    assert.strictEqual(
      restored.customData,
      restored,
      "has custom simple property"
    );
    assert.strictEqual(
      restored.customProp,
      el.customProp,
      "has recursive reference"
    );
    assert.strictEqual(restored.outerHTML, el.outerHTML, "same text");
  });
  it("should preserve event listeners", function() {
    const el = document.createElement("div");
    const called1 = [];
    const called2 = [];
    const called3 = [];
    function eventListener1(ev) {
      called1.push(ev);
    }
    function eventListener2(ev) {
      called2.push(ev);
    }
    function eventListener3(ev) {
      called3.push(ev);
    }
    Lib.regOpaqueObject(eventListener1);
    Lib.regOpaqueObject(eventListener2);
    Lib.regOpaqueObject(eventListener3);
    el.addEventListener("test-event", eventListener1);
    el.addEventListener("test-event", eventListener1);
    el.addEventListener("test-event", eventListener1, { passive: true });
    el.addEventListener("test-event", eventListener1, { once: true });
    el.addEventListener("test-event", eventListener1, { once: true });
    el.addEventListener("test-event", eventListener1, {
      once: true,
      capture: true
    });
    el.addEventListener("test-event", eventListener1, false);
    el.addEventListener("test-event", eventListener1, { capture: false });
    el.addEventListener("test-event", eventListener1, true);
    el.addEventListener("test-event", eventListener1, { capture: true });
    el.addEventListener("test-event", eventListener2);
    el.addEventListener("test-event", eventListener3, { once: true });
    let restored = Lib.read(Lib.write(el));
    assert.notStrictEqual(restored, el);
    const ev1 = new Event("test-event");
    restored.dispatchEvent(ev1);
    // TODO: works differently for jsdom and browser
    assert.ok(
      /*called1.length === 2 &&*/ called1.every(i => i === ev1),
      called1
    );
    assert.ok(called2.length === 1 && called2[0] === ev1);
    assert.ok(called3.length === 1 && called3[0] === ev1);
    called1.length = called2.length = called3.length = 0;
    const ev2 = new Event("test-event");
    restored.dispatchEvent(ev2);
    assert.ok(called1.length === 1 && called1[0] === ev2);
    assert.ok(called2.length === 1 && called2[0] === ev2);
    assert.ok(called3.length === 0);
    el.removeEventListener("test-event", eventListener2);
    el.removeEventListener("test-event", eventListener1, true);
    called1.length = called2.length = 0;
    restored = Lib.read(Lib.write(el));
    const ev3 = new Event("test-event");
    restored.dispatchEvent(ev3);
    assert.ok(called1.length === 1 && called1[0] === ev3);
    assert.ok(called2.length === 0);
    // ev3 didn't fire on el
    assert.ok(called3.length === 1 && called3[0] === ev3);
  });
});
