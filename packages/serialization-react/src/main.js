import { regDescriptor } from "@effectful/serialization";
import * as React from "react";

/**
 * serialization format descriptor for React Element
 * @type {Descriptor}
 */
export default regDescriptor({
  name: "ReactElement",
  typeofTag: Symbol.for("react.element"),
  write(ctx, value) {
    const props = { children: void 0 };
    if (value.key != null) props.key = value.key;
    return {
      "#type": this.name,
      "#data": ctx.step({
        props: { ...value.props, ...props },
        children: React.Children.toArray(value.props.children),
        type: value.type
      })
    };
  },
  readContent() {},
  read(ctx, json) {
    const data = ctx.step(json["#data"]);
    const children = data.children || [];
    return React.createElement(data.type, data.props, ...children);
  },
  create(ctx, json) {
    return this.read(ctx, json);
  }
});
