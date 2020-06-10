const obj1 = {
  a: 1,
  A: 2,
  fn(arg) {
    return `fn:${arg}`;
  },
  set z(v) {
    this.x = v;
  },
  get z() {
    return this.x;
  }
};

let b = 1;

Object.defineProperty(obj1, "b", {
  get() {
    return this.c + 100;
  },
  set(v) {
    this.c = v;
  }
});

function verbose(obj) {
  return new Proxy(obj, {
    set(target, prop, value, receiver) {
      return Reflect.set(target, prop, value, receiver);
    },
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    construct(target, argumentsList, newTarget) {
      return Reflect.construct(target, argumentsList, newTarget);
    },
    apply(target, thisArg, argumentsList) {
      return Reflect.apply(target, thisArg, argumentsList);
    },
    deleteProperty(target, prop) {
      return Reflect.deleteProperty(target, prop);
    },
    defineProperty(obj, prop, descriptor) {
      return Reflect.defineProperty(obj, prop, descriptor);
    },
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    setPrototypeOf(target, proto) {
      return Reflect.setPrototypeOf(target, proto);
    },
    getPrototypeOf(target) {
      return Reflect.getPrototypeOf(target);
    },
    preventExtensions(target) {
      return Reflect.preventExtensions(target);
    },
    isExtensible(target) {
      return Reflect.isExtensible(target);
    },
    has(target, prop) {
      return Reflect.has(target, prop);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target);
    }
  });
}

const proxy1 = verbose(obj1);

function fn1(x) {
  return { f: `Fn1: ${x}, ${!!new.target}` };
}

const proxyF1 = verbose(fn1);

const obj2 = Object.create(proxy1);

const proxy2 = verbose(obj2);

const proxy3 = verbose(proxy2);

console.log("proxy1.a:", proxy1.a);
proxy1.b = 10;
console.log("proxy1.b:", proxy1.b);
Object.setPrototypeOf(proxy1, { _protoT: true });
console.log("Object.getPrototypeOf(proxy1):", Object.getPrototypeOf(proxy1));
console.log(`"a" in proxy1:`, "a" in proxy1);
delete proxy1.a;
console.log("proxy1.a:", proxy1.a);
Object.defineProperties(proxy1, {
  Z: { value: 10 },
  [Symbol.for("Z")]: { value: 20 }
});
console.log(
  `Object.getOwnPropertyDescriptor(proxy1, "Z"):`,
  Object.getOwnPropertyDescriptor(proxy1, "Z")
);
console.log("Object.keys(proxy1):", Object.keys(proxy1));
console.log(
  "Object.getOwnPropertyNames(proxy1):",
  Object.getOwnPropertyNames(proxy1)
);
console.log(
  "Object.getOwnPropertySymbols(proxy1):",
  Object.getOwnPropertySymbols(proxy1)
);
console.log("Reflect.ownKeys(proxy1):", Reflect.ownKeys(proxy1));
console.log("proxyF1(10):", proxyF1(10));
console.log("new proxyF1(100):", new proxyF1(100));
proxy1.fn2 = proxyF1;
console.log("proxy1.fn(100):", proxy1.fn(100));
console.log("proxy1.fn2(100)", proxy1.fn2(100));
proxy3.A = "A";
console.log("proxy3.A:", proxy3.A);
proxy3.b = "B";
console.log("proxy3.b:", proxy3.b);
delete proxy3.A;
console.log("proxy1.a:", proxy1.a);

const arr1 = [1, 2, 3, 4];
const aproxy = verbose(arr1);

console.log(
  aproxy.map(i => {
    console.log("I", i);
    return i * 10;
  })
);

aproxy[2] = "PX2";
console.log("push", aproxy.push("Q", "W"));
console.log("unshift", aproxy.unshift("E", ["R", "T"]));
console.log("shift", aproxy.shift());
console.log("pop", aproxy.pop());
console.log("concat", aproxy.concat(["T", ["Y"]], [["U"]]));
console.log("flat", aproxy.flat());
console.log("slice", aproxy.slice(1, 2));
console.log("splice:", aproxy.splice(1, 2, "a", "b", "c"));

console.log("DONE!");
