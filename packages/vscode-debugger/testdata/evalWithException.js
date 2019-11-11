console.log("line 1");
console.log("line 2");
console.log("line 3");

eval(`
try {
  console.log("IN EVAL")
  throw new Error("error");
} catch (e) {
  console.log("exception1: " + e);
}
`);

try {
  eval(`
	console.log("IN EVAL")
	throw new Error("error");
	`);
} catch (e) {
  console.log("exception2: " + e);
}

const f1 = new Function(
  "a",
  "b",
  `
console.log("FN:",a,b)
throw new Error("ERRR:"+a+b)
`
);

try {
  f1(100, 200);
} catch (e) {
  console.log("exception3: " + e);
}

console.log("line 4");
(0, eval)(`console.log("IN INDIR EVAL")
console.foobar("line 5");
`);
console.log("line 6");
