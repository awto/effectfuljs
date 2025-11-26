import { regDescriptor } from "@effectful/serialization";
import * as React from "react";

/**
 * serialization format descriptor for React Element
 * @type {Descriptor}
 */

const tags = [
  Symbol.for("react.transitional.element"),
  Symbol.for("react.element")
];

let descriptor;

for (const tag of tags) {
  descriptor = regDescriptor({
    name: "ReactElement",
    typeofTag: tag,
    write(ctx, value) {
      const props = { children: void 0 };
      if (value.key != null) props.key = value.key;
      const res = { $: this.name };
      res.props = ctx.step({ ...value.props, ...props }, res, "props");
      res.children = ctx.step(
        React.Children.toArray(value.props.children),
        res,
        "children"
      );
      res.type = ctx.step(value.type, res, "type");
      return res;
    },
    readContent() {},
    read(ctx, json) {
      const children = json.children ? ctx.step(json.children) : [];
      return React.createElement(
        ctx.step(json.type),
        ctx.step(json.props),
        ...children
      );
    },
    create(ctx, json) {
      return this.read(ctx, json);
    },
    props: false,
    refAware: false
  });
}

export default descriptor;
