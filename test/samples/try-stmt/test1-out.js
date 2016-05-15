function a() {
    console.log('in');
    return M.coerce(function () {
        console.log('inner');
        return eff('inner');
    }).mhandle(function (e) {
        console.log('exception', e);
        return eff('exception', e);
    }).mbind(function () {
        console.log('out');
        return eff('out', e);
    });
}