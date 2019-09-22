export function changeDom1() {
  const root = document.getElementById("root");
  root.innerHTML = `<div style="color:green" id="i1">Hi</div>`;
}

export function changeDom2() {
  const i1 = document.getElementById("i1");
  document.body.deb_hi = "there";
  i1.innerHTML = `<div id="i2">There</div>`;
  const i2 = document.getElementById("i2");
  i2.innerHtml = "hi there";
  i1.setAttribute("style", "color:red");
}

export function changeDom3() {
  const i1 = document.getElementById("i1");
  const i2 = document.getElementById("i2");
  const i3 = document.createElement("h1");
  const i4 = document.createElement("h2");
  i3.setAttribute("id", "i3");
  document.body.deb_hi = "THERE";
  i4.setAttribute("id", "i4");
  i1.setAttribute("style", "color:blue");
  i4.innerText = "post";
  i1.insertBefore(i3, i2);
  i1.insertBefore(i4, null);
}

export function changeDom4() {
  const i3 = document.getElementById("i3");
  const i2 = document.getElementById("i2");
  const i4 = document.getElementById("i4");
  delete document.body.deb_hi;
  i3.innerText = "PRE";
  i2.childNodes[0].data = "THERE";
  i4.remove();
}
