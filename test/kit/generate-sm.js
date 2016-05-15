var staticModule = require('static-module');
var JSONStream = require('JSONStream');
var dirs = require('./dirs');


var sm = staticModule({
    dirs: {
        read: function (path) {
            return JSON.stringify(dirs.read(path));
        }
    }
});

module.exports = function (file, opts) {
    return sm;
};

process.stdin.pipe(sm).pipe(process.stdout);


