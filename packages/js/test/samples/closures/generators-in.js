M.profile("es")

const a = (w) =>
      function* mfs(s) {
        let v, k
        return function kk(k) {
          return function* vv(ww) {
            let id
            yield function* nn(mm) {
              yield (m) => id(k,v,w,m,ww,mm)
              yield k++
            }
          }
        }
      }

function* e1(k) {
  yield k
  yield function p1(m) {
    return function* e2(l) {
      yield k+=l
    }
  }
}

function* e1(k) {
  yield k
  yield function* e2(m) {
    yield function* e3(l) {
      yield k+=l
    }
  }
}
