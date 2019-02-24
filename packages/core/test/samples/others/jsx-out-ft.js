import * as M from "@effectful/core";

function Comp() {
  var Comp = M.context();
  return M.scope(Comp_1);
}

function Comp_1(Comp) {
  Comp._x = <><EffT /></>;
  Comp._x = null;
  return M.chain(eff1(), Comp_2);
}

function Comp_2(Comp, a) {
  Comp._x = <><C1>{<EffM />}</C1>{a}</>;
  Comp._z = <C1><EffC2 a1="a1" a2={a2}><Eff3 /><Eff4 a4={a4} />{<Eff5 />}</EffC2></C1>;
  return M.chain(eff2(), Comp_3);
}

function Comp_3(Comp, a) {
  return <EffR>{Comp._z}<C>{Comp._x}</C>{a}{...ch}</EffR>;
}