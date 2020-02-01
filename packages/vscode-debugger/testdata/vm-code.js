const vm = require("vm");
const util = require("util");

const sandbox = {
  animal: "cat",
  count: 2
};

vm.runInNewContext(
  `count += 1; 
   name = "kitty"
   debugger;`,
  sandbox
);
console.log(util.inspect(sandbox));

vm.createContext(sandbox);

vm.runInContext(
  `count += 1; 
   name = "another kitty"
   debugger;`,
  sandbox
);

console.log(util.inspect(sandbox));

const script = new vm.Script(
  `count += 1; 
   name = "kitty2";
   debugger;`
);

script.runInContext(sandbox);

console.log(util.inspect(sandbox));

let fn = vm.compileFunction(
  `count += c; 
   name = n
   debugger;`,
  ["c", "n"],
  { parsingContext: vm.createContext(sandbox) }
);
fn(2, "c1");
console.log(util.inspect(sandbox));
