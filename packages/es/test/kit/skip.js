module.exports = function() {
  function wrap(func) {
    if (func.$skipLoaded)
      return func
    const res = function impl(title, fun) {
      const skip = global.skipTests
      let res
      if (!skip || skip[title] !== true) {
	res =  func(title,fun)
      }
      global.skipTests = skip
      return res
    }
    res.$skipLoaded = true
    return res
  }
  global.describe = wrap(describe)
  global.context = wrap(context)
  global.it = wrap(it)
}
