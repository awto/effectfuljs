function a() {
  var a_v = {
    e: undefined
  };
  console.log('in');

  try {
    console.log('inner');
  } catch (e) {
    console.log('exception', a_v.e);
  }

  console.log('out');
  return;
}

function b() {
  var b_v = {
    e: undefined
  };
  console.log('in');

  try {
    console.log('inner');
  } catch (e) {
    console.log('exception', b_v.e);
  } finally {
    console.log('fin');
  }

  console.log('out');
  return;
}

function c() {
  console.log('in');

  try {
    console.log('inner');
  } finally {
    console.log('fin');
  }

  console.log('out');
  return;
}