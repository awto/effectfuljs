function a1() {}
{
  class Some {
    async a() {
      await new Some();
      await new Something();
      a1();
    }
  }
  let b = a;
  function Something() {
    a1(b);
  }
  const [, other, b2] = Some;
  async function somethingElse() {
    return async function zz() {
      await eff_1(Something());
      await eff_2(new Some());
      await eff_3(a, b);
    };
  }
}
