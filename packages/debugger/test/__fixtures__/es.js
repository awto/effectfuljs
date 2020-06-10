let j = 0;

export function mapTest(v) {
  j = 0;
  const self = {};
  return v.map(
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
  return v.flatMap(
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
  return v.filter(
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
  return v.findIndex(
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
  return v.forEach(
    function(i, x, t) {
      console.log(`forEachTest@${x}[${j++}]:${t === v}`, i);
    },
    self
  );
}

export function reduceTest(v) {
  j = 0;
  return [v.reduce(run, "~"), v.reduce(run)];
  function run(acc, i, x, t) {
    console.log(`reduce:${acc}@${x}[${j++}]:${t === v}`, i);
    return `${acc}/${i}`;
  }
}

export function reduceRightTest(v) {
  j = 0;
  return [v.reduceRight(run, "~"), v.reduceRight(run)];
  function run(acc, i, x, t) {
    console.log(`reduceRight:${acc}@${x}[${j++}]:${t === v}`, i);
    return `${acc}/${i}`;
  }
}

export function arraySortTest(v, w) {
  v.sort((a, b) => a - b);
  w.sort();
  return [v, w];
}

export function typedArraySortTest(v, w) {
  v.sort((a, b) => a - b);
  w.sort();
  return [v, w];
}

export function someTest(v) {
  const self = {};
  return [
    v.some(
      function(i, x, t) {
        console.log(`some@${x}[${j++}]:${t === v}/${self === this}`, i);
        return i === 2;
      },
      self
    ),
    v.some(
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
    v.every(
      function(i, x, t) {
        console.log(`every@${x}[${j++}]:${t === v}/${self === this}`, i);
        return i !== 2;
      },
      self
    ),
    v.every(
      function(i, x, t) {
        return true;
      },
      self
    )
  ];
}
