M.profile("es");

async function aa() {
  class A {
    async method() {
      return "from A";
    }
    static async smethod() {
      return "static from A";
    }
  }

  class B extends A {
    async method() {
      return "from B " + (await super.method());
    }
    static async smethod() {
      return "static from B " + (await super.method());
    }
  }
}
