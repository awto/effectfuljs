// *- when branches are pure but its condition has effects
// *- should bind statement's condition part using fmap
function a() {
    if (eff(1))
        return 1;
    else
        return 2;
};
