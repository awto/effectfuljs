function a() {
    eff("a");
    M.reflect(monadish);
    M.reflect(eff(1));
    M.reflect(monadish + 2);
    console.log(M.reify(function() {
        eff(1);
        eff(2);
    }));
}

M.profile("defaultMinimal");

function b() {
    M.reify(function() {
	var result = M( addLater(1, 2) );
	try {
	    expect(result).to.equal(3);
	    done();
	} catch (err) {
	    done(err);
	}
    }).done();
    
    function addLater(a, b) {
	var deferred = Q.defer();
	process.nextTick(function() {
	    deferred.resolve(a + b);
	});
	return deferred.promise;
    }    
}
