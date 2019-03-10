module.exports = {
  abstract: require("../default/links/generatorsBenchmarks"),
  abstractDefunct: require("../defunct/links/generatorsBenchmarks"),
  abstractTopLevel: require("../topLevel/links/generatorsBenchmarks"),
  abstractDefunctTopLevel: require("../defunctTopLevel/links/generatorsBenchmarks"),
  inline: require("../../../es-inline/test/default/links/generatorsBenchmarks"),
  inlineDefunct: require("../../../es-inline/test/defunct/links/generatorsBenchmarks"),
  inlineDefunctTopLevel: require("../../../es-inline/test/defunctTopLevel/links/generatorsBenchmarks"),
  loose: require("../../../es-inline/test/loose/links/generatorsBenchmarks"),
  looseDefunct: require("../../../es-inline/test/looseDefunct/links/generatorsBenchmarks"),
  looseDefunctTop: require("../../../es-inline/test/looseDefunctTop/links/generatorsBenchmarks"),
  looseDelegate: require("../../../es-inline/test/looseDelegate/links/generatorsBenchmarks"),
  minimal: require("../../../es-inline/test/minimal/links/generatorsBenchmarks"),
  minimalDefunct: require("../../../es-inline/test/minimalDefunct/links/generatorsBenchmarks"),
  minimalDelegate: require("../../../es-inline/test/minimalDelegate/links/generatorsBenchmarks")
};
