import * as M from "@effectful/core";

function Comp() {
  var x, z, r;
  x = <><EffT /></>;
  return M.chain(eff1(), _1);

  function _1(a) {
    x = <><C1>{<EffM />}</C1>{a}</>;
    z = <C1><EffC2 a1="a1" a2={a2}><Eff3 /><Eff4 a4={a4} />{<Eff5 />}</EffC2></C1>;
    return M.chain(eff2(), _2);
  }

  function _2(a) {
    return <EffR>{z}<C>{x}</C>{a}{...ch}</EffR>;
  }
}