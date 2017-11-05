if (!global.skipTestsLoaded) {
  global.skipTestsLoaded = true
  const saved = {describe,it,context} 
  function wrap(func) {
    return function impl(title, fun) {
      if (global.skipTests && global.skipTests[title] === true)
        return
      return func(title,fun)
    }
  }
  global.describe = wrap(describe)
  global.context = wrap(context)
  global.it = wrap(it)
}
