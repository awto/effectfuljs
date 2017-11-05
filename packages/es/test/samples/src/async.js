exports.a1 = async function emptyBody() {
}

exports.a2 = async function pureReturn() {
  return "a2"
}

exports.a3 = async function singleAwait() {
  return await delay(1);
}

exports.a4 = async function asyncExprBind() {
  return await (await delay(1));
}

exports.a5 = async function asyncExprBind2() {
  return await await await delay(1);
}

exports.a6 = async function asyncAssign() {
  let i = 0
  i = await delay(i + 1)
  i = await delay(i++)
  return i
}

exports.a7 = async function forOf() {
  let res = 0
  for(const i of [1,2,3]) {
    res += await delay(i)
  }
  return res
}

exports.a8 = async function forIn() {
  let res = 0
  const obj = {"a":1,"b":2,"c":3}
  for(const i in obj) {
    res += await delay(obj[i])
  }
  return res
}

exports.a9 = async function simpleThrow() {
  throw new Error("1")
}

exports.a10 = async function throwCatch() {
  try {
    throw new Error("1")
  } catch(e) {
    return await delay(e.message)
  } 
}

exports.a11 = async function throwFinally() {
  try {
    throw new Error("1")
  } finally {
    return await delay("e")
  } 
}

