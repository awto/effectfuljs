const native = require("../samples/src/generatorsBenchmarks");
const impls = require("./impls");

const Benchmark = require("benchmark");
const assert = require("assert");

const results = {};

const outp = typeof console !== "undefined" ? console.log : print;

if (process.env.BENCHMARK_CHECK) {
  for (const i in native) results[i] = Array.from(native[i]());
  for (const i in impls) {
    for (const j in results)
      assert.deepEqual(results[j], Array.from(impls[i][j]()), `${i}:${j}`);
  }
}

function run(name, iter, res) {
  return res
    ? function() {
        const i = iter()[Symbol.iterator]();
        for (let j = 0; j < res.length; ++j) {
          const e = i.next(j);
          if (e.done || res[j] !== e.value) {
            throw new Error(
              `wrong output: for ${name} on - ${j} ${e.done} || ${res[j]} !== ${
                e.value
              }`
            );
          }
        }
        const last = i.next(-1);
        if (!last.done) throw new Error("wrong result:" + name);
      }
    : function() {
        for (const i of iter()) {
        }
      };
}

function runBM(suite) {
  return suite
    .on("cycle", function(event) {
      outp(String(event.target));
    })
    .on("complete", function() {
      outp(`Fastest is ${this.filter("fastest").map("name")}`);
    })
    .run();
}

function benchmark(name) {
  const result = results[name];
  let suite = new Benchmark.Suite();
  for (const j in impls) {
    suite = suite.add(
      `${name}:${j}`,
      run(`${name}:${j}`, impls[j][name], result)
    );
  }
  suite = suite.add(
    `${name}:native`,
    run(`${name}:native`, native[name], result)
  );
  runBM(suite);
}

for (const i in native) benchmark(i);

function total(name, dict) {
  return function() {
    for (const i in dict) {
      run(`total-${name}:${i}`, dict[i](), results[i])();
    }
  };
}

let fullSuite = new Benchmark.Suite();
for (const i in impls)
  fullSuite = fullSuite.add("total:" + i, total(i, impls[i]));
fullSuite = fullSuite.add("total:native", total("native", native));
fullSuite = runBM(fullSuite);
