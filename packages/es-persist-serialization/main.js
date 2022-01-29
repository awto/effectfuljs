import * as S from "@effectful/serialization";
import * as R from "@effectful/es-persist";
export {
  generator,
  generatorFunction,
  iterator,
  iteratorM,
  forInIterator,
  contextSymbol,
  sendSymbol,
  awaitSymbol,
  context,
  async,
  asyncGenerator,
  lock,
  all,
  any,
  producer,
  current,
  idle,
  abort,
  managed
} from "@effectful/es-persist";

export {
  read,
  write,
  regConstructor,
  regOpaqueObject,
  bind,
  parse,
  stringify,
  regDescriptor,
  regOpaquePrim
} from "@effectful/serialization";

function reg(v) {
  S.regConstructor(v);
  S.regOpaqueObject(v);
}

R.constructors.forEach(reg);
export const asyncFunction = R.makeAsyncFunctionConstructor(reg);
export const asyncGeneratorFunction = R.makeAsyncGeneratorFunctionConstructor(
  reg
);
