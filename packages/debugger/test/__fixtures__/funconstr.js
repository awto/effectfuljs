const f = new Function(
  "a",
  `
console.log("line1",a);
debugger;
for(let i = 0; i < 3; i++) {
  console.log("I:",i)
}
console.log("line3",a);
`
);
f(1);
f(2);
