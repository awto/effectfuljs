const config = require("./deriveConfig");

function targetResolve(request) {
  return require.resolve(request, { paths: [config.srcRoot] });
}

exports.targetResolve = targetResolve;

exports.targetRequire = function targetRequire(request) {
  return require(targetResolve(request));
};
