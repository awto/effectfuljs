import CC from "../main";

describe("order of execution", function() {
  const p = CC.newPrompt();
  const _state = [];
  function trec(v) {
    _state.push(v);
  }
  function check() {
    expect(_state).to.eql(Array.from(arguments));
    _state.length = 0;
  }
  it("should respect js semantics", function() {
    CC.run(
      CC(async function() {
        await CC.pushPrompt(
          p,
          CC(async function() {
            await CC.withSubCont(p, async function(sk) {
              await CC.pushSubCont(sk, (async () => trec(1))());
              trec(2);
              await CC.pushSubCont(sk, (async () => trec(3))());
              trec(4);
            });
            trec(5);
          })
        );
        trec(6);
      })
    );
    check(1, 5, 2, 3, 5, 4, 6);
    CC.run(
      CC(async function() {
        await CC.pushPrompt(
          p,
          CC(async function() {
            await CC.withSubCont(p, async function(sk) {
              await CC.pushSubCont(
                sk,
                CC(async function() {
                  trec(1);
                  await CC.pushSubCont(sk, CC(async () => trec(2)));
                  trec(3);
                })
              );
              trec(4);
            });
            trec(5);
          })
        );
        trec(6);
      })
    );
    check(1, 2, 5, 3, 5, 4, 6);
  });
});
