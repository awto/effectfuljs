let cnt = 0;

export function f1(i) {
  cnt++;
  console.log(`f1:${i}@${cnt}`);
  return cnt;
}

export function f2(i) {
  cnt++;
  console.log(`f2:${i}@${cnt}`);
}
