function ar() {
  var i, j;
  i+=1;
  eff1(i);
  i+=2;
  eff2(i);
  M.option({bindAssoc:"left"});
  i+=3;
  effl1(i);
  effl2(i);
}
function ar2() {
  var i, j;
  i++;
  effr1(i);
  effr2(i);
  i++;
  effr3(i);
  M.option({bindAssoc:"left"});
  i++;
  effl1(i);
  i++;
  effl2(i); 
  j = 2;
  i+=1;
  effl3(i);
  M.option({bindAssoc:"right"});
  effr4(3);
  i++;
  effr5(j);
  effr6(3);
  j=1;
  effr7(i);
  effr8(i,j);
}
function a() {
  var i, j;
  i++;
  effl1(i);
  effl2(i);
  M.option({bindAssoc:"left"});
  i++;
  effr1(i);
  effr2(i);
  i++;
  effr3(i);
  j = 2;
  i+=1;
  effr4(i);
  effr5(i);
  effr6(3);
  M.option({bindAssoc:"right"});
  i++;
  effl3(j);
  effl4(3);
  j=1;
  effl5(i);
  effl6(j);
}
