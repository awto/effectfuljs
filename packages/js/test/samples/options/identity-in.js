// *- SKIP
M.option.when("call && name === 'pp'",{identity:true})
M.option.whenExists("CallExpression[callee.name=pp] CallExpression", {bind:false})

function a() {
    console.log(pp(eff(1) + eff(2)));
}

