const f = new Function(
  "a",
  `
console.log("line1",a);
debugger;
console.log("line3",a);
`
);
f(1);
f(2);
