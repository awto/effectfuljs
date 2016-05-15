function a(z) {
    switch (z) {
    case 1:
        eff(1);
        break;
    default:
        eff(2);
    }
    eff(3);
}

function a(z) {
    switch (z) {
    case 1:
        eff(1);
        break;
    case 2:
        console.log("1");
        break;
    default:
        console.log("2");
    }
    eff(3);
}

function c(z) {

    lab: {
        switch (z) {
        case 1:
            eff(1);
            break;
        case 2:
            eff(2);
            break lab;
        case 3:
            console.log("z");
        default:
            eff(3);
        }
        eff(4);
    }
    eff(5);
}

function d(z) {
    lab1: {
        lab2: {
            switch (z) {
            case 1:
                eff(1);
                break;
            case 2:
                eff(2);
                break lab1;
            case 3:
                console.log("z");
                break lab2;
            default:
                eff(3);
            }
            eff(4);
            break lab1;
        }
        eff(5);
    }
    eff(6);
}
