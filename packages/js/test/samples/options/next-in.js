// *- SKIP
function a() {
    M.option.when("name==='eff'", {bind:false,count:1});
    eff(1);
    eff(2);
    eff(3);
};

M.option.when("name === 'pureonce'",
         {identity: true,
          apply: {
              cond: "call",
              bind: false,
              count: 1
          }});

function b() {
    pureonce();
    eff1(1) + 2;
    eff1(2);
    eff1(3);
};

