class Foo {

  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  getName() : string {
    return this._name;
  }
}

class Bar extends Foo {

  getName() : string {
    return super.getName() + ' Doe';
  }
}

var bar = new Bar('John2');

console.log(bar.getName()); // John Doe
