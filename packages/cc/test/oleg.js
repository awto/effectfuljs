import CC from "../main";

describe("test cases from Oleg Kiselyov's samples", function() {
  const p = CC.newPrompt();
  it("test1", function() {
    const r = CC.run(
      CC(async () => 4 + (await CC.pushPrompt(p, CC.pushPrompt(p, 5))))
    );
    expect(r).to.equal(9);
  });
  it("test2", function() {
    const r = CC.run(
      CC(
        async () =>
          4 +
          (await CC.pushPrompt(
            p,
            CC(() =>
              CC.pushPrompt(p, CC(async () => 6 + (await CC.abort(p, 5))))
            )
          ))
      )
    );
    expect(r).to.equal(9);
  });
  it("test3", function() {
    const r = CC.run(
      CC(
        async () =>
          20 +
          (await CC.pushPrompt(
            p,
            CC(async () => {
              const v1 = await CC.pushPrompt(
                  p,
                  CC(async () => 6 + (await CC.abort(p, 5)))
                ),
                v2 = await CC.abort(p, 7);
              return v1 + v2 + 10;
            })
          ))
      )
    );
    expect(r).to.equal(27);
    try {
      CC.run(
        CC(async function() {
          let v = await CC.pushPrompt(
            p,
            CC(async function() {
              const v1 = await CC.pushPrompt(p, 6 + (await CC.abort(p, 5))),
                v2 = CC.abort(p, 7);
              return v1 + v2 + 10;
            })
          );
          v = await CC.abort(p, 9);
          return v + 20;
        })
      );
      fail("should throw");
    } catch (e) {
      expect(e.message).to.equal(`prompt ${p.name}@${p.id} wasn't found`);
    }
  });
  it("test4", function() {
    let r = CC.run(
      CC(
        async () =>
          20 +
          (await CC.pushPrompt(
            p,
            CC(
              async () =>
                10 +
                (await CC.withSubCont(
                  p,
                  async sk => await CC.pushPrompt(p, CC.pushSubCont(sk, 5))
                ))
            )
          ))
      )
    );
    expect(r).to.equal(35);
    r = CC.run(
      CC(
        async () =>
          20 +
          (await CC.pushPrompt(
            p,
            CC(
              async () =>
                10 +
                (await CC.withSubCont(
                  p,
                  async sk =>
                    await CC.pushSubCont(
                      sk,
                      CC.pushPrompt(p, CC.pushSubCont(sk, CC.abort(p, 5)))
                    )
                ))
            )
          ))
      )
    );
    expect(r).to.equal(35);
  });
  it("test5", function() {
    const r = CC.run(
      CC(
        async () =>
          10 +
          (await CC.pushPrompt(
            p,
            CC(
              async () =>
                2 + (await CC.shift(p, async sk => 100 + (await sk(sk(3)))))
            )
          ))
      )
    );
    expect(r).to.equal(117);
    const p2L = CC.newPrompt();
    const p2R = CC.newPrompt();
    r = CC.run(
      CC(
        async () =>
          10 +
          (await CC.pushPrompt(
            p2L,
            CC(
              async () =>
                2 +
                (await CC.shift(
                  p2L,
                  async sk =>
                    100 +
                    (await sk(CC.pushPrompt(p2R, sk(sk(CC.abort(p2R, 3))))))
                ))
            )
          ))
      )
    );
    expect(r).to.equal(115);
  });
  it("test6", function() {
    const p1 = CC.newPrompt();
    const p2 = CC.newPrompt();
    const r = CC.run(
      CC(async function() {
        async function pushtwice(sk) {
          return await CC.pushSubCont(sk, CC.pushSubCont(sk, 3));
        }
        return (
          10 +
          (await CC.pushPrompt(
            p1,
            CC(
              async () =>
                1 + (await CC.pushPrompt(p2, CC.withSubCont(p1, pushtwice)))
            )
          ))
        );
      })
    );
    expect(r).to.equal(15);
  });
  it("test7", async function() {
    var p1 = CC.newPrompt();
    var p2 = CC.newPrompt();
    var p3 = CC.newPrompt();
    var r = CC.run(
      CC(async function() {
        function pushtwice(sk) {
          return CC.pushSubCont(
            sk,
            CC.pushSubCont(
              sk,
              CC.withSubCont(p2, sk2 =>
                CC.pushSubCont(sk2, CC.pushSubCont(sk2, 3))
              )
            )
          );
        }
        return (
          100 +
          (await CC.pushPrompt(
            p1,
            CC(
              async () =>
                1 +
                (await CC.pushPrompt(
                  p2,
                  CC(
                    async () =>
                      10 +
                      (await CC.pushPrompt(p3, CC.withSubCont(p1, pushtwice)))
                  )
                ))
            )
          ))
        );
      })
    );
    expect(r).to.equal(135);
    r = CC.run(
      CC(async function() {
        function pushtwice(f) {
          return f(f(CC.shift(p2, async f2 => await f2(await f2(3)))));
        }
        return (
          100 +
          (await CC.pushPrompt(
            p1,
            CC(
              async () =>
                1 +
                (await CC.pushPrompt(
                  p2,
                  CC(
                    async () =>
                      10 + (await CC.pushPrompt(p3, CC.shift(p1, pushtwice)))
                  )
                ))
            )
          ))
        );
      })
    );
    expect(r).to.equal(135);
    r = CC.run(
      CC(async function() {
        async function pushtwice(f) {
          return await f(
            await f(CC.shift0(p2, async f2 => await f2(await f2(3))))
          );
        }
        return (
          100 +
          (await CC.pushPrompt(
            p1,
            CC(
              async () =>
                1 +
                (await CC.pushPrompt(
                  p2,
                  CC(
                    async () =>
                      10 + (await CC.pushPrompt(p3, CC.shift0(p1, pushtwice)))
                  )
                ))
            )
          ))
        );
      })
    );
    expect(r).to.equal(135);
  });
  it("test shift", function() {
    const r = CC.run(
      CC.pushPrompt(
        p,
        CC(async function() {
          const x = await CC.shift(p, async f => ["a"].concat(await f([])));
          return CC.shift(p, () => x);
        })
      )
    );
    expect(r).to.eql(["a"]);
  });
  it("test shift0", function() {
    const r = CC.run(
      CC(
        async () =>
          await CC.pushPrompt(
            p,
            CC(async () =>
              ["a"].concat(
                await CC.pushPrompt(
                  p,
                  CC.shift0(p, () => CC.shift0(p, () => []))
                )
              )
            )
          )
      )
    );
    expect(r).to.eql([]);
    r = CC.run(
      CC(async () =>
        CC.pushPrompt(
          p,
          CC(async () =>
            ["a"].concat(
              await CC.pushPrompt(
                p,
                CC.shift0(p, async f => await f(CC.shift0(p, () => [])))
              )
            )
          )
        )
      )
    );
    expect(r).to.eql(["a"]);
  });
  it("test control", function() {
    const r = CC.run(
      CC.pushPrompt(
        p,
        CC(async function() {
          const xv = await CC.control(p, async f => ["a"].concat(await f([])));
          return await CC.control(p, () => xv);
        })
      )
    );
    expect(r).to.eql([]);
    r = CC.run(
      CC.pushPrompt(
        p,
        CC(function() {
          var xv = CC.control(p, async f => ["a"].concat(await f([])));
          return CC.control(p, g => g(xv));
        })
      )
    );
    expect(r).to.eql(["a"]);
  });
  it("test control0", function() {
    const r = CC.run(
      CC.pushPrompt(
        p,
        CC(async function() {
          await CC.withSubCont(p, sk =>
            CC.pushPrompt(p, CC.pushSubCont(sk, 1))
          );
          return await CC.control0(p, f => f(2));
        })
      )
    );
    expect(r).to.equal(2);
  });
});
