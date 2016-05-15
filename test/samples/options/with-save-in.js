// *- SKIP
M.option.when("name === 'eff'",{bind:false});
function a() {
    (function(){
        eff(0);
        M.option.save("save1");
        M.option.when("name === 'eff'", {bind:true});
        eff(1);
        eff(2);
        (function(){
            eff(0);
            M.option("defaults");
            eff(1);
            eff(2);
            (function(){
                eff(0);
                M.option("save1");
                eff(1);
                eff(2);
            })();
        })();
    })();
    eff(1);
    eff(2);
};
