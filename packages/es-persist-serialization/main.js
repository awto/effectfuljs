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
  descriptorSymbol,
  parse,
  stringify,
  regDescriptor,
  regOpaquePrim
} from "@effectful/serialization";

R.constructors.forEach(v => S.regConstructor(v));
export const asyncFunction = R.makeAsyncFunctionConstructor(S.regConstructor);
export const asyncGeneratorFunction = R.makeAsyncGeneratorFunctionConstructor(
  S.regConstructor
);
