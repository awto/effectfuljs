if (!global.skipTestsLoaded) {
  global.skipTestsLoaded = true
  let saved = {describe,it,context} 
  function wrap(func) {
    return function impl(title, fun) {
      const skip = global.skipTests
      let res
      if (!skip || skip[title] !== true) {
        res =  func(title,fun)
      }
      global.skipTests = skip
      return res
    }
  }
  global.describe = wrap(describe)
  global.context = wrap(context)
  global.it = wrap(it)
}
