compiler = require "../compiler"

loadFile = (opts) ->
  (module, filename) ->
    module._compile answer, filename

noPostProcess =
  ".node": true
  ".json": true

if require.extensions
  do ->
    for i,f of require.extensions when not noPostProcess[i]
      do (i,f) ->
        require.extensions[i] = (module, filename) ->
          {_compile} = module
          module._compile = (code,filename) ->
            try
              answer = compiler.compile code, {transform:{filename}}
            catch e
              answer = code
            _compile.call(module,answer,filename)
          f(module,filename)
    return


