
M.option(
  {
    minimal: {
      ExpressionStatement: {
        select: "cases(property('expression.name'))",
        cases: {
          begin: { next: "full" }
        },
      }
    },
    full: {
      ExpressionStatement: {
        select: "cases(property('expression.name'))",
        cases: {
          end: { next: "minimal" }
        }
      }
    }
  });

M.profile("defaultMinimal");

var begin, end;

function a() {
  eff(1);
  eff(2);
  begin;
  eff(3);
  eff(4);
}

function b() {
  eff(1);
  eff(2);
  begin;
  eff(3);
  eff(4);
  end;
  eff(5);
  eff(6);
}

function c() {
  eff(1);
  eff(2);
  {
    begin;
    eff(3);
    eff(4);
  }
  eff(5);
  eff(6);
}


