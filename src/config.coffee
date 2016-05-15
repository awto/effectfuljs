module.exports =
  # name of variable used for imporiting core library using CommonJS require
  packageVar: null
  # core library name to detect `packageVar`
  packageName: "@mfjs/core"
  # initial state
  start: "start"
  # debug output
  verbose: false
  # outpus details about how options for specific AST node were chosen 
  policyTrace: false
  states:
    coerce: "all"
    start: {}
    full:
      CallExpression:
        match:
          name:
            $: true
            _: true
          package:
            console: true
            window: true
            process: true
            assert: true
          libVar: true
        select: "matchCallName"
        cases:
          false:
            bind: true
      compile: true
    disabled:
      bind: false
      compile: false
    minimal:
      CallExpression:
        match:
          name: {}
          package: {}
          libVar: true
        select: "matchCallName"
        cases:
          true:
            bind: true
      compile: true
    nothing:
      bind: false
    defaultFull:
      Function:
        match:
          name: {}
          package: {}
          postfix: {}
          prefix: {}
        select: "matchDeclName"
        cases:
          true: sub: "minimal"
          false: sub: "full"
    defaultMinimal:
      Function:
        match:
          name: {}
          package: {}
          postfix: {}
          prefix: {}
        select: "matchDeclName"
        cases:
          true: sub: "full"
          false: sub: "minimal"
    defaultNothing:
      Function:
        match:
          name: {}
          package: {}
          postfix: {}
          prefix: {}
        select: "matchDeclName"
        cases:
          true: sub: "nothing"
          false: sub: "minimal"


