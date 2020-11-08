// patched next/dist/build/webpack/loaders/next-client-pages-loader.js
"use strict";
exports.__esModule = true;
exports.default = void 0;
var _loaderUtils = _interopRequireDefault(require("loader-utils"));
const configJS = require("../deriveConfig");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const nextClientPagesLoader = function() {
  const { absolutePagePath, page } = _loaderUtils.default.getOptions(this);
  const stringifiedAbsolutePagePath = JSON.stringify(absolutePagePath);
  const stringifiedPage = JSON.stringify(page);
  return `
    (window.__NEXT_P = window.__NEXT_P || []).push([
      ${stringifiedPage},
      function () {
        return require("${configJS.runtime}").force(require(${stringifiedAbsolutePagePath}));
      }
    ]);
  `;
};
var _default = nextClientPagesLoader;
exports.default = _default;
//# sourceMappingURL=next-client-pages-loader.js.map
