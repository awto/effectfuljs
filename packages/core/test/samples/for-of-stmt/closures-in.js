M.profile("generators");

function* forOfBlockScope() {
  let a = [1, 2, 3, 4, 5, 6, 7, 8];
  let b = [10, 11, 12, 13, 14, 15, 16];
  const funs = [];
  for (const i of a) {
    let j = 0;
    funs.push(function* iter() {
      yield `fo1: ${i} ${j++}`;
    });
  }
  for (var i of a) {
    var j = 0;
    funs.push(function* iter() {
      yield `fo2: ${i} ${j++}`;
    });
  }
  for (const i of a) {
    for (let j of b) {
      funs.push(function* iter() {
        yield `fo3: ${i} ${j++}`;
      });
    }
  }
  for (const i of a) {
    for (let j of b) {
      yield `fo4: ${j}`;
      funs.push(function* iter() {
        yield `fo5: ${i} ${j++}`;
      });
    }
  }
  for (const i of a) {
    yield `fo6: ${i}`;
    for (let j of b) {
      funs.push(function* iter() {
        yield `fo7: ${i} ${j++}`;
      });
    }
  }
  for (const i of a) {
    yield `fo8 ${i}`;
    for (let j of b) {
      yield `fo9: ${i}`;
      funs.push(function* iter() {
        yield `fo10: ${i} ${j++}`;
      });
    }
  }
  for (const i of funs) yield* i();
  funs.length = 0;
  for (const i of a) {
    funs.push(function* iter() {
      yield `fo11: ${i}`;
    });
  }
  for (const i of a) {
    yield `fo12 ${i}`;
    funs.push(function* iter() {
      yield `fo13 ${i}`;
    });
  }
  let k = 0;
  for (const i of a) {
    yield `fo14 ${i} ${k} {m}`;
    let m = k;
    k++;
    if (k === 3) continue;
    if (k === 5) break;
    funs.push(function* iter() {
      yield `fo15 ${i} ${k} {m}`;
    });
  }
  k = 0;
  up1: for (const i of a) {
    let m = k;
    k++;
    for (const j of b) {
      let n = m;
      m++;
      if (k === 3) continue up1;
      if (k === 5) break up1;
      if (n === 3) continue;
      if (n === 5) break;
      funs.push(function* iter() {
        n++;
        yield `fo18: ${i} ${j} ${k} ${m} ${n}`;
      });
    }
  }
  k = 0;
  up2: for (const i of a) {
    let m = 0;
    k++;
    yield `fo16: ${i} ${k} ${m}`;
    for (const j of b) {
      let n = m;
      m++;
      if (k === 3) continue up2;
      if (k === 5) break up2;
      if (n === 3) continue;
      if (n === 5) break;
      funs.push(function* iter() {
        n++;
        yield `fo18: ${i} ${j} ${k} ${m} ${n}`;
      });
    }
  }
  k = 0;
  up3: for (const i of a) {
    let m = 0;
    k++;
    for (const j of b) {
      let n = m;
      m++;
      yield `fo19 ${i} ${j} ${k} ${m} ${n}`;
      if (k === 3) {
        continue up3;
      }
      if (k === 5) break up3;
      if (n === 3) continue;
      if (n === 5) break;
      funs.push(function* iter() {
        n++;
        yield `fo20: ${i} ${j} ${k} ${m} ${n}`;
      });
    }
  }
  bl1: {
    let k = 0;
    yield `fo21: ${i} ${k}`;
    up4: for (const i of a) {
      let m = 0;
      k++;
      yield `fo22: ${i} ${k} ${m}`;
      for (const j of b) {
        let n = m;
        m++;
        yield `fo23 ${i} ${j} ${k} ${m} ${n}`;
        if (k === 3) continue up4;
        if (k === 5) break bl1;
        if (n === 3) continue;
        if (n === 5) break;
        funs.push(function* iter() {
          n++;
          yield `fo24: ${i} ${j} ${k} ${m} ${n}`;
        });
      }
    }
  }
  bl2: {
    let k = 0;
    yield `fo25`;
    up5: for (const i of a) {
      let m = 0;
      k++;
      yield `fo26: ${i} ${k} ${m}`;
      for (const j of b) {
        let n = m;
        m++;
        yield `fo27 ${i} ${j} ${k} ${m} ${n}`;
        if (k === 3) continue up5;
        if (k === 5) break bl2;
        if (n === 3) continue;
        if (n === 5) break;
        funs.push(function* iter() {
          n++;
          yield `fo28: ${i} ${j} ${k} ${m} ${n}`;
        });
      }
    }
  }
  bl3: {
    let k = 0;
    up6: for (const i of a) {
      let m = 0;
      k++;
      yield `fo29: ${i} ${k} ${m}`;
      for (const j of b) {
        let n = m;
        m++;
        yield `fo30 ${i} ${j} ${k} ${m} ${n}`;
        if (k === 3) continue up6;
        if (k === 5) {
          for (const i of funs) yield* i();
          return `r: ${i} ${j} ${k} ${m} ${n}`;
        }
        if (n === 3) continue;
        if (n === 5) break;
        funs.push(function* iter() {
          n++;
          yield `fo31: ${i} ${j} ${k} ${m} ${n}`;
        });
      }
    }
  }
}
