import "./development.macro.js";
import React from "react";
import ReactDOM from "react-dom";
import * as M from "./main";
import renderer from "react-test-renderer";

jest.useFakeTimers();

describe("`useState`", function() {
  function useCounter(initial = 0) {
    const [value, setter] = M.useState(initial);
    return [value, () => setter(value + 1)];
  }

  test("simple", function() {
    const effectful = useCounter(0);
    expect(typeof effectful).toBe("function");
    expect(effectful[M.tagSymbol]).toBe(true);
    const mockCont = jest.fn();
    effectful(mockCont);
    expect(mockCont).toBeCalledTimes(1);
    const [[first, incr]] = mockCont.mock.calls[0];
    expect(first).toBe(0);
    incr();
    expect(mockCont).toBeCalledTimes(2);
    expect(mockCont).toHaveBeenLastCalledWith([1, expect.any(Function)]);
    incr();
    expect(mockCont).toBeCalledTimes(3);
    expect(mockCont).toHaveBeenLastCalledWith([2, expect.any(Function)]);
    mockCont.mock.calls[2][0][1]();
    expect(mockCont).toBeCalledTimes(4);
    expect(mockCont).toHaveBeenLastCalledWith([3, expect.any(Function)]);
    const mockCont2 = jest.fn();
    effectful(mockCont2);
    expect(mockCont).toBeCalledTimes(4);
    expect(mockCont2).toBeCalledTimes(1);
    expect(mockCont2).toHaveBeenCalledWith([0, expect.any(Function)]);
    expect(mockCont2.mock.calls[0][0][0]).toBe(0);
    mockCont2.mock.calls[0][0][1]();
    expect(mockCont).toBeCalledTimes(4);
    expect(mockCont2).toBeCalledTimes(2);
    expect(mockCont2).toHaveBeenLastCalledWith([1, expect.any(Function)]);
  });

  test("sequential composition", function() {
    let incr1, incr2;
    function useTwoCounters() {
      let value1, value2;
      [value1, incr1] = useCounter(0);
      [value2, incr2] = useCounter(0);
      return [value1, value2];
    }
    const effectful = useTwoCounters();
    expect(typeof effectful).toBe("function");
    expect(effectful[M.tagSymbol]).toBe(true);
    const mockCont = jest.fn();
    effectful(mockCont);
    expect(mockCont).toBeCalledTimes(1);
    expect(mockCont).toBeCalledWith([0, 0]);
    incr1();
    expect(mockCont).toBeCalledTimes(2);
    expect(mockCont).toHaveBeenLastCalledWith([1, 0]);
    incr2();
    expect(mockCont).toBeCalledTimes(3);
    expect(mockCont).toHaveBeenLastCalledWith([1, 1]);
    incr2();
    expect(mockCont).toBeCalledTimes(4);
    expect(mockCont).toHaveBeenLastCalledWith([1, 2]);
    incr1();
    expect(mockCont).toBeCalledTimes(5);
    expect(mockCont).toHaveBeenLastCalledWith([2, 0]);
  });

  test("parallel composition", function() {
    let incr1, incr2;
    function useTwoParCounters() {
      M.profile("par");
      let value1, value2;
      [value1, incr1] = useCounter(0);
      [value2, incr2] = useCounter(0);
      return [value1, value2];
    }
    const effectful = useTwoParCounters();
    expect(typeof effectful).toBe("function");
    expect(effectful[M.tagSymbol]).toBe(true);
    const mockCont = jest.fn();
    effectful(mockCont);
    expect(mockCont).toBeCalledTimes(1);
    expect(mockCont).toBeCalledWith([0, 0]);
    incr1();
    expect(mockCont).toBeCalledTimes(2);
    expect(mockCont).toHaveBeenLastCalledWith([1, 0]);
    incr2();
    expect(mockCont).toBeCalledTimes(3);
    expect(mockCont).toHaveBeenLastCalledWith([1, 1]);
    incr2();
    expect(mockCont).toBeCalledTimes(4);
    expect(mockCont).toHaveBeenLastCalledWith([1, 2]);
    incr1();
    expect(mockCont).toBeCalledTimes(5);
    expect(mockCont).toHaveBeenLastCalledWith([2, 2]);
  });

  test("parallel composition with a dependency", function() {
    let incr1, incr2;
    function useTwoCounters() {
      "par";
      let value1, value2;
      [value1, incr1] = useCounter(0);
      [value2, incr2] = useCounter(value1);
      return [value1, value2];
    }
    const effectful = useTwoCounters();
    expect(typeof effectful).toBe("function");
    expect(effectful[M.tagSymbol]).toBe(true);
    const mockCont = jest.fn();
    effectful(mockCont);
    expect(mockCont).toBeCalledTimes(1);
    expect(mockCont).toBeCalledWith([0, 0]);
    incr1();
    expect(mockCont).toBeCalledTimes(2);
    expect(mockCont).toHaveBeenLastCalledWith([1, 1]);
    incr2();
    expect(mockCont).toBeCalledTimes(3);
    expect(mockCont).toHaveBeenLastCalledWith([1, 2]);
    incr2();
    expect(mockCont).toBeCalledTimes(4);
    expect(mockCont).toHaveBeenLastCalledWith([1, 3]);
    incr1();
    expect(mockCont).toBeCalledTimes(5);
    expect(mockCont).toHaveBeenLastCalledWith([2, 2]);
  });
});

function delay(value, time = 0) {
  return new Promise(c => setTimeout(() => c(value), time));
}

describe("`usePromise`", function() {
  test("simple", async function() {
    expect.assertions(7);
    let step;
    function useAsync1() {
      return M.usePromise(new Promise(c => (step = c)));
    }
    const effectful = useAsync1();
    expect(step).toBeUndefined();
    expect(typeof effectful).toBe("function");
    expect(effectful[M.tagSymbol]).toBe(true);
    const mockCont = jest.fn();
    effectful(mockCont);
    expect(typeof step).toBe("function");
    step("hi");
    expect(mockCont).toBeCalledTimes(0);
    while (mockCont.mock.calls.length === 0) await null;
    expect(mockCont).toBeCalledTimes(1);
    expect(mockCont).toHaveBeenLastCalledWith("hi");
  });

  test("sequential composition", async function() {
    expect.assertions(9);
    let step1, step2;
    let res = [];
    function useAsync1() {
      res.push(M.usePromise(new Promise(c => (step1 = c))));
      res.push(M.usePromise(new Promise(c => (step2 = c))));
      return res.join(" ");
    }
    const effectful = useAsync1();
    expect(step1).toBeUndefined();
    expect(step2).toBeUndefined();
    expect(typeof effectful).toBe("function");
    expect(effectful[M.tagSymbol]).toBe(true);
    const mockCont = jest.fn();
    effectful(mockCont);
    expect(typeof step1).toBe("function");
    expect(step2).toBeUndefined();
    step1("hi");
    while (!step2) await null;
    expect(typeof step2).toBe("function");
    step2("there");
    while (mockCont.mock.calls.length === 0) await null;
    expect(mockCont).toBeCalledTimes(1);
    expect(mockCont).toHaveBeenLastCalledWith("hi there");
  });

  test("parallel composition", async function() {
    expect.assertions(8);
    let step1, step2;
    function useAsync1() {
      "par";
      const a = M.usePromise(new Promise(c => (step1 = c)));
      const b = M.usePromise(new Promise(c => (step2 = c)));
      return `${a} ${b}`;
    }
    const effectful = useAsync1();
    expect(step1).toBeUndefined();
    expect(step2).toBeUndefined();
    expect(typeof effectful).toBe("function");
    expect(effectful[M.tagSymbol]).toBe(true);
    const mockCont = jest.fn();
    effectful(mockCont);
    expect(typeof step1).toBe("function");
    expect(typeof step2).toBe("function");
    step1("hi");
    step2("there");
    while (mockCont.mock.calls.length === 0) await null;
    expect(mockCont).toBeCalledTimes(1);
    expect(mockCont).toHaveBeenCalledWith("hi there");
  });
});

describe("<Suspense/>", function() {
  async function exec(test) {
    for (let i = 0; i < 6; i++) {
      jest.advanceTimersByTime(600);
      await null;
      expect(test.toJSON()).toMatchSnapshot();
    }
  }
  test("with pure child", function() {
    function Component1() {
      "component";
      return (
        <h1>
          <M.Suspense>
            <i>hi</i>
          </M.Suspense>
        </h1>
      );
    }
    expect(renderer.create(<Component1 />).toJSON()).toMatchSnapshot();
  });
  describe("with only a single async child", function() {
    test("the child is available after `maxDuration`", async function() {
      function Component2() {
        "component";
        return (
          <h1>
            <M.Suspense maxDuration={1000} fallback={<div>Loading...</div>}>
              {M.usePromise(delay(<i>hi</i>, 2000))}
            </M.Suspense>
          </h1>
        );
      }
      await exec(renderer.create(<Component2 />));
    });
    test("the child is available before `maxDuration`", async function() {
      function Component3() {
        "component";
        return (
          <h1>
            <M.Suspense maxDuration={2000} fallback={<div>Loading...</div>}>
              {M.usePromise(delay(<i>hi</i>, 1000))}
            </M.Suspense>
          </h1>
        );
      }
      await exec(renderer.create(<Component3 />));
    });
  });
  describe("with a nested async child", function() {
    test("the child is available after `maxDuration`", async function() {
      function Component4() {
        "component";
        return (
          <h1>
            <M.Suspense maxDuration={1000} fallback={<div>Loading...</div>}>
              <p>{M.usePromise(delay(<i>hi</i>, 2000))}</p>
            </M.Suspense>
          </h1>
        );
      }
      await exec(renderer.create(<Component4 />));
    });
    test("the child is available before `maxDuration`", async function() {
      function Component5() {
        "component";
        return (
          <h1>
            <M.Suspense maxDuration={2000} fallback={<div>Loading...</div>}>
              <p>{M.usePromise(delay(<i>hi</i>, 1000))}</p>
            </M.Suspense>
          </h1>
        );
      }
      await exec(renderer.create(<Component5 />));
    });
  });
  test("several async children", async function() {
    function Component6() {
      "component";
      return (
        <h1>
          <M.Suspense maxDuration={1500} fallback={<div>Loading...</div>}>
            <p>{M.usePromise(delay(<i>hi</i>, 1000))}</p>
            <p>{M.usePromise(delay(<i>there</i>, 2000))}</p>
          </M.Suspense>
        </h1>
      );
    }
    await exec(renderer.create(<Component6 />));
  });
  test("several <Suspense> tags", async function() {
    function Component6() {
      "component";
      return (
        <h1>
          <M.Suspense maxDuration={1000} fallback={<div>Loading 1...</div>}>
            <M.Suspense maxDuration={700} fallback={<div>Loading 2...</div>}>
              <p>{M.usePromise(delay(<i>hi</i>, 1900))}</p>
            </M.Suspense>
            <M.Suspense maxDuration={2500} fallback={<div>Loading 3...</div>}>
              <p>{M.usePromise(delay(<i>there</i>, 3100))}</p>
            </M.Suspense>
          </M.Suspense>
        </h1>
      );
    }
    await exec(renderer.create(<Component6 />));
  });
});

test("errors handling", async function() {
  function ErrorBoundary({ effChildren }) {
    "component";
    try {
      return M.use(effChildren);
    } catch (error) {
      return <b>Error: {error.message}</b>;
    }
  }

  function ThrowsSometimes({ interval, error, normal, iterations = 4 }) {
    "component";
    let widget, rs, rj;
    (async function thread() {
      for (let i = 0; i < iterations; i++) {
        await new Promise(c => setTimeout(c, interval));
        rj(new Error(error));
        await new Promise(c => setTimeout(c, interval));
        rs(normal);
      }
    })();
    [widget, rs, rj] = M.useState(normal);
    return widget;
  }

  function TestComponent() {
    "component";
    return (
      <div>
        <h1>May Throw</h1>
        <ErrorBoundary>
          <p>
            P1:{" "}
            <ThrowsSometimes
              interval={200}
              error="Error1"
              normal={<b>Normal1</b>}
            />
          </p>
          <p>
            P2:{" "}
            <ThrowsSometimes
              interval={100}
              error="Error2"
              normal={<i>Normal2</i>}
              iterations={8}
            />
          </p>
        </ErrorBoundary>
      </div>
    );
  }

  const test = renderer.create(<TestComponent />);
  for (let i = 0; i < 20; i++) {
    jest.advanceTimersByTime(50);
    await null;
    expect(test.toJSON()).toMatchSnapshot();
  }
});
