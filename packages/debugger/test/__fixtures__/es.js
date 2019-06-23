import * as rt from "../../instr/rt";

let j = 0;

export function mapTest(v) {
  j = 0;
  const self = {};
  return rt.map.call(
    v,
    function(i, x, t) {
      console.log(`map@${x}[${j++}]:${t === v}/${self === this}`, i);
      return i + x;
    },
    self
  );
}

export function flatMapTest(v) {
  j = 0;
  const self = {};
  return rt.flatMap.call(
    v,
    function(i, x, t) {
      console.log(`flatMap@${x}[${j++}]:${t === v}/${self === this}`, i);
      return [i, x, i + x];
    },
    self
  );
}

export function filterTest(v) {
  j = 0;
  const self = {};
  return rt.filter.call(
    v,
    function(i, x, t) {
      console.log(`filter@${x}[${j++}]:${t === v}/${self === this}`, i);
      return i !== 2;
    },
    self
  );
}

export function findIndexTest(v) {
  j = 0;
  const self = {};
  return rt.findIndex.call(
    v,
    function(i, x, t) {
      console.log(`findIndex@${x}[${j++}]:${t === v}/${self === this}`, i);
      return i === 2;
    },
    self
  );
}

export function forEachTest(v) {
  j = 0;
  const self = {};
  return rt.forEach.call(
    v,
    function(i, x, t) {
      console.log(`forEachTest@${x}[${j++}]:${t === v}`, i);
    },
    self
  );
}

export function reduceTest(v) {
  j = 0;
  return [rt.reduce.call(v, run, "~"), rt.reduce.call(v, run)];
  function run(acc, i, x, t) {
    console.log(`reduce:${acc}@${x}[${j++}]:${t === v}`, i);
    return `${acc}/${i}`;
  }
}

export function reduceRightTest(v) {
  j = 0;
  return [rt.reduceRight.call(v, run, "~"), rt.reduceRight.call(v, run)];
  function run(acc, i, x, t) {
    console.log(`reduceRight:${acc}@${x}[${j++}]:${t === v}`, i);
    return `${acc}/${i}`;
  }
}

export function arraySortTest(v, w) {
  rt.arraySort.call(v, (a, b) => a - b);
  rt.arraySort.call(w);
  return [v, w];
}

export function typedArraySortTest(v, w) {
  rt.typedArraySort.call(v, (a, b) => a - b);
  rt.typedArraySort.call(w);
  return [v, w];
}

export function someTest(v) {
  const self = {};
  return [
    rt.some.call(
      v,
      function(i, x, t) {
        console.log(`some@${x}[${j++}]:${t === v}/${self === this}`, i);
        return i === 2;
      },
      self
    ),
    rt.some.call(
      v,
      function(i, x, t) {
        return false;
      },
      self
    )
  ];
}

export function everyTest(v) {
  const self = {};
  return [
    rt.every.call(
      v,
      function(i, x, t) {
        console.log(`every@${x}[${j++}]:${t === v}/${self === this}`, i);
        return i !== 2;
      },
      self
    ),
    rt.every.call(
      v,
      function(i, x, t) {
        return true;
      },
      self
    )
  ];
}
