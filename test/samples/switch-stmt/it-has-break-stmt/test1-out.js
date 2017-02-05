function a(z) {
  return M((() => {
    switch (z) {
      case 1:
        return eff(1);

      default:
        return eff(2);
    }
  })()).mbind(() => eff(3));
}

function a(z) {
  return M((() => {
    switch (z) {
      case 1:
        return eff(1);

      case 2:
        {
          console.log('1');
          return M.pure();
        }

      default:
        {
          console.log('2');
          return M.pure();
        }
    }
  })()).mbind(() => eff(3));
}

function c(z) {
  return M.block(lab => M((() => {
    switch (z) {
      case 1:
        return eff(1);

      case 2:
        return M(eff(2)).mbind(() => lab());

      case 3:
        {
          console.log('z');
          return eff(3);
        }

      default:
        return eff(3);
    }
  })()).mbind(() => eff(4))).mbind(() => eff(5));
}

function d(z) {
  return M.block(lab1 => M.block(lab2 => M((() => {
    switch (z) {
      case 1:
        return eff(1);

      case 2:
        return M(eff(2)).mbind(() => lab1());

      case 3:
        {
          console.log('z');
          return lab2();
        }

      default:
        return eff(3);
    }
  })()).mbind(() => eff(4)).mbind(() => lab1())).mbind(() => eff(5))).mbind(() => eff(6));
}