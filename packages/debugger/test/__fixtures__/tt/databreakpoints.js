const ar1 = [1, 2, 3];
const ar2 = [4, 5, 6];
const obj = { p1: "P1" };
let loc = 0;
debugger;
loc++;
obj.p1 = "P2";
Object.setPrototypeOf(obj, null);
Object.defineProperty(obj, "p1", {
  configurable: true,
  enumerable: true,
  value: "P3"
});
Object.assign(obj, { p1: "P4" });
delete obj.p1;
for (const arr of [ar1, ar2]) {
  arr.shift();
  arr.unshift(0);
  arr.pop();
  arr.push(7);
  arr.pop();
  arr.reverse();
  arr.sort();
  arr.splice(2, 1, 8, 9);
  arr[2] = 10;
}
debugger;
