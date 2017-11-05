M.profile("generators")

function* fSent() {
  var s = yield function.sent
  yield* [1,2,3,function.sent]
  console.log(s,function.sent)
  console.log(yield) 
  console.log(yield) 
}

