function a() {
  return M(eff('a')).mbind(() => M.reflect(monadish)).mbind(() => eff(1)).mbind(() => M.reflect(monadish + 2)).mapply(() => {
    console.log(M.reify(function () {
      return M(eff(1)).mbind(() => eff(2));
    }));
  });
}

function b() {
  M.reify(function () {
    var result;
    return M(addLater(1, 2)).mapply(a => {
      let result;
      result = a;

      try {
        expect(result).to.equal(3);
        done();
      } catch (err) {
        done(err);
      }
    });
  }).done();

  function addLater(a, b) {
    var deferred = Q.defer();
    process.nextTick(function () {
      deferred.resolve(a + b);
    });
    return deferred.promise;
  }
}