async function* simpleAsyncGenerator() {
  for (let i = 0; i < 3; i++) {
    yield i;
    await new Promise(rs => setTimeout(rs, 0));
  }
  return 4;
}

function* simpleGenerator() {
  for (let i = 0; i < 3; i++) {
    yield i;
  }
  return 4;
}

async function* asyncGeneratorRedirects1() {
  console.log("simple async generator result:", yield* simpleAsyncGenerator());
  const g1 = yield* simpleAsyncGenerator();
  for await (const i of simpleAsyncGenerator())
    yield `simple async generator item:${i}`;
  return `generator result: ${g1}`;
}

async function* asyncGeneratorRedirects2() {
  yield "> async generators level 2";
  console.log("level 2 result:", yield* asyncGeneratorRedirects1());
  yield* asyncGeneratorRedirects1();
  yield `< async generators level 2`;
  return "async redirect 2";
}

async function* yieldStarRedirect() {
  return yield* asyncGeneratorRedirects2();
}

async function* yieldStartRedirectToSync() {
  return yield* simpleGenerator();
}

function customGenerator() {
  let cnt = 0;
  return {
    [Symbol.iterator]: function() {
      console.log("get sync iterator");
      return this;
    },
    next: function() {
      console.log("custom iterator next:", cnt);
      if (cnt === 2) return { value: cnt, done: true };
      return { value: cnt++, done: false };
    }
  };
}

function customAsyncGenerator() {
  let cnt = 0;
  return {
    [Symbol.asyncIterator]: function() {
      console.log("get async iterator");
      return this;
    },
    next: async function() {
      await new Promise(rs => setTimeout(rs, 0));
      console.log("custom async iterator next:", cnt);
      if (cnt === 2) return { value: cnt, done: true };
      return { value: cnt++, done: false };
    }
  };
}

async function* asyncGeneratorEmpty() {
  return "empty";
}

function* generatorEmpty() {
  return "empty";
}

async function* variousYieldStarsInAsyncGenerator() {
  console.log("yield* redirect", yield* yieldStarRedirect());
  console.log("yield* redirect to sync", yield* yieldStartRedirectToSync());
  console.log("custom async generator", yield* customGenerator());
  console.log("custom generator", yield* customAsyncGenerator());
  console.log("yield* empty async generator:", yield* asyncGeneratorEmpty());
  console.log("yield* empty generator:", yield* generatorEmpty());
  return "variousYieldStarsInAsyncGenerator";
}

module.exports = async function asyncGeneratorsExamples() {
  console.log("Async Generators>");
  let num = 0;
  let j;
  for (
    let i = variousYieldStarsInAsyncGenerator()[Symbol.asyncIterator]();
    !(j = await i.next(num++)).done;

  ) {
    console.log("Async Generators Item:", j.value);
  }
  console.log("Async Generators Result:", j.value);
  return "Async Generators Resulting Value";
};
