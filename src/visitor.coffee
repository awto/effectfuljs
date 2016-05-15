config = require "./config"
kit = require "./kit"

# common parent for visitors for AST
class Visitor
  setCtx: (@ctx) ->
    @policy = @ctx.policy
    @

# visitor in translating state
class ActiveVisitor extends Visitor
  update: -> @
  subScope: ->
    new ActiveVisitor()

# disabled state visitor, it skips most of AST nodes searching
# for statements activating translation
class DisabledVisitor extends Visitor
  update: (ctx) ->
    return (new ActiveVisitor()).setCtx(ctx) if @policy.opts.compile
    @
  subScope: ->
    if @policy.opts.compile
      new ActiveVisitor()
    else new DisabledVisitor()
  noChanges: true

defaultVisitor = -> new DisabledVisitor()

module.exports = {defaultVisitor,Visitor,ActiveVisitor,DisabledVisitor}

