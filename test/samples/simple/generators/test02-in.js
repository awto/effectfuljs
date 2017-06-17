M.profile("generatorsDo")

function* a() {
  return (yield ((yield a1) + (yield a3)));
}
