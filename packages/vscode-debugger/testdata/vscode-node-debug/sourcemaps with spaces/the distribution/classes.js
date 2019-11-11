var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Foo = (function () {
    function Foo(name) {
        this._name = name;
    }
    Foo.prototype.getName = function () {
        return this._name;
    };
    return Foo;
})();
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    Bar.prototype.getName = function () {
        return _super.prototype.getName.call(this) + ' Doe';
    };
    return Bar;
})(Foo);
var bar = new Bar('John2');
console.log(bar.getName()); // John Doe

//# sourceMappingURL=../the maps/classes.js.map
