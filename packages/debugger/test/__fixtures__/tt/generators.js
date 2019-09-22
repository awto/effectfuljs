export function testGen() {
  let cnt = 0;
  for (const i of _testGen()) {
    cnt += i;
    console.log("C", cnt, i);
  }
  return cnt;
  function* _testGen() {
    for (let i = 0; i < 3; ++i) {
      console.log("I", i, cnt);
      yield i * cnt++;
    }
  }
}

export function testAsync() {
  let cnt = 0,
    res = {};
  res.p = _testAsync();
  return res;
  async function _testAsync() {
    for (let i = 0; i < 3; ++i) {
      console.log("I", i, cnt);
      res.v =
        i *
        (cnt += await new Promise((rs, rj) => {
          res.rs = rs;
          res.rj = rj;
        }));
      await new Promise(i => setTimeout(i, 0));
      console.log("J", i, cnt);
      res.cont(cnt);
    }
    console.log("EXIT:", cnt);
    return cnt;
  }
}

export function testAsyncGen() {
  let cnt = 0,
    res = {};
  res.g = _testAsyncGen();
  res.p = _testAsyncGenLoop();
  return res;
  async function _testAsyncGenLoop() {
    for await (const i of res.g) {
      console.log("K", i, cnt);
    }
    return cnt;
  }
  async function* _testAsyncGen() {
    for (let i = 0; i < 3; ++i) {
      console.log("I", i, cnt);
      res.v =
        i *
        (cnt += await new Promise(function _testAsyncGenInit(rs, rj) {
          res.rs = rs;
          res.rj = rj;
        }));
      await new Promise(i => setTimeout(i, 0));
      yield cnt;
      res.cont(cnt);
      console.log("J", i, cnt);
    }
    console.log("EXIT:", cnt);
    return cnt;
  }
}
