'use strict';
var M = require('./mfjscore');
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _cycleCore = require('@cycle/core');
var _cycleCore2 = _interopRequireDefault(_cycleCore);
var _cycleDom = require('@cycle/dom');
var RxM = require('@mfjs/rx')(require('rx'));
function main(sources) {
    function toggledM() {
        return M.scope(function (root) {
            return root(false).mopt().mbind(function () {
                return M(sources.DOM.select('input').events('change')).mapply(function (b) {
                    return b.target.checked;
                }).mbind(root);
            });
        });
    }
    var sinks;
    sinks = {
        DOM: RxM.run(function () {
            return (0, _cycleDom.div)([
                (0, _cycleDom.input)({ type: 'checkbox' }),
                'Toggle me',
                (0, _cycleDom.p)(toggledM() ? 'ON' : 'off')
            ]);
        })
    };
    return sinks;
}
_cycleCore2['default'].run(main, { DOM: (0, _cycleDom.makeDOMDriver)('#main-container') });
function modelM(action$) {
    var n = M.reify(function () {
        eff(1);
    });
    n.scan(function (acc, key) {
        index = acc.indexOf(key);
        if (index === -1) {
            return acc.concat(key).sort();
        }
        newAcc = acc.slice();
        newAcc.splice(index, 1);
        return newAcc;
    });
}
function expandAsRenderingFrames(point$) {
    var point;
    var n = M.reify(function () {
        return M(point$).mbind(function (b) {
            point = b;
            return Observable.interval(10);
        });
    });
    return n.mapply(function () {
        return point;
    }).take(100);
}