let cnt = 0;

function A(i) {
  this.i = i * 10 + cnt;
  this.b = new B(100);
}

function B(i) {
  this.i = i;
  return { b: this, cnt };
}

export function f1(i) {
  cnt++;
  console.log(`f1:${i}@${cnt}`);
  const a = new A(cnt);
  console.log("A:", a);
  return cnt;
}

export function f2(i) {
  cnt++;
  console.log(`f2:${i}@${cnt}`);
}
