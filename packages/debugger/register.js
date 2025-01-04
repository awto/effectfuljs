const Persist = require("./persist");

const config = require("./config/deriveConfig");

const compile = require("./config/node/compile");
const path = require("node:path");

const Module = module.constructor;

const Mp = Module.prototype;

const savedCompile = Mp._compile;

const loaderPostfix = config.loaderPostfix;

if (loaderPostfix) {
    const savedResolve = Module._resolveFilename;
    const savedLoad = Mp.load;

    Module._resolveFilename = function _resolveFilename(
      request,
      parent,
      isMain,
      options,
    ) {
      if (!isMain) {
        if (!request.endsWith(loaderPostfix))
          return savedResolve.call(this, request, parent, isMain, options);
        request = request.slice(0, -loaderPostfix.length);
      }
      // giving dynamic import a chance to load
      if (request.startsWith("file://"))
        request = request.slice("file://".length);
      const result = savedResolve.call(this, request, parent, isMain, options);
      if (
        /(?:^\s*(?:@effectful|node:|data:))|node\/reloadWorker\.js$/.test(
          request,
        ) ||
        !path.isAbsolute(result)
      )
        return result;
      return "edbg+" + result;
    };

    Mp.load = function load(file) {
      const enabled = (this._edbgEnabled = file.startsWith("edbg+"));
      const ret = savedLoad.call(
        this,
        enabled ? file.slice("edbg+".length) : file,
      );
      if (!enabled) Persist.regModule(this.exports, `node#${this.id}`);
      return ret;
    };
  }

  Mp._compile = function _compile(content, filename, format) {
    if (loaderPostfix && !this._edbgEnabled)
      return savedCompile.call(this, content, filename, format);
    const code = compile(content, filename, this);
    if (!code) 
      return savedCompile.call(this, content, filename, format);
    if (config.patchVM) require("./config/node/vm");
    return savedCompile.call(this, code, filename, "commonjs");
  };
