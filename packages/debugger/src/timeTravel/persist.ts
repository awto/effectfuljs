import config from "../config";
import * as S from "@effectful/serialization";
import {
  getTraceData,
  traceDataSymbol,
  traceMetaSymbol,
  TraceData,
  unwrapTarget,
  wrap
} from "./core";

const defaultObjectDescriptorGetter = S.getObjectDescriptor;

const TraceSerializationDescriptor = S.regDescriptor({
  name: "#Trace",
  create(ctx, json) {
    const targetJson: any = (<any>json).t;
    const descr = <S.Descriptor>S.getJsonDescriptor(targetJson);
    return wrap(descr.create(ctx, targetJson));
  },
  readContent(ctx, json, value) {
    const targetJson: any = (<any>json).t;
    const descr = <S.Descriptor>S.getJsonDescriptor(targetJson);
    descr.readContent(ctx, targetJson, unwrapTarget(<any>value));
  },
  write(ctx, value: any) {
    const res: any = {};
    const data = <TraceData<any>>getTraceData(value);
    res.t = ctx.step(data.target, res, "t");
    return res;
  },
  props: false
});

if (config.persistTimeTravel) {
  S.regOpaquePrim(traceDataSymbol);
  S.regOpaquePrim(traceMetaSymbol);
} else {
  S.regPrim(S.NotSerializableDescriptor, traceDataSymbol);
  S.regPrim(S.NotSerializableDescriptor, traceMetaSymbol);
}

S.regOpaquePrim(traceDataSymbol);
S.regObjectDescriptorGetter(function(
  target: any
): S.Descriptor<any> | undefined {
  return getTraceData(target)
    ? TraceSerializationDescriptor
    : defaultObjectDescriptorGetter(target);
});
